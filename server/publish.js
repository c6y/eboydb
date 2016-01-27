Meteor.publish('aPix', function(id, slug, query) {
	check(id, String);

	// get the date of document
	const docDate = MyPix.findOne(id).uploadedAt;

	// check if slug is part of array that contain aliases
	// that will get everything
	// the aliasesForFullSearch array is defined in environment.js
	let theSlug = slug;
	if (aliasesForFullSearch.indexOf(theSlug) > -1) {
		theSlug = '.*';
	}

	const reg = RegExp(theSlug, 'i', 's');
	const slugReg = {$regex: reg};

	// check kind of query (tag, name or none)
	// set to search in name AND tags if there's no query
	let selectorGetTotal = {};
	let selectorGetOlder = {};

	if (query === 'tag') {
		selectorGetTotal = {'metadata.tags': theSlug};
		selectorGetOlder = {
			'metadata.tags': theSlug,
			uploadedAt: {$lt: docDate},
		};
	} else if (query === 'name') {
		selectorGetTotal = {'original.name': slugReg};
		selectorGetOlder = {
			'original.name': slugReg,
			uploadedAt: {$lt: docDate},
		};
	} else {
		selectorGetTotal = {
			$or: [
				{'metadata.tags': slugReg},
				{'original.name': slugReg},
			],
		};
		selectorGetOlder = {
			$or: [
				{'metadata.tags': slugReg},
				{'original.name': slugReg},
			],
			uploadedAt: {$lt: docDate},
		};
	}

	const total = MyPix.find(selectorGetTotal).count();
	const index = MyPix.find(selectorGetOlder).count();

	// set filter to sort by date and get next document id
	let newerDocId = false;
	const nextIndex = index + 1;
	const filterNext = {
		sort: {uploadedAt: 1},
		skip: nextIndex,
	};
	if (total > nextIndex) {
		const newerDoc = MyPix.findOne(selectorGetTotal, filterNext);
		newerDocId = newerDoc._id;
	}

	// set filter to sort by date and get previous document id
	let olderDocId = false;

	const prevIndex = index - 1;
	const filterPrevious = {
		sort: {uploadedAt: 1},
		skip: prevIndex,
	};
	if (prevIndex >= 0) {
		const olderDoc = MyPix.findOne(selectorGetTotal, filterPrevious);
		olderDocId = olderDoc._id;
	}

	// get the previous, main and next document
	const selector = {_id: { $in: [
		olderDocId,
		id,
		newerDocId,
	]}};

	// limit fields to be published
	const options = {fields: {
		_id: 1,
		'original.name': 1,
		'original.size': 1,
		uploadedAt: 1,
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
	let selector = {};

	if (query === 'tag') {
		const tagSearch = slug;
		selector = {'metadata.tags': tagSearch};
	} else if (query === 'name') {
		const nameSearch = slug;
		const reg = RegExp(nameSearch, 'i', 's');
		selector = {'original.name': {$regex: reg}};
	} else {
		const reg = RegExp(slug, 'i', 's');
		selector = {
			$or: [
				{'metadata.tags': {$regex: reg}},
				{'original.name': {$regex: reg}},
			],
		};
	}

	cursor = displayQty * page - displayQty;

	const options = {
		sort: {uploadedAt: -1},
		limit: displayQty,
		skip: cursor,
	};
	Counts.publish(
		this,
		'numberOfFinds',
		MyPix.find(selector),
		{ noReady: true }
	);
	return MyPix.find(selector, options);
});

Meteor.publish('userStatus', function() {
	const options = {fields: {
		_id: 1,
		username: 1,
		'profile.name': 1,
		'profile.isAdmin': 1,
		'profile.isEditor': 1,
	}};
	return Meteor.users.find({}, options);
});

Meteor.publish('aDocsLinks', function(imageId) {
	const selector = {myPixId: imageId};
	const options = {fields: {
		_id: 1,
		myPixId: 1,
		label: 1,
		name: 1,
		url: 1,
	}};
	return DocLinks.find(selector, options);
});
