Template.spriteBox.helpers({
	'devicePixelRatio': function () {
		return window.devicePixelRatio;
	},
	'scaledSprite': function () {
		var widthOriginal = this.sprite.metadata.width;
		var heightOriginal = this.sprite.metadata.height;
		var widthMax =  this.boxsize; //zoomDimension;
		var dimensionsTo = Meteor.myFunctions.scaleToByInt(widthOriginal, heightOriginal, widthMax);
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

		if (Session.get("onPool")) {
			// console.log('visited pool before: ', Session.get("onPool"));
			history.back()
		} else {
			// console.log('pool not visited before');
			Router.go('pool', {slug: "all", page: 1});
		}
	}
});