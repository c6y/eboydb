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

Template.pixUpload.events({
	'change .myPixInput': function(event, template) {
		event.preventDefault();
		var file = event.target.files[0];
		var reader = new FileReader();

		// reader.onload = function(event){
		// 	var result = reader.result;
		// 	var buffer = new Uint8Array(result);
		// 	MyPix.insert({binary: buffer});
		// }
		// reader.readAsArrayBuffer(file);

		reader.onload = function(event){
			MyPix.insert({binary: reader.result});
		}

		reader.readAsDataURL(file);
	}
});

Template.pixList.helpers({
	'showPix': function(){
		return MyPix.find();
	}
})

