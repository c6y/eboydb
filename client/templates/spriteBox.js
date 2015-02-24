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
	'click .goBack': function(event) {
		history.back();
	},
	// 'document keydown': function(event) {
	// 	console.log('rightkey: 13');
	// 	if (event.which === 13) {	
	// 	}
	// },
	'click .previousDoc': function() {
		console.log('previousDoc');
	},
	'click .nextDoc': function() {
		console.log('nextDoc');
	}
});