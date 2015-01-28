//Publish method

Meteor.publish('MyPix', function(cursor) {
	Counts.publish(this, 'numberOfPosts', MyPix.find(), { noReady: true });
	return MyPix.find({}, {sort: {uploadedAt: -1}, limit: 4, skip: cursor});
});

Meteor.publish('aPix', function(id) {
  check(id, String);
  console.log('id: ' + id);
  return MyPix.find(id);
});