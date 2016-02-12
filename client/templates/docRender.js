let canvas;
let context;
let maxCanvasSize = 1024;
let maxCanvasSizeDep = new Deps.Dependency;
// set border by percentage of image
const borderPercDefault = 5;
let borderPerc = borderPercDefault;
let borderPercDep = new Deps.Dependency;
// step increase and decrease of border
const step = 1;
// store scaling factor for image
let spriteFactor = 1;
let spriteFactorDep = new Deps.Dependency;
// copyright string for file to be saved
const copyright = 'eboyio';

Template.docRender.onCreated(function() {
	const self = this;

	// subscribe to collection
	self.autorun(function() {
		const thisId = FlowRouter.getParam('_id');
		self.subscribe('aPix', thisId);
	});
});

Template.canvas.onRendered(function() {
	const self = this;

	self.autorun(function() {
		const thisId = FlowRouter.getParam('_id');
		const thisDocument = MyPix.findOne(thisId);

		const originalWidth = thisDocument.metadata.width;
		const originalHeight = thisDocument.metadata.height;

		function borderP() {
			borderPercDep.depend();
			return borderPerc;
		}

		// select best aspect ratio for this image
		const bestRatioKey = selectBestAspectRatio(thisDocument, borderP());
		const ratioArray =  niceScreenRatios[bestRatioKey];
		const largerSide = ratioArray[0];
		const smallerSide = ratioArray[1];

		// check for image orientation
		let imageOrientation = 'square';
		if (originalWidth > originalHeight) {
			imageOrientation = 'landscape';
		} else if (originalWidth < originalHeight) {
			imageOrientation = 'portrait';
		}

		// set up canvas dimensions
		maxCanvasSizeDep.depend();
		let canvasWidth = maxCanvasSize;
		let canvasHeight = maxCanvasSize;
		if (imageOrientation === 'landscape') {
			canvasWidth = maxCanvasSize;
			canvasHeight = Math.ceil(maxCanvasSize / largerSide * smallerSide);
		} else if (imageOrientation === 'portrait') {
			canvasWidth = Math.ceil(maxCanvasSize / largerSide * smallerSide);
			canvasHeight = maxCanvasSize;
		}

		// scale image to fit into canvasWidth but include the border
		const borderFactor = 1 / 100 * borderP();
		const imageTargedW = canvasWidth - canvasWidth * borderFactor;
		const imageTargedH = canvasHeight - canvasHeight * borderFactor;
		const dimensionsTo = Meteor.myFunctions.scaleByIntToFit(
			originalWidth,
			originalHeight,
			imageTargedW,
			imageTargedH
		);

		// update spriteFactor to be used by helpers
		spriteFactor = dimensionsTo.factor;
		spriteFactorDep.changed();

		// calculate offset
		const offsetWidth = (canvasWidth - dimensionsTo.width) / 2;
		const offsetHeight = (canvasHeight - dimensionsTo.height) / 2;

		let myImage = new Image();
		myImage.src = thisDocument.url();

		myImage.onload = function() {
			canvas = document.getElementById('myCanvas');
			context = canvas.getContext('2d');

			canvas.style.width = canvasWidth / 2 + 'px';
			canvas.style.height = canvasHeight / 2 + 'px';

			canvas.setAttribute('width', canvasWidth);
			canvas.setAttribute('height', canvasHeight);

			context.fillStyle = thisDocument.metadata.backColor;

			context.fillRect(
				0,
				0,
				canvasWidth,
				canvasHeight
			);
			context.mozImageSmoothingEnabled = false;
			context.msImageSmoothingEnabled = false;
			context.imageSmoothingEnabled = false;
			context.drawImage(
				myImage,
				offsetWidth,
				offsetHeight,
				dimensionsTo.width,
				dimensionsTo.height
			);
			// generate png from canvas
			const foo = document.getElementById('genImg');
			const dataURL = canvas.toDataURL('image/png');
			// foo.src = imageGenerated;
			foo.href = dataURL;
		};
	});
});

Template.docRender.helpers({
	thisPix() {
		const thisId = FlowRouter.getParam('_id');
		const thisDocument = MyPix.findOne(thisId);
		return thisDocument;
	},
	borderPercentageOf() {
		borderPercDep.depend();
		return borderPerc;
	},
	bestAspectRatioName() {
		borderPercDep.depend();
		return selectBestAspectRatio(this, borderPerc);
	},
	bestAspectRatioValues() {
		borderPercDep.depend();
		const key = selectBestAspectRatio(this, borderPerc);
		const values = niceScreenRatios[key]; // returns an array
		// convert array to string and replace ',' with ':'
		const cleanvalues = values.toString().replace(/,/gi, ':');
		return cleanvalues;
	},
	bestAspectRatioFloat() {
		borderPercDep.depend();
		const key = selectBestAspectRatio(this, borderPerc);
		const values = niceScreenRatios[key]; // returns an array
		const proportion = values[0] / values[1];
		const propRounded = Math.round(proportion * 10000) / 10000;
		return propRounded;
	},
	theSpriteFactor() {
		spriteFactorDep.depend();
		return spriteFactor;
	},
	theMaxCanvasSize() {
		maxCanvasSizeDep.depend();
		return maxCanvasSize;
	},
	fileName() {
		borderPercDep.depend();
		spriteFactorDep.depend();

		const originalFileName = this.original.name;
		// remove file extension
		const truncName = originalFileName.replace(/\.[^/.]+$/, '');
		// convert to lowercase and replace whitespace with '-'
		const cleanName = truncName.toLowerCase().replace(/ /gi, '-');

		const factor = spriteFactor;
		const ratio = selectBestAspectRatio(this, borderPerc);
		const cr = copyright;

		const newFileName = cleanName + '_' + factor + 'x_' + ratio + '_' +  cr;
		return newFileName;
	},
});

Template.docRender.events({
	'click #addBorder'() {
		borderPerc = borderPerc + step;
		borderPercDep.changed();
	},
	'click #substractBorder'() {
		borderPerc = borderPerc - step;
		borderPercDep.changed();
	},
	'click #resetBorder'() {
		borderPerc = borderPercDefault;
		borderPercDep.changed();
	},
	'click #addCanvasSize'() {
		maxCanvasSize = maxCanvasSize + 128;
		maxCanvasSizeDep.changed();
	},
	'click #substractCanvasSize'() {
		maxCanvasSize = maxCanvasSize - 128;
		maxCanvasSizeDep.changed();
	},
	'click #resetCanvasSize'() {
		maxCanvasSize = 1024;
		maxCanvasSizeDep.changed();
	},
});

/**
	* Returns optimal aspect ratio based on original image plus border
	* @param {Object} pix – MyPix image object
	* @param {Number} bPercentage – percentage of original to be used for border
	* @returns {String} rightKey – name of optimal aspect ratio
	*/
function selectBestAspectRatio(pix, bPercentage) {
	const dimensions = calcDimsIncBorder(pix, bPercentage);
	const proportion = calcAspectRatio(dimensions);
	let minDifference = 100; // an arbitrary value, just higher than anything
	let rightKey;

	Object.keys(niceScreenRatios).forEach(function(key) {
		const ratio = niceScreenRatios[key]; // get array assigned to this key
		const maxDim = Math.max.apply(Math, ratio); // the larger value of array
		const minDim = Math.min.apply(Math, ratio); // the smaller value of array
		const propScreenRatio = maxDim / minDim; // calculate this ratio
		const difference = Math.abs(proportion - propScreenRatio);
		// replace minDifference if difference is smaller
		// the first loop
		if (difference < minDifference) {
			minDifference = difference;
			rightKey = key;
		}
	});
	return rightKey;
}

/**
	* Returns an object with new dimensions including border
	* @param {Object} pix - MyPix image document
	* @param {Number} borderP - percentage of original
	* @returns {Object} dimensions - new width and height
	*/
function calcDimsIncBorder(pix, borderP) {
	let dimensions = {};
	const origWidth = pix.metadata.width;
	const origHeight = pix.metadata.height;

	// add a border based on borderP of the smaller side
	const factor = 1 / 100 * borderP;
	// take the higher value of both as base for calculation
	// results are slightly different if smaller value is taken Math.min
	const border = Math.ceil(Math.max(origWidth, origHeight) * factor);
	const width = origWidth + border * 2;
	const height = origHeight + border * 2;
	dimensions.width = width;
	dimensions.height = height;
	return dimensions;
}

/**
	* Returns the aspect ratio of the object's dimensions
	* @param {Object} dimension – originalDimensions width and height
	* @returns {Number} ratio – aspect ratio
	*/
function calcAspectRatio(dimensions) {
	const width = dimensions.width;
	const height = dimensions.height;
	const ratio = Math.max(width, height) / Math.min(width, height);
	return ratio;
}
