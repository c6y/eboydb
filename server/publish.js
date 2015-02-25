Meteor.publish('aPix', function(id) {
	check(id, String);

	// // getting slug to provide context for previous and next
	// if (!slug) {
	// 	slug = 'all';
	// }
	// console.log('Search slug: ' + slug);

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





// Meteor.publish('nextPix', function(id, slug) {
	
// 	check(id, String);

// 	var thisUploadedAt = MyPix.findOne({_id: id});
// 	console.log('thisUploadedAt: ' + thisUploadedAt._id);

// 	var selector = {
// 		uploadedAt: {$gt: thisUploadedAt},
// 		"metadata.tags": slug
// 	};

// 	var options = {
// 		sort: {uploadedAt: 1},
// 		limit: 1
// 	}

// 	return MyPix.find(selector, options);
// });





// Meteor.publish('slidePix', function(id, slug) {
// 	check(id, String);

// 	// slug can be null
// 	console.log('slug: ' + slug);

// 	var dateOfThisDoc = MyPix.findOne(id).uploadedAt;
// 	console.log('dateOfThisDoc: ' + dateOfThisDoc);

// 	var previousDateDoc = MyPix.findOne(
// 		{uploadedAt: {$lt: dateOfThisDoc}},
// 		{"metadata.tags": slug}
// 	);
// 	console.log('previousDateDoc: ' + previousDateDoc._id);

// 	var nextDateDoc = MyPix.findOne(
// 		{uploadedAt: {$gt: dateOfThisDoc}},
// 		{"metadata.tags": slug}
// 	);
// 	console.log('nextDateDoc: ' + nextDateDoc._id);

// 	var selector = id;

// 	// limit fields to be published
// 	var options = {fields: {
// 		// '_id': 1,
// 		'original.name': 1,
// 		'uploadedAt': 1,
// 		'copies.OriginalPix.key': 1,
// 		'metadata.width': 1,
// 		'metadata.height': 1,
// 		'metadata.backColor': 1,
// 		'metadata.tags': 1,
// 		'metadata.copyright': 1,
// 	}};

// 	// return MyPix.find(selector, options);
// 	return MyPix.find(selector);
// });


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