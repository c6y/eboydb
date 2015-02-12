Template.navigation.helpers({
	'postsCount': function() {
		return Counts.get('numberOfPosts')
	},
	'currentPage': function() {
		var currentPage = Number(Router.current().params.page);
		return currentPage;
	},
	'totalPages': function() {
		return Math.ceil(Counts.get('numberOfPosts') / displayQty);
	},
	'searchSlug': function() {
		return Session.get('slug');
	}
});

Template.navigation.events({
	'keypress input.searchFor': function (event) {
		if (event.which === 13) {
			var searching = event.currentTarget.value;
			Session.set('slug', searching);
			console.log(Session.get('slug'));
			// console.log('slug: ' + slug);
			Router.go('pool', {slug: searching, page: 1});
		}
	}
});

Template.doc.helpers({
	'devicePixelRatio': function () {
		return window.devicePixelRatio;
	},
	'deviceDimensions': function () {
		var widthOriginal = this.metadata.width;
		var heightOriginal = this.metadata.height;
		var deviceRatio = window.devicePixelRatio;
		var deviceWidth = widthOriginal / deviceRatio;
		var deviceHeight = heightOriginal / deviceRatio;
		return {
			ratio: deviceRatio,
			width: deviceWidth,
			height: deviceHeight
		}
	}
});

Template.doc.events({
	'submit form': function (event) {
		event.preventDefault();
		var updatedTags =  event.target.tags.value;
		var updatedColor = event.target.backColor.value;
		MyPix.update(this._id, {$set: {'metadata.tags': updatedTags, 'metadata.backColor': updatedColor}});
	},
	'click .goBack': function(event) {
		history.back();
	},
});

Template.pool.helpers({
	'scaledSprite': function () {
		var widthOriginal = this.metadata.width;
		var heightOriginal = this.metadata.height;
		var widthMax = thumbnailDimension + thumbnailBleed;
		var dimensionsTo = Meteor.myFunctions.scaleToByInt(widthOriginal, heightOriginal, widthMax);

		// remove unnecessary canvas area around thumbnail 
		var thumbnailMaxHeight = Math.min(dimensionsTo.height, thumbnailDimension);
		var thumbnailMaxWidth = Math.min(dimensionsTo.width, thumbnailDimension * 2); // because css Flexbox set to stretch 2x

		if (heightOriginal > thumbnailDimension) {
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
	'showPix': function() {
		return MyPix.find({}, {sort: {uploadedAt: -1}});
	},
})

Template.pool.events({
	'change .myPixInput': function(event, template) {
		FS.Utility.eachFile(event, function(file) {
	
			var newFile = new FS.File(file);
			newFile.metadata = {
				copyright: "©eBoy",
				backColor: "#f2f2f2",
				tags: "sprite"
			};

			MyPix.insert(newFile, function(err, fileObj) {
				//If !err, we have inserted new doc with ID fileObj._id, and
				//kicked off the data upload using HTTP
			});
		});
	},
	'click .remove': function(event, template) {
		console.log("Removing \"" + this._id + "\"");
		MyPix.remove(this._id);
	},

	'click .previous': function(event, template) {
		var currentPage = Number(Router.current().params.page);
		var currentSlug = Router.current().params.slug;
		if (currentPage > 1) {
			var previousPage = currentPage - 1;
			Router.go('pool', {slug: currentSlug, page: previousPage});
		}
	},

	'click .next': function(event, template) {
		var currentPage = Number(Router.current().params.page);
		var maxPages = Math.ceil(Counts.get('numberOfPosts') / displayQty);
		var currentSlug = Router.current().params.slug;
		if (currentPage < maxPages) {
			var nextPage = currentPage + 1;
			Router.go('pool', {slug: currentSlug, page: nextPage});
		}
	}
})



