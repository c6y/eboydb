Template.tags.onCreated(function() {
	this.distinctTags = new ReactiveVar();
	Meteor.call('getDistinctTags', (error, result) => {
		if (error) {
			// do something
		} else {
			this.distinctTags.set(result); // save result when we get it
		}
	});
});

Template.tags.helpers({
	tags: function() {
		const theTags = Template.instance().distinctTags.get().sort();
		// turn theTags array to tags — and path-to-tags
		return _.map(theTags, aTag => {
			const params = {slug: aTag, page: '1'};
			const queryParams = {q: 'tag'};
			const pathToTag = FlowRouter.path('pool', params, queryParams);
			return {
				aTag,
				pathToTag,
			};
		});
	},
	tagsQuantity() {
		const tagsArray = Template.instance().distinctTags.get();
		return tagsArray.length;
	},
});
