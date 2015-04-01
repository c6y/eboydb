Template.pool.helpers({
	'scaledSprite': function () {
		var widthOriginal = this.metadata.width;
		var heightOriginal = this.metadata.height;
		var widthMax = thumbnailDimension + thumbnailBleed;
		var dimensionsTo = Meteor.myFunctions.scaleToByInt(widthOriginal, heightOriginal, widthMax);




 
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
			antialiasing: dimensionsTo.antialiase
		}
	},
	'showPix': function() {
		return MyPix.find({}, {sort: {uploadedAt: -1}});
	},
	'backColor': function() {
		if (this.metadata.backColor != 'default') {
			return this.metadata.backColor;
		} else {
			return defaultBackColor;
		}	
	},
	'theSlug': function() {
		return 'q=' + Router.current().params.slug;
	},
	'devicePixelRatio': function() {
		return window.devicePixelRatio;
	}
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
