Template.pool.onCreated(function() {
	const self = this;
	self.autorun(function() {
		const searchSlug = FlowRouter.getParam('slug');
		const searchPage = FlowRouter.getParam('page');
		const searchQuery = FlowRouter.getQueryParam('q');

		// check if slug is part of array containing aliases
		// the aliasesForFullSearch array is defined in searchAliases.js
		let searchTerm = searchSlug;
		if (aliasesForFullSearch.indexOf(searchSlug.toLowerCase()) > -1) {
			searchTerm = '.*';
		}

		self.subscribe('PixQuery', searchTerm, searchPage, searchQuery);
	});
});

Template.pool.onRendered(function() {
	this.autorun(function() {
		const route = FlowRouter.getRouteName();
		const title = FlowRouter.getParam('slug');
		const page = FlowRouter.getParam('page');
		const query = FlowRouter.getQueryParam('q');
		let queryString = '';
		if (query) {
			queryString = ' – ' + query;
		}
		DocHead.setTitle(
			route + '\/' + title + '\/' + page + queryString + ' – eboy.io'
		);
	});
});

Template.pool.helpers({
	scaledSprite() {
		const widthOrig = this.metadata.width;
		const heightOrig = this.metadata.height;
		const widthMax = thumbnailDimension + thumbnailBleed;
		let dimensionsTo;

		// scaling function changes if document has the tag 'photo'
		if (this.metadata.tags.indexOf('photo') < 0) {
			dimensionsTo = Meteor.myFunctions.scaleToByInt(
				widthOrig,
				heightOrig,
				widthMax
			);
		} else {
			dimensionsTo = Meteor.myFunctions.scaleToSoft(
				widthOrig,
				heightOrig,
				widthMax
			);
		}

		// set a max background width for non-fullframe images
		let maxDocBoxWidth = widthOrig * dimensionsTo.factor;
		if (!this.metadata.fullframe) {
			maxDocBoxWidth = Math.floor(dimensionsTo.width * 1.4);
		}

		let heightOffset = 0;
		if (heightOrig > thumbnailDimension * window.devicePixelRatio) {
			heightOffset = thumbnailDimension - heightOrig * dimensionsTo.factor;
		}

		let widthOffset = 0;
		if (widthOrig > thumbnailDimension * 4) {
			widthOffset = thumbnailDimension * 2 - widthOrig * dimensionsTo.factor;
		}

		let styleMaxDocBoxWidthString = false;
		if (!this.metadata.fullframe) {
			styleMaxDocBoxWidthString = 'max-width:' + maxDocBoxWidth + 'px;';
		}

		return {
			width: dimensionsTo.width,
			height: dimensionsTo.height,
			offsetWidth: widthOffset,
			offsetHeight: heightOffset,
			scaleFactor: dimensionsTo.factor,
			thumbnailHeight: thumbnailDimension,
			widthDevice: dimensionsTo.width * window.devicePixelRatio,
			heightDevice: dimensionsTo.height * window.devicePixelRatio,
			scaleFactorDevice: dimensionsTo.factor * window.devicePixelRatio,
			styleMaxDocBoxWidth: styleMaxDocBoxWidthString,
		};
	},
	showPix() {
		return MyPix.find({}, {sort: {uploadedAt: -1}});
	},
	backColor() {
		if (this.metadata.fullframe) {
			return 'transparent';
		}
		if (this.metadata.backColor !== 'default') {
			return this.metadata.backColor;
		}
		return defaultBackColor;
	},
	// turn off flex-grow and padding for images with fullframe property
	// prevents them to be stretchable
	styleFlexOff() {
		if (this.metadata.fullframe) {
			return 'flex-grow:0;padding:0;';
		}
	},
	// turns on default rendering for all documents with the tag 'photo'
	// this will avoid pixelated scaling for photos
	styleSoftRender() {
		if (this.metadata.tags.indexOf('photo') > 0) {
			return 'image-rendering:auto;';
		}
	},
	// in edit mode, display madeDate – if available.
	// Else remind that date is missing.
	madeDate() {
		if (this.metadata.madeDate) {
			return moment(this.metadata.madeDate).format('YYYY');
		}
		return 'DATE?';
	},

	bestAspectRatio() {
		const originalWidth = this.metadata.width;
		const originalHeight = this.metadata.height;

		// add a border based on 10% of the smaller side
		const border = Math.ceil(Math.min(originalWidth, originalHeight) / 10);
		// console.log('border: ' + border);
		const width = originalWidth + border * 2;
		const height = originalHeight + border * 2;

		const proportion = Math.max(width, height) / Math.min(width, height);
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
	},

	showDocInfo() {
		if (Session.get('displayEditor') === 'false') {
			return false;
		}
		return true;
	},
	toSpriteBoxPath() {
		const thisId = this._id;
		const params = {_id: thisId, boxsize: 'auto'};
		const poolSlug = FlowRouter.getParam('slug');
		const poolPage = FlowRouter.getParam('page');

		let poolQuery = FlowRouter.getQueryParam('q');
		if (!poolQuery) {
			poolQuery = false;
		}
		// remember location when leaving pool
		Session.set('poolSlug', poolSlug);
		Session.set('poolPage', poolPage);
		Session.set('poolQuery', poolQuery);

		return FlowRouter.path('spriteBox', params);
	},
	toDocEditPath() {
		const thisId = this._id;
		const params = {_id: thisId};
		return FlowRouter.path('docEdit', params);
	},
	toDocRenderPath() {
		const thisId = this._id;
		const params = {_id: thisId};
		return FlowRouter.path('docRender', params);
	},
	thisIndex(currentIndex) {
		return currentIndex + 2;
	}
});

Template.pool.events({
	'click .remove': function(event) {
		event.preventDefault();
		if (Meteor.user().profile.isEditor) {
			if (confirm('Delete Document: ' + this._id)) {
				const thisId = this._id;
				Meteor.call('deleteDocument', thisId);
			}
		}
	},
	'keypress .docbox'() {
		if (event.which === 13) {
			console.log(this._id);
			const params = {_id: this._id, boxsize: 'auto'};
			FlowRouter.go('spriteBox', params);
		}
	},
});
