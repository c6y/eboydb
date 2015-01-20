MyPix = new Mongo.Collection('pix');

if(Meteor.isClient) {
	
	Session.setDefault('docCursor', 0);
	console.log(Session.get('docCursor'));

	Meteor.autorun(function(){
		Meteor.subscribe('MyPix', Session.get('docCursor'));
	})
}

