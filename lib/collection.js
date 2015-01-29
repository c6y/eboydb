var OriginalsStore = new FS.Store.FileSystem("OriginalPix", {
	path: pathToOriginalsFolder,

	transformWrite: function (fileObj, readStream, writeStream) {
		readStream.pipe(writeStream);

		fileObj.update({$set: {'tags': '#eboy'}});
		
		// read image dimensions and write to metadata
		gm(readStream)
		.size({bufferStream: true}, FS.Utility.safeCallback(function (err, size) {
			if (err) {
				// handle the error
			} else {
				fileObj.update({$set: {'metadata.width': size.width, 'metadata.height': size.height}});
			}
		}));
	}
});

var ScaledStore = new FS.Store.FileSystem("ScaledPix", {
	path: pathToScaledFolder,
	
	transformWrite: function(fileObj, readStream, writeStream) {
		gm(readStream)
		.sample(864)
		.stream()
		.pipe(writeStream);
	}
});

var OriginalsRetinaStore = new FS.Store.FileSystem("OriginalRetinaPix", {
	path: pathToOriginalsRetinaFolder,
	
	transformWrite: function(fileObj, readStream, writeStream) {
		gm(readStream)
		.sample('200%')
		.stream()
		.pipe(writeStream);
	}
});

MyPix = new FS.Collection("MyPix", {
	stores: [ OriginalsStore, ScaledStore, OriginalsRetinaStore ]
});

if(Meteor.isClient) {
	Session.setDefault('docCursor', 0);
	console.log('docCursor: ' + Session.get('docCursor'));
	Meteor.autorun(function(){
		Meteor.subscribe('MyPix', Session.get('docCursor'));
	})
}

