function scaleToTargetByInt (width) {
	var maxWidth = 216 * 2; // 2x thumbnail size optimized for Retina display
	var originalWidth = width;
	var scaleInt = Math.floor(maxWidth/originalWidth);
	var scaleSize = scaleInt * originalWidth;
	return scaleSize;
}

var OriginalsStore = new FS.Store.FileSystem("OriginalPix", {
	path: pathToOriginalsFolder,

	transformWrite: function (fileObj, readStream, writeStream) {

		fileObj.update({$set: {'tags': '#eboy'}});
		fileObj.update({$set: {'backColor': '#555555'}});
		
		// read image dimensions and write to metadata
		gm(readStream)
		.size({bufferStream: true}, FS.Utility.safeCallback(function (err, size) {
			if (err) {
				// handle the error
			} else {
				fileObj.update({$set: {'metadata.width': size.width, 'metadata.height': size.height}});
			}
		}))
		// read metadata.width and scale acordingly
		.sample(scaleToTargetByInt(fileObj.metadata.width))
		.stream()
		.pipe(writeStream);
	}
});

var ScaledStore = new FS.Store.FileSystem("ScaledPix", {
	path: pathToScaledFolder,
	
	transformWrite: function(fileObj, readStream, writeStream) {
		gm(readStream)
		.sample('400%')
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

