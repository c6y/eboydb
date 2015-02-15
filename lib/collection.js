var OriginalsStore = new FS.Store.FileSystem("OriginalPix", {
	path: pathToOriginalsFolder,
	
	transformWrite: function (fileObj, readStream, writeStream) {

		// read image dimensions and write to metadata
		gm(readStream, fileObj.name())
		.size({bufferStream: true}, FS.Utility.safeCallback(function (err, size) {
			if (err) {
				// handle the error
			} else {
				fileObj.update({$set: {'metadata.width': size.width, 'metadata.height': size.height}});
			}
		}))
		.stream()
		.pipe(writeStream);
	}
});


MyPix = new FS.Collection("MyPix", {
	// stores: [ OriginalsStore, ThumbsStore ]
	 stores: [ OriginalsStore ]
});

if(Meteor.isClient) {
	Session.setDefault('docCursor', 0);
	// console.log('docCursor: ' + Session.get('docCursor'));
	Meteor.autorun(function(){
		Meteor.subscribe('MyPix', Session.get('docCursor'));
	})
}

// create a compound index
if (Meteor.isServer) {
	Meteor.startup(function() {
		MyPix.files._ensureIndex({'metadata.tags': 1, 'original.name': 1, 'uploadedAt': -1})
	})
}

