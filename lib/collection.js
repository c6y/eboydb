var originalsfolder = "/eboydb_test/images/originals";
var scaledfolder = "/eboydb_test/images/scaled";

MyPix = new FS.Collection("MyPix", {
	stores: [
		new FS.Store.FileSystem("OriginalPix", {
			path: originalsfolder
		}),
		new FS.Store.FileSystem("ScaledPix", {
			path: scaledfolder,

			beforeWrite: function(fileObj) {
				return {
					extension: 'png', 	// changes extension of file
					type: 'image/png' 	// change type field in db
				};
			},
			transformWrite: function(fileObj, readStream, writeStream) {
				// Resizing image with no antialiasing
				// 'sample', instead of 'resize' seems to be fastest resize algorithm 
				// An option is to take the following (tests would be needed though)
				// gm(readStream).filter('point').resize(432).stream('PNG').pipe(writeStream);
				gm(readStream).sample(864).stream('PNG').pipe(writeStream);
			}
		})

	]

});

if(Meteor.isClient) {
	
	Session.setDefault('docCursor', 0);
	console.log(Session.get('docCursor'));

	Meteor.autorun(function(){
		Meteor.subscribe('MyPix', Session.get('docCursor'));
	})
}

