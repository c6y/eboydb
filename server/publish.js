Meteor.publish('aPix', function(id) {
  check(id, String);
  console.log('id: ' + id);
  return MyPix.find(id);
});

Meteor.publish('PixPage', function(page) {
	Counts.publish(this, 'numberOfPosts', MyPix.find(), { noReady: true });
	cursor = (displayQty * page) - displayQty;
	console.log('page: ' + page);
	console.log('cursor: ' + cursor);
	// return MyPix.find({});
	return MyPix.find({}, {sort: {uploadedAt: -1}, limit: displayQty, skip: cursor});
});