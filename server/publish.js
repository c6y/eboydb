Meteor.publish('aPix', function(id) {
	check(id, String);
	var selector = id;
	// limit fields to be published
	var options = {fields: {
		'_id': 1,
		'original.name': 1,
		'original.size': 1,
		'uploadedAt': 1,
		'copies.OriginalPix.key': 1,
		'metadata.width': 1,
		'metadata.height': 1,
		'metadata.backColor': 1,
		'metadata.tags': 1,
		'metadata.copyright': 1,
		'metadata.license': 1,
		'metadata.uploadedBy': 1,
	}};
	return MyPix.find(selector, options);
});

Meteor.publish('PixQuery', function(slug, page, query) {

	if (query.q == 'tag') {

		var tagSearch = slug;
		var selector = {"metadata.tags" : tagSearch};

	} else if (query.q == 'name'){

		var nameSearch = slug;
		var reg = RegExp(nameSearch, 'i', 's');
		var selector = {"original.name" : {$regex: reg}};

	} else {

		var reg = RegExp(slug, 'i', 's');
		var selector = {
			$or: [
				{"metadata.tags" : {$regex: reg}},
				{"original.name" : {$regex: reg}}
			]
		}
	}

	cursor = (displayQty * page) - displayQty;

	var options = {
		sort: {uploadedAt: -1},
		limit: displayQty,
		skip: cursor
	}
	Counts.publish(
		this,
		'numberOfFinds',
		MyPix.find(selector),
		{ noReady: true }
	);
	return MyPix.find(selector, options);
})

Meteor.publish("userStatus", function() {
	var options = {fields: {
		'_id': 1,
		'username': 1,
		'profile.name': 1,
		'profile.isAdmin': 1,
		'profile.isEditor': 1
	}};
  return Meteor.users.find({}, options);
});