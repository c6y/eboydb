Template.newSpriteBox.onCreated(function() {
	const self = this;
	self.autorun(function() {
		const thisId = FlowRouter.getParam('_id');
		const searchQuery = Session.get('poolQuery');

		// check if slug is part of array containing aliases
		// the aliasesForFullSearch array is defined in environment.js
		let searchSlug = Session.get('poolSlug');
		if (searchSlug) {
			if (aliasesForFullSearch.indexOf(searchSlug.toLowerCase()) > -1) {
				searchSlug = '.*';
			}
		}

		self.subscribe('aPix', thisId, searchSlug, searchQuery);
	});
});

Template.newSpriteBox.helpers({
	showThisPix() {
		const thisId = FlowRouter.getParam('_id');
		const thisDocument = MyPix.findOne(thisId);
		return thisDocument;
	},
	devicePixelRatio() {
		return window.devicePixelRatio;
	},
	scaledSprite() {
		const widthOriginal = this.metadata.width;
		const heightOriginal = this.metadata.height;
		const borderFactor = 0.9; // 1 is will cover the whole area, no borders
		const boxSize = FlowRouter.getParam('boxsize');
		const maxSpriteBoxSize = Math.min(window.innerHeight, window.innerWidth);

		let spriteBoxSize = Math.min(maxSpriteBoxSize, boxSize);
		let spriteBoxWidth = spriteBoxSize;
		let spriteBoxHeight = spriteBoxSize;

		if (boxSize === 'auto') {
			spriteBoxSize = Math.min(window.innerHeight, window.innerWidth);
			spriteBoxWidth = window.innerWidth;
			spriteBoxHeight = window.innerHeight;
		}

		const widthMax =  spriteBoxWidth * borderFactor; // zoomDimension;
		const heightMax =  spriteBoxHeight * borderFactor; // zoomDimension;

		const dimensionsTo = Meteor.myFunctions.scaleByIntToFit(
			widthOriginal,
			heightOriginal,
			widthMax,
			heightMax
		);

		return {
			width: dimensionsTo.width,
			height: dimensionsTo.height,
			scaleFactor: dimensionsTo.factor,
			widthWindow: window.innerWidth,
			heightWindow: window.innerHeight,
			widthDevice: dimensionsTo.width * window.devicePixelRatio,
			heightDevice: dimensionsTo.height * window.devicePixelRatio,
			scaleFactorDevice: dimensionsTo.factor * window.devicePixelRatio,
			boxsize: spriteBoxSize,
		};
	},
	isVisible() {
		if (Session.get('displaySpriteBoxInfo') === 'true') {
			return 'true';
		}
		return 'none';
	},
	backColor() {
		if (this.metadata.backColor !== 'default') {
			return this.metadata.backColor;
		}
		return defaultBackColor;
	},
	inverseBackColor() {
		invHex =  Meteor.myFunctions.inverseHex(this.metadata.backColor);
		return invHex.toString();
	},
	formatDate() {
		return moment(this.uploadedAt).format('YYYY-MM-DD');
	},
	madeDate() {
		if (this.metadata.madeDate) {
			return this.metadata.madeDate.toISOString().substring(0, 4);
		}
	},
	sizeFormatted() {
		const str = this.formattedSize();
		const strValue = str.substr(0, str.indexOf(' '));
		const strUnit = str.substr(str.indexOf(' ') + 1);
		return {
			value: strValue,
			unit: strUnit,
		};
	},
});

Template.newSpriteBox.events({
	'click .spriteBoxInfoToggle': function() {
		Session.setDefault('displaySpriteBoxInfo', 'false');
		let theSession = Session.get('displaySpriteBoxInfo');
		if (theSession === 'true') {
			Session.set('displaySpriteBoxInfo', 'false');
		} else {
			Session.set('displaySpriteBoxInfo', 'true');
		}
	},
	'click .spriteBoxClose': function() {
		let params = {slug: 'everything', page: '1'};
		let poolQuery = {};

		const theSlug = Session.get('poolSlug');
		if (theSlug) {
			params.slug = theSlug;
		}

		const thePage = Session.get('poolPage');
		if (thePage) {
			params.page = thePage;
		}

		const theQuery = Session.get('poolQuery');
		if (theQuery) {
			poolQuery.q = theQuery;
		}

		FlowRouter.go('newPool', params, poolQuery);
	},
	'click .searchForTag': function() {
		const thisTag = this;
		const params = {slug: thisTag, page: '1'};
		FlowRouter.go('newPool', params);
	},
	'click .goNewerDoc': function(event) {
		event.preventDefault();
		const newerDocument = MyPix.findOne({}, {sort: {uploadedAt: -1}});
		const params = {_id: newerDocument._id, boxsize: 'auto'};
		FlowRouter.go('newSpriteBox', params);
	},
	'click .goOlderDoc': function(event) {
		event.preventDefault();
		const olderDocument = MyPix.findOne({}, {sort: {uploadedAt: 1}});
		const params = {_id: olderDocument._id, boxsize: 'auto'};
		FlowRouter.go('newSpriteBox', params);
	},
});
