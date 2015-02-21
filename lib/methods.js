Meteor.methods({
	removeTag: function(taskId, thisTag) {
		MyPix.update (
			taskId,
			{ $pull: { 'metadata.tags': thisTag }}
		);
	},
	updateBackColor: function(taskId, cHex) {
		MyPix.update (
			taskId,
			{ $set: { 'metadata.backColor': cHex }}
		);
	},
	addATag: function(taskId, thisTag) {
		MyPix.update (
			taskId,
			{ $addToSet: { 'metadata.tags': { $each: [ thisTag ] }}}
		);
	},
	deleteDocument: function(taskId) {
		MyPix.remove(taskId);
	}

	// addDocument: function(file) {
	// 	console.log('file._id: ' + file._id);
	// 	MyPix.insert (
	// 		file,
	// 		function(err, fileObj) {
	// 			//If !err, we have inserted new doc with ID fileObj._id, and
	// 			//kicked off the data upload using HTTP
	// 		}
	// 	);
	// }
})