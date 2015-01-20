//Publish method

Meteor.publish('MyPix', function(cursor) {
	Counts.publish(this, 'numberOfPosts', MyPix.find(), { noReady: true });
	return MyPix.find({}, { limit:4, skip:cursor });
});