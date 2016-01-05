Template.notFound.helpers({
	toHomePath() {
		const homeRouteName = 'pool';
		const params = {slug: 'everything', page: 1};
		return FlowRouter.path(homeRouteName, params);
	},
});
