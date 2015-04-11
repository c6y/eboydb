Template.spriteBox.helpers({
	'devicePixelRatio': function () {
		return window.devicePixelRatio;
	},
	'scaledSprite': function () {
		var widthOriginal = this.sprite.metadata.width;
		var heightOriginal = this.sprite.metadata.height;
		
		var borderFactor = 0.9; // 1 is will cover the whole area, no borders
		var widthMax =  this.boxwidth * borderFactor; //zoomDimension;
		var heightMax =  this.boxheight * borderFactor; //zoomDimension;

		var dimensionsTo = Meteor.myFunctions.scaleByIntToFit(
			widthOriginal,
			heightOriginal,
			widthMax,
			heightMax);
		
		return {
			width: dimensionsTo.width,
			height: dimensionsTo.height,
			scaleFactor: dimensionsTo.factor,

			widthWindow: window.innerWidth,
			heightWindow: window.innerHeight,
			widthDevice: dimensionsTo.width * window.devicePixelRatio,
			heightDevice: dimensionsTo.height * window.devicePixelRatio,
			scaleFactorDevice: dimensionsTo.factor * window.devicePixelRatio
		}
	},
	'visibility': function () {
		if (Session.get('displaySpriteBoxInfo' + this.sprite._id) == 'block') {
			return 'block'
		} else {
			return 'none';
		};
	},
	'backColor': function() {
		if (this.sprite.metadata.backColor != 'default') {
			return this.sprite.metadata.backColor;
		} else {
			return defaultBackColor;
		}
	},
	'inverseBackColor': function() {
		invHex =  Meteor.myFunctions.inverseHex(this.sprite.metadata.backColor);
		// console.log('invHex: ' + invHex);
		return invHex.toString();
	},
	'formatDate': function() {
		return moment(this.sprite.uploadedAt).format('YYYY-MM-DD');
	},
	'sizeFormatted': function() {
		var str = this.sprite.formattedSize();
		var strValue = str.substr(0, str.indexOf(' '));
		var strUnit = str.substr(str.indexOf(' ') + 1);
		return {
			value: strValue,
			unit: strUnit
		}
	},
	'olderDoc': function() {
		var olderDocument = MyPix.findOne({}, {sort: {uploadedAt: 1}});
		return olderDocument._id;
	},
	'newerDoc': function() {
		var newerDocument = MyPix.findOne({}, {sort: {uploadedAt: -1}});
		return newerDocument._id;
	}
});

Template.spriteBox.events({
	'click .spriteBoxInfoToggle': function () {
		Session.setDefault('displaySpriteBoxInfo' + this.sprite._id, 'none');
		var theSession = Session.get('displaySpriteBoxInfo' + this.sprite._id);
		if (theSession == 'block') {
			Session.set('displaySpriteBoxInfo' + this.sprite._id, 'none');
		} else {
			Session.set('displaySpriteBoxInfo' + this.sprite._id, 'block');
		};
	},
	'click .spriteBoxClose': function(event) {
		var theSlug = Session.get('poolSlug');
		var thePage = Session.get('poolPage');

		if (Session.get('poolQuery')) {
			var queryString = 'q=' + Session.get('poolQuery');
			var queryObject = {query: queryString}; 
		} else {
			var queryObject = false;
		}		

		if (Session.get("poolSlug")) {
			Router.go('pool', {slug: theSlug, page: thePage}, queryObject);
		} else {
			Router.go('pool', {slug: "all", page: 1});
		}

	},
	'click .goNewerDoc': function(event) {
		var newerDocument = MyPix.findOne({}, {sort: {uploadedAt: -1}});
		Router.go('spriteBox', {_id: newerDocument._id, boxsize: 'auto'});
	},
	'click .goOlderDoc': function(event) {
		var olderDocument = MyPix.findOne({}, {sort: {uploadedAt: 1}});
		Router.go('spriteBox', {_id: olderDocument._id, boxsize: 'auto'});
	}
});