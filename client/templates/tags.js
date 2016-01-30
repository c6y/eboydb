Template.tags.onCreated(function() {
	const self = this;
	self.autorun(function() {
		Meteor.call('getTagsData', function(error, result) {
			Session.set('tagsList', result);
		});
	});
});

Template.tags.helpers({
	showTagCloud() {
		const tagsArray = Session.get('tagsList');
		return tagsArray;
	},
	toTagPath() {
		const thisTag = this;
		const params = {slug: thisTag, page: '1'};
		const queryParams = {q: 'tag'};
		return FlowRouter.path('pool', params, queryParams);
	},
	tagsQuantity() {
		const tagsArray = Session.get('tagsList');
		return tagsArray.length;
	},
});
