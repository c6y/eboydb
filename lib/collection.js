var originalsfolder = "/eboydb_test/images/originals";

MyPix = new FS.Collection("MyPix", {
	stores: [
		new FS.Store.FileSystem("MyPix", {path: originalsfolder}),
	]
});

if(Meteor.isClient) {
	
	Session.setDefault('docCursor', 0);
	console.log(Session.get('docCursor'));

	Meteor.autorun(function(){
		Meteor.subscribe('MyPix', Session.get('docCursor'));
	})
}

