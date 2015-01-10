// paths to external media folders
originalsfolder = "/eboydb_test/images/originals";
thumbsfolder = "/eboydb_test/images/thumbs";


Images = new FS.Collection("images", {
	stores: [
		new FS.Store.FileSystem("originals", {path: originalsfolder}),
		new FS.Store.FileSystem("thumbnails", {

			path: thumbsfolder,

			transformWrite: function(fileObj, readStream, writeStream) {
				
				// Transform the image into a 64x64px thumbnail
				gm(readStream, fileObj.name()).resize('64', '64').stream().pipe(writeStream);
			}

		})
	]
});

if(Meteor.isClient) {
	Meteor.subscribe('Images');
}