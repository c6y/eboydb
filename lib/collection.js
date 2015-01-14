// paths to external media folders
originalsfolder = "/eboydb_test/images/originals";
thumbsfolder = "/eboydb_test/images/thumbs";


Images = new FS.Collection("images", {
	stores: [
		new FS.Store.FileSystem("originals", {path: originalsfolder}),
		new FS.Store.FileSystem("thumbnails", {

			path: thumbsfolder,

			beforeWrite: function(fileObj) {
				// We return an object, which will change the
				// filename extension and type for this store only.
				return {
					extension: 'jpg',
					type: 'image/jpg'
				};
			},

			transformWrite: function(fileObj, readStream, writeStream) {
				
				// var features = Imagemagick.identify(fileObj.name());
				// console.log(features);

				// Transform the image into a 64x64px thumbnail
				// gm(readStream).resize(128).stream('JPG').pipe(writeStream);

			}

		})
	]
});

// console.log(Images.files.find().fetch());

if(Meteor.isClient) {
	Meteor.subscribe('Images');
}

// Small New DB Test

MyPix = new Mongo.Collection('pix');

if(Meteor.isClient) {
	Meteor.subscribe('MyPix');
}

