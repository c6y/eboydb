const StoreGridFS = new FS.Store.GridFS('OriginalPix', {
	transformWrite(fileObj, readStream, writeStream) {
		// read image dimensions and write to metadata
		gm(readStream, fileObj.name())
		.size({bufferStream: true}, FS.Utility.safeCallback(function(err, size) {
			if (err) {
				// handle the error
			} else {
				fileObj.update({$set: {
					'metadata.width': size.width,
					'metadata.height': size.height,
				}});
			}
		}))
		.stream()
		.pipe(writeStream);
	},
	// chunkSize: 1024*1024 // default is 255 kb
});

MyPix = new FS.Collection('MyPix', {
	stores: [ StoreGridFS ], // don't forget to add filters!!!
	filter: {
		maxSize: 1048576, // in bytes
		allow: {
			contentTypes: ['image/*'],
			extensions: ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'gif', 'GIF'],
		},
		onInvalid(message) {
			if (Meteor.isClient) {
				alert(message);
			} else {
				console.log(message);
			}
		},
	}
});

MyPix.allow({
	download(userId, doc) {
		return true;
	},
	insert() {
		return true;
	},
	update(userId, doc, fieldNames, modifier) {
		return true;
	},
});

// prevent users to be updated from any client console
Meteor.users.deny({
	update: function() {
		return noConsoleUpdates; // set in environment.js
	},
});

if (Meteor.isClient) {
	Session.setDefault('docCursor', 0);
	// console.log('docCursor: ' + Session.get('docCursor'));
	Meteor.autorun(function() {
		Meteor.subscribe('MyPix', Session.get('docCursor'));
	});
}

DocLinks = new Mongo.Collection('links');
