var pathToOriginalsFolder = "/eboydb_test/images/originals";
var pathToScaledFolder = "/eboydb_test/images/scaled";

var OriginalsStore = new FS.Store.FileSystem("OriginalPix", {
	path: pathToOriginalsFolder,

	transformWrite: function (fileObj, readStream, writeStream) {
		readStream.pipe(writeStream);
		
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
	
	beforeWrite: function(fileObj, readStream) {
		return {
			extension: 'png', 	// sets extension of file
			type: 'image/png' 	// sets content of type field in db
		};
	},
	transformWrite: function(fileObj, readStream, writeStream) {
		// calculate max possible size if scaled by integer
		// that will fit into maximal width available

		// function scaleToMaxByInteger(readStream) {
		// 	gm(readStream)
		// 		.size({bufferStream: true}, FS.Utility.safeCallback(function (err, size) {
		// 		if (err) {
		// 			// handle the error
		// 		} else {
		// 			var maxWidth = 864;
		// 			var originalWidth = size.width;
		// 			var scaleInt = Math.floor(maxWidth/originalWidth);
		// 			var scaleSize = scaleInt * originalWidth;

		// 			console.log('originalWidth: ' + originalWidth);
		// 			console.log('scaleInt: ' + scaleInt);
		// 			console.log('scaleSize: ' + scaleSize);

		// 			return scaleSize;
		// 		}
		// 	}));
		// };

		// Resizing image with no antialiasing
		// 'sample', instead of 'resize' seems to be fastest resize algorithm 
		gm(readStream)
		.sample(864)
		// .sample(scaleToMaxByInteger(readStream)) // >>>>>> This is NOT WORKING
		.stream('PNG')
		.pipe(writeStream);
	}
});


MyPix = new FS.Collection("MyPix", {
	stores: [ OriginalsStore, ScaledStore ]
});



if(Meteor.isClient) {
	Session.setDefault('docCursor', 0);
	console.log(Session.get('docCursor'));
	Meteor.autorun(function(){
		Meteor.subscribe('MyPix', Session.get('docCursor'));
	})
}

