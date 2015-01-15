MyPix = new Mongo.Collection('pix');

if(Meteor.isClient) {
	Meteor.subscribe('MyPix');
}

