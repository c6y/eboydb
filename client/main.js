Template.imagesShow.helpers({
	'showImages': function() {
		// return Images.find();
		return Images.find({}, {sort: {uploadedAt: -1}});
	}
})

Template.imagesShow.events({
	'click .remove': function() {
		console.log("Removing \"" + this._id + "\"");
		Images.remove(this._id);
	}
})

Template.imagesCount.helpers({
	'posts': function() {
		return Images.find().count();
	}
});

Template.imageUpload.events({
	'change .myFileInput': function(event, template) {
		FS.Utility.eachFile(event, function(file) {
			Images.insert(file, function (err, fileObj) {
				//Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
				console.log("Inserting \"" + fileObj._id + "\"");
			})
		})
	}
});