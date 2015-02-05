Template.home.helpers({
	'postsCount': function() {
		return Counts.get('numberOfPosts')
	},
	'currentPage': function() {
		var page = Math.floor(Session.get('docCursor') / displayQty) + 1;
		return page;
	}, 
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
		var thumbnailbox = thumbnailDimension + possibleOverlap; // global variable is set in settings.js
		var scale = thumbnailbox/maxDim;
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
		var thumbnailbox = thumbnailDimension + possibleOverlap; // global variable is set in settings.js
		var scale = thumbnailbox/maxDim;
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

Template.home.events({
	'change .myPixInput': function(event, template) {
		FS.Utility.eachFile(event, function(file) {
	
			var newFile = new FS.File(file);
			newFile.metadata = {copyright: ""};
			newFile.metadata = {backColor: ""};

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
		if(Number(Session.get('docCursor') > (displayQty-1))) {
			Session.set('docCursor', Number(Session.get('docCursor')) - displayQty);
			console.log("docCursor: " + Session.get('docCursor'));
		}		
	},

	'click .next': function(event, template) {
		if(Number(Session.get('docCursor')) + displayQty < Counts.get('numberOfPosts')) {
			Session.set('docCursor', Number(Session.get('docCursor')) + displayQty);
			console.log("docCursor: " + Session.get('docCursor'));
		};
	}
})

Template.doc.events({
	'submit form': function (event) {
		event.preventDefault();
		var updatedTags =  event.target.tags.value;
		var updatedColor = event.target.backColor.value;
		MyPix.update(this._id, {$set: {tags: updatedTags, backColor: updatedColor}});
	}
});


