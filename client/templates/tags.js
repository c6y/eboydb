Template.tags.onCreated(function() {
	this.distinctTags = new ReactiveVar();
	Meteor.call('getDistinctTags', (error, result) => {
		if (error) {
			// error
		} else {
			this.distinctTags.set(result); // save result when we get it
		}
	});
});

Template.tags.onRendered(function() {
	const route = FlowRouter.getRouteName();
	DocHead.setTitle(route + ' – eboy.io');
});

Template.tags.helpers({
	tags: function() {
		const theTags = Template.instance().distinctTags.get();
		let tagsSorted;
		if (theTags) {
			tagsSorted = theTags.sort();
		}

		// turn theTags array to tags — and path-to-tags
		return _.map(tagsSorted, aTag => {
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
		if (tagsArray) {
			return tagsArray.length;
		}
	},
});
