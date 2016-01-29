Meteor.methods({
	getTagsData() {
		const allDocsTags = MyPix.find().fetch();
		// console.log('allDocsTags: ' + allDocsTags);
		uniqueTagsArray = [];

		allDocsTags.map((doc) => {
			const tags = doc.metadata.tags;
			// console.log('tags: ' + tags);
			tags.forEach(function(element) {
				const isUnique = uniqueTagsArray.indexOf(element);
				if (isUnique < 0) {
					uniqueTagsArray.push(element);
				}
			});
		});
		// console.log('uniqueTagsArray: ' + uniqueTagsArray);
		return uniqueTagsArray.sort();
		// return 'TESTTEST';
	},
});
