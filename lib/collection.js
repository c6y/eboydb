// paths to external media folders
originalsfolder = "/eboydb_test/images/originals";
thumbsfolder = "/eboydb_test/images/thumbs";


Images = new FS.Collection("images", {
	stores: [
		new FS.Store.FileSystem("originals", {path: originalsfolder}),
		new FS.Store.FileSystem("thumbnails", {

			path: thumbsfolder,

			transformWrite: function(fileObj, readStream, writeStream) {
				
				// This does reads and writes but does not change anything
				// readStream.pipe(writeStream);
				
				// Transform the image into a 10x10px thumbnail
				// NOT WORKING:
				// gm(readStream, fileObj.name()).resize('10', '10').stream().pipe(writeStream);
			}

		})
	]
});

if(Meteor.isClient) {
	Meteor.subscribe('Images');
}

