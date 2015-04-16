Meteor.publish('aPix', function(id, slug, query) {
	check(id, String);
	
	// get the date of document
	var docDate = MyPix.findOne(id).uploadedAt;

	// check kind of query (tag, name or none)
	// set to search in name AND tags if there's no query
	if (query == 'tag') {
		var preSelector = {"metadata.tags" : slug};
		var total = MyPix.find(preSelector).count();
		var selectOlder = {
			"metadata.tags" : slug,
			"uploadedAt": {"$lt" : docDate}
		};
		var index = MyPix.find(selectOlder).count();
	} else if (query == 'name') {
		var searchKey = "original.name";
		var reg = RegExp(slug, 'i', 's');
		var preSelector = {"original.name" : {$regex: reg}};
		var total = MyPix.find(preSelector).count();
		var selectOlder = {
			"original.name" : {$regex: reg},
			"uploadedAt": {"$lt" : docDate}
		};
		var index = MyPix.find(selectOlder).count();
	} else {
		console.log('no query set');
		query = false;
		var reg = RegExp(slug, 'i', 's');
		var preSelector = {
			$or: [
				{"metadata.tags" : {$regex: reg}},
				{"original.name" : {$regex: reg}}
			]
		}
		var total = MyPix.find(preSelector).count();
		var selectOlder = {
			$or: [
				{"metadata.tags" : {$regex: reg}},
				{"original.name" : {$regex: reg}}
			],
			"uploadedAt": {"$lt" : docDate}
		};
		var index = MyPix.find(selectOlder).count();
	}


	console.log('id: ' + id);
	console.log('docDate: ' + docDate);
	console.log('slug: ' + slug);
	console.log('query: ' + query);
	console.log('total: ' + total);
	console.log('index: ' + index);

	// set filter to sort by date and get next document id
	var nextIndex = index + 1;

	var filterNext = {
		sort: {uploadedAt: 1},
		skip: nextIndex
	};
	if (total > nextIndex) {
		var newerDoc = MyPix.findOne(preSelector, filterNext);
		var newerDocId = newerDoc._id;
	} else {
		var newerDocId = false;
	}
	
	// set filter to sort by date and get previous document id
	var prevIndex = index - 1;
	var filterPrevious = {
		sort: {uploadedAt: 1},
		skip: prevIndex
	};
	if (prevIndex >= 0) {
		var olderDoc = MyPix.findOne(preSelector, filterPrevious);
		var olderDocId = olderDoc._id;
	} else {
		var olderDocId = false;
	}

	console.log('olderDocId: ' + olderDocId);
	console.log('id: ' + id);
	console.log('newerDocId: ' + newerDocId + '\n');



	// get the 3 specific docs

	var selector = {'_id': { $in: [
		olderDocId,
		id,
		newerDocId
	]}};

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