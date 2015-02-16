Meteor.publish('aPix', function(id) {
  check(id, String);
  console.log('publish: aPix id: ' + id);
  return MyPix.find(id);
});

Meteor.publish('PixPage', function(slug, page) {
	Counts.publish(this, 'numberOfPosts', MyPix.find(), { noReady: true });
	cursor = (displayQty * page) - displayQty;
	// return MyPix.find({}, {sort: {uploadedAt: -1}, limit: displayQty, skip: cursor});
	if (slug == 'all') {
		return MyPix.find({}, {sort: {uploadedAt: -1}, limit: displayQty, skip: cursor});
	} else {
		return MyPix.find({"metadata.tags" : slug}, {sort: {uploadedAt: -1}, limit: displayQty, skip: cursor});
	}
});

// Meteor.publish('PixQuery', function(slug, page) {
// 	var reg = RegExp(slug, 'i', 's')
// 	return MyPix.find({
// 		"metadata.tags" : {
// 			$regex: reg
// 		}
// 	})
// })

Meteor.publish('PixQuery', function(slug, page) {
	Counts.publish(this, 'numberOfPosts', MyPix.find(), { noReady: true });
	var reg = RegExp(slug, 'i', 's')
	return MyPix.find({
		$or: [
			{"metadata.tags" : {$regex: reg}},
			{"original.name" : {$regex: reg}}
		]
	})
})