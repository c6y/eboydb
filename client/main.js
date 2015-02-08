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
	}
});


Template.browse.helpers({
	'showPix': function() {
		return MyPix.find({}, {sort: {uploadedAt: -1}});
	},
	'thedate': function() {
		var date = this.uploadedAt;
		return "date: " + date;
	},
	'img': function() {
		var bin = this.binary;
		return bin;
	},
	// return the scaling factor for thumbnails based on longer side of image
	'factor': function() {
		var wDim = this.metadata.width;
		var hDim = this.metadata.height;
		var maxDim = Math.max(wDim, hDim);
		var possibleOverlap = 0;
		var thumbnailBox = thumbnailDimension + possibleOverlap; // global variable is set in settings.js
		var scale = thumbnailBox/maxDim;
		var scaleInt;
		if (scale > 1) {
			scaleInt = Math.floor(scale)
		} else {
			// scaleInt = (Math.ceil(scale * 10)) / 10
			scaleInt = 1; // not scaled down so stays at 1x
		}
		return scaleInt;
	},
	// return scaling width for thumbnails based on longer side of image
	'toWidth': function() {
		var wDim = this.metadata.width;
		var hDim = this.metadata.height;
		var maxDim = Math.max(wDim, hDim); // returns the loger side
		var possibleOverlap = 0;
		var thumbnailBox = thumbnailDimension + possibleOverlap; // global variable is set in settings.js
		var scale = thumbnailBox/maxDim;
		var scaleInt;
		if (scale > 1) {
			scaleInt = Math.floor(scale)
		} else {
			// scaleInt = (Math.ceil(scale * 10)) / 10
			scaleInt = 1; // not scaled down so stays at 1x
		}
		var scaleToWidth = Math.floor(wDim * scaleInt);
		return scaleToWidth;
	},
})

Template.browse.events({
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
		if (currentPage > 1) {
			var previousPage = currentPage - 1;
			Router.go('browse', {page: previousPage});
		}
	},

	'click .next': function(event, template) {
		var currentPage = Number(Router.current().params.page);
		var maxPages = Math.ceil(Counts.get('numberOfPosts') / displayQty);
		if (currentPage < maxPages) {
			var nextPage = currentPage + 1;
			Router.go('browse', {page: nextPage});
		}
	}
})

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


Template.spriteBox.helpers({
	'devicePixelRatio': function () {
		return window.devicePixelRatio;
	},
	'scaledSprite': function () {
		var widthOriginal = this.metadata.width;
		var heightOriginal = this.metadata.height;
		var widthMax = zoomDimension;
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
});


