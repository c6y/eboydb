Template.pool.helpers({
	'scaledSprite': function () {
		var widthOriginal = this.metadata.width;
		var heightOriginal = this.metadata.height;
		var widthMax = thumbnailDimension + thumbnailBleed;
		var dimensions;

		// scaling function changes if document has the tag 'photo' 
		if (this.metadata.tags.indexOf('photo') < 0) {
			dimensionsTo = Meteor.myFunctions.scaleToByInt(widthOriginal, heightOriginal, widthMax);
		}
		else if (this.metadata.tags.indexOf('photo') >= 0) {
			dimensionsTo = Meteor.myFunctions.scaleToSoft(widthOriginal, heightOriginal, widthMax);
		} else {
			// checking for errors
			console.log("cannot calculate if " + this.name + " has tag 'photo'");
		}

		// set a max background width for non-fullframe images
		if (!this.metadata.fullframe) {
			var maxDocBoxWidth = Math.floor(dimensionsTo.width * 1.4);
		}

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
			// tnWidth: thumbnailMaxWidth,
			// tnHeight: thumbnailMaxHeight,
			offsetWidth: widthOffset,
			offsetHeight: heightOffset,
			// widthCenter: widthOriginalCenter,
			scaleFactor: dimensionsTo.factor,
			thumbnailHeight: thumbnailDimension,
			widthDevice: dimensionsTo.width * window.devicePixelRatio,
			heightDevice: dimensionsTo.height * window.devicePixelRatio,
			scaleFactorDevice: dimensionsTo.factor * window.devicePixelRatio,
			// tnWidthDevice: thumbnailMaxWidth * window.devicePixelRatio,
			// tnHeightDevice: thumbnailMaxHeight * window.devicePixelRatio,
			// thumbnailHeightDevice: thumbnailDimension * window.devicePixelRatio,
			styleMaxDocBoxWidth: "max-width:" + maxDocBoxWidth + "px;",
		}
	},
	'showPix': function() {
		return MyPix.find({}, {sort: {uploadedAt: -1}});
	},
	'backColor': function() {
		if (this.metadata.fullframe) {
			return "transparent"
		} else if (this.metadata.backColor != 'default') {
			return this.metadata.backColor;
		} else {
			return defaultBackColor;
		}
	},
	// turn off flex-grow and padding for images with fullframe property
	// prevents them to be stretchable
	'styleFlexOff': function() {
		if (this.metadata.fullframe) {
			return "flex-grow:0;padding:0"
		}
	},
	// turns on default rendering for all documents with the tag 'photo'
	// this will avoid pixelated scaling for photos
	'styleSoftRender': function() {
		if (this.metadata.tags.indexOf('photo') > 0) {
			// console.log('softrendering a photo');
			return "image-rendering:auto;"
		}
	},
	// in edit mode, display madeDate – if available. Else remind that date is missing.
	'madeDate': function() {
		if (this.metadata.madeDate) {
			return moment(this.metadata.madeDate).format('YYYY');
		} else {
			return "DATE?";
		}
	}
})

Template.pool.events({
	'click .remove': function(event, template) {
		if (Meteor.user().profile.isEditor) {
			if (confirm("Delete Document: " + this._id)) {
				console.log("Removing \"" + this._id + "\"");
				thisId = this._id;
				Meteor.call('deleteDocument', thisId);
			}
		}
	},
	'click .leavePool': function(event, template) {
			var poolSlug = Router.current().params.slug;
			Session.set('poolSlug', poolSlug);

			var poolPage = Router.current().params.page;
			Session.set('poolPage', poolPage);

			if (Router.current().params.query.q) {
				var poolQuery = Router.current().params.query.q;
			} else {
				var poolQuery = false;
			};
			Session.set('poolQuery', poolQuery);
	}
})
