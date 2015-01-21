//Publish method

Meteor.publish('MyPix', function(cursor) {
	Counts.publish(this, 'numberOfPosts', MyPix.find(), { noReady: true });
	return MyPix.find({}, {sort: {createdAt: -1}, limit: 4, skip: cursor});
});