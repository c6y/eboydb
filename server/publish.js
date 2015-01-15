//Publish methods

Meteor.publish('MyPix', function() {
	return MyPix.find();
})

