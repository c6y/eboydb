Template.pool.helpers({

	'showPix': function() {
		return MyPix.find({}, {sort: {uploadedAt: -1}});
	},
	'theSlug': function() {
		return 'q=' + Router.current().params.slug;
	},
})

Template.pool.events({
	'click .remove': function(event, template) {
		if (Meteor.user().profile.isEditor) {
			console.log("Removing \"" + this._id + "\"");
			thisId = this._id;
			Meteor.call('deleteDocument', thisId);
		}
	},
})

Template.spriteThumb.created = function () {
	this.hidden = new ReactiveVar(true)
	// console.log('this.hidden: ' + this.hidden);
};

Template.spriteThumb.helpers({
	displayItBig: function () {
		isHidden = Template.instance().hidden.get();
		console.log('isHidden: ' + this._id + ' ' +isHidden);
		if (isHidden) {
			return true
		} else {
			return false
		}
	},
		'tnScaledSprite': function () {
		var widthOriginal = this.metadata.width;
		var heightOriginal = this.metadata.height;
		var tnWidthMax = thumbnailDimension + thumbnailBleed;
		var dimensionsTo = Meteor.myFunctions.scaleToByInt(widthOriginal, heightOriginal, tnWidthMax);

		// remove unnecessary canvas area around thumbnail 
		var thumbnailMaxHeight = Math.min(dimensionsTo.height, thumbnailDimension);
		var thumbnailMaxWidth = Math.min(dimensionsTo.width, thumbnailDimension * 2); // because css Flexbox set to stretch 2x

		if (heightOriginal > thumbnailDimension * window.devicePixelRatio) {
			var heightOffset = thumbnailDimension - (heightOriginal * dimensionsTo.factor);
		} else {
			var heightOffset = 0;
		}
		if (widthOriginal > (thumbnailDimension * 4)) {
			var widthOffset = (thumbnailDimension * 2) - (widthOriginal * dimensionsTo.factor);
		} else {
			var widthOffset = 0;
		}
		return {
			width: dimensionsTo.width,
			height: dimensionsTo.height,
			tnWidth: thumbnailMaxWidth,
			tnHeight: thumbnailMaxHeight,
			offsetWidth: widthOffset,
			offsetHeight: heightOffset,
			// widthCenter: widthOriginalCenter,
			scaleFactor: dimensionsTo.factor,
			thumbnailHeight: thumbnailDimension,
			widthDevice: dimensionsTo.width * window.devicePixelRatio,
			heightDevice: dimensionsTo.height * window.devicePixelRatio,
			scaleFactorDevice: dimensionsTo.factor * window.devicePixelRatio,
			tnWidthDevice: thumbnailMaxWidth * window.devicePixelRatio,
			tnHeightDevice: thumbnailMaxHeight * window.devicePixelRatio,
			// thumbnailHeightDevice: thumbnailDimension * window.devicePixelRatio,
		}
	},
		'scaledSprite': function () {
		var widthOriginal = this.metadata.width;
		var heightOriginal = this.metadata.height;
		var widthMax =  zoomDimension;
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
	'backColor': function() {
		if (this.metadata.backColor != 'default') {
			return this.metadata.backColor;
		} else {
			return defaultBackColor;
		}	
	},
	'inverseBackColor': function() {
		invHex = Meteor.myFunctions.inverseHex(this.metadata.backColor);
		// console.log('invHex: ' + invHex);
		return invHex.toString();
	},
})

Template.spriteThumb.events({
	'click .thumbnail': function () {
		Template.instance().hidden.set(false);
	},
	'click .spriteZoom': function () {
		Template.instance().hidden.set(true);
	},
	'click .spriteBoxInfoToggle': function () {
		Session.setDefault('metaInfo', 'none');
		var theSession = Session.get('metaInfo');
		if (theSession == 'block') {
			Session.set('metaInfo', 'none');
		} else {
			Session.set('metaInfo', 'block');
		};
		console.log('Session.get("metaInfo"): ' + Session.get("metaInfo"));
	},
});

// Template.pool.events({
// 	'click .toggleFull': function () {
// 		Template.instance().hidden.set(false);
// 	}
// });
