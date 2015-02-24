Meteor.publish('aPix', function(id) {
	check(id, String);

	var selector = id;

	// limit fields to be published
	var options = {fields: {
		// '_id': 1,
		'original.name': 1,
		'uploadedAt': 1,
		'copies.OriginalPix.key': 1,
		'metadata.width': 1,
		'metadata.height': 1,
		'metadata.backColor': 1,
		'metadata.tags': 1,
		'metadata.copyright': 1,
	}};

	return MyPix.find(selector, options);
});

Meteor.publish('PixQuery', function(slug, page) {
	var reg = RegExp(slug, 'i', 's');
	cursor = (displayQty * page) - displayQty;
	Counts.publish(this, 'numberOfFinds', MyPix.find({
		$or: [
			{"metadata.tags" : {$regex: reg}},
			{"original.name" : {$regex: reg}}
		]
	}), { noReady: true });
	return MyPix.find({
		$or: [
			{"metadata.tags" : {$regex: reg}},
			{"original.name" : {$regex: reg}}
		]
	}, {
		sort: {uploadedAt: -1},
		limit: displayQty,
		skip: cursor
	})
})