Meteor.publish('aPix', function(id) {
  check(id, String);
  console.log('publish: aPix id: ' + id);
  return MyPix.find(id);
});

Meteor.publish('PixPage', function(page) {
	Counts.publish(this, 'numberOfPosts', MyPix.find(), { noReady: true });
	cursor = (displayQty * page) - displayQty;
	return MyPix.find({}, {sort: {uploadedAt: -1}, limit: displayQty, skip: cursor});
});