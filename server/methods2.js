Meteor.methods({
	getTagsData() {
		const allDocsTags = MyPix.find().fetch();
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
		return uniqueTagsArray.sort();
	},
	getDistinctTags() {
		// get unique tags only, via Mongo's distinct
		return Meteor.wrapAsync(function(callback) {
			MyPix.files.rawCollection().distinct('metadata.tags', callback);
		})();
	},
});
