//Publish methods

Meteor.publish('Images', function() {
	return Images.find();
});

Meteor.publish('MyPix', function() {
	return MyPix.find();
})

