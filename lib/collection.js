function scaleToTargetByInt (width) {
	var maxWidth = 216 * 2; // 2x thumbnail size optimized for Retina display
	var originalWidth = width;
	if (width > originalWidth) {
		return width;
	} else {
		var scaleInt = Math.floor(maxWidth/originalWidth);
		var scaleSize = scaleInt * originalWidth;
		return scaleSize;
	};
}

var ThumbsStore = new FS.Store.FileSystem("ThumbsPix", {
	path: pathToThumbsFolder,

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
		// read metader.emit (/Users/kaivermehr/.meteor/packages/meteor-tool/.1.0.40.m7php3++os.osx.x86_64+web.browser+web.cordova/meteor-tool-os.osx.x86_64/dev_bundle/lib/node_modules/httpata.width and scale acordingly
		// .sample(scaleToTargetByInt(fileObj.metadata.width))
		// .stream()
		// .pipe(writeStream);
	}
});


var OriginalsStore = new FS.Store.FileSystem("OriginalPix", {
	path: pathToOriginalsFolder,
	
	// transformWrite: function(fileObj, readStream, writeStream) {
	// 	gm(readStream)
	// 	// .sample('200%')
	// 	.stream()
	// 	.pipe(writeStream);
	// }
});

MyPix = new FS.Collection("MyPix", {
	stores: [ OriginalsStore, ThumbsStore ]
});

if(Meteor.isClient) {
	Session.setDefault('docCursor', 0);
	// console.log('docCursor: ' + Session.get('docCursor'));
	Meteor.autorun(function(){
		Meteor.subscribe('MyPix', Session.get('docCursor'));
	})
}

