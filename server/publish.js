Meteor.publish('aPix', function(id, slug, query) {
	check(id, String);

	// get the date of document
	const docDate = MyPix.findOne(id).uploadedAt;

	// check if slug is part of array that contain aliases
	// that will get everything
	// the aliasesForFullSearch array is defined in environment.js
	if (aliasesForFullSearch.indexOf(slug) > -1) {
		slug = '.*';
	}

	var reg = RegExp(slug, 'i', 's');
	var slugReg = {$regex: reg};

	// check kind of query (tag, name or none)
	// set to search in name AND tags if there's no query
	if (query == 'tag') {
		var selectorGetTotal = {"metadata.tags" : slug};
		var selectorGetOlder = {
			"metadata.tags" : slug,
			"uploadedAt": {"$lt" : docDate}
		};
	} else if (query == 'name') {
		var selectorGetTotal = {"original.name" : slugReg};
		var selectorGetOlder = {
			"original.name" : slugReg,
			"uploadedAt": {"$lt" : docDate}
		};
	} else {
		var selectorGetTotal = {
			$or: [
				{"metadata.tags" : slugReg},
				{"original.name" : slugReg}
			]
		}
		var selectorGetOlder = {
			$or: [
				{"metadata.tags" : slugReg},
				{"original.name" : slugReg}
			],
			"uploadedAt": {"$lt" : docDate}
		};
	}

	var total = MyPix.find(selectorGetTotal).count();
	var index = MyPix.find(selectorGetOlder).count();

	// set filter to sort by date and get next document id
	var nextIndex = index + 1;
	var filterNext = {
		sort: {uploadedAt: 1},
		skip: nextIndex
	};
	if (total > nextIndex) {
		var newerDoc = MyPix.findOne(selectorGetTotal, filterNext);
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
		var olderDoc = MyPix.findOne(selectorGetTotal, filterPrevious);
		var olderDocId = olderDoc._id;
	} else {
		var olderDocId = false;
	}

	// console.log('id: ' + id);
	// console.log('docDate: ' + docDate);
	// console.log('slug: ' + slug);
	// console.log('query: ' + query);
	// console.log('total: ' + total);
	// console.log('index: ' + index);
	// console.log('olderDocId: ' + olderDocId);
	// console.log('newerDocId: ' + newerDocId + '\n');

	// get the previous, main and next document
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
		'metadata.fullframe': 1,
		'metadata.madeDate': 1,
	}};

	return MyPix.find(selector, options);
});


Meteor.publish('PixQuery', function(slug, page, query) {

	// check for type of query
	if (query == 'tag') {
		var tagSearch = slug;
		var selector = {"metadata.tags" : tagSearch};
	} else if (query == 'name'){
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

Meteor.publish('userStatus', function() {
	const options = {fields: {
		'_id': 1,
		'username': 1,
		'profile.name': 1,
		'profile.isAdmin': 1,
		'profile.isEditor': 1,
	}};
	return Meteor.users.find({}, options);
});
