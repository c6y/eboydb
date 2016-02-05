Template.poolHeader.helpers({
	name() {
		return siteName;
	},
	toHomePath() {
		const homeRouteName = 'pool';
		const params = {slug: 'everything', page: 1};
		return FlowRouter.path(homeRouteName, params);
	},
});

Template.newPagingHeader.helpers({
	postsCount() {
		return Counts.get('numberOfFinds');
	},
	currentPage() {
		const currentPage = FlowRouter.getParam('page');
		return currentPage;
	},
	totalPages() {
		return Math.ceil(Counts.get('numberOfFinds') / displayQty);
	},
});

Template.newPagingHeader.events({
	'click .previous': function(event) {
		event.preventDefault();
		const currentPage = Number(FlowRouter.getParam('page'));
		if (currentPage > 1) {
			const previousPage = currentPage - 1;
			FlowRouter.setParams({page: previousPage});
		}
	},
	'click .next': function(event) {
		event.preventDefault();
		const currentPage = Number(FlowRouter.getParam('page'));
		const maxPages = Math.ceil(Counts.get('numberOfFinds') / displayQty);

		if (currentPage < maxPages) {
			const nextPage = currentPage + 1;
			FlowRouter.setParams({page: nextPage});
		}
	},
});

// display current search term and query in search field
Template.newSearchPool.helpers({
	searchTerm() {
		const theslug = FlowRouter.getParam('slug');
		const thequery = FlowRouter.getQueryParam('q');

		let queryAbreviation;
		if (thequery === 'tag') {
			queryAbreviation = 't:';
		} else if (thequery === 'name') {
			queryAbreviation = 'n:';
		} else {
			queryAbreviation = '';
		}

		const currentSearch = queryAbreviation + theslug;
		return currentSearch;
	},
});

Template.newSearchPool.events({
	'submit .seachDbForm': function(event) {
		event.preventDefault();

		let searchValue = event.target.searchDB.value;
		if (!searchValue) {
			searchValue = 'everything'; // if no value search for everything
		}

		// transform string to lower case and remoive outer whitespace
		const searchingFor = searchValue.toLowerCase().trim();
		const re = / /gi;
		// remove inside whitespace (used for tag search only)
		const trimmedSearch = searchingFor.replace(re, '');
		// read this for status in search field
		Session.set('slug', trimmedSearch);

		const taglabel = /^t\:./;
		const namelabel = /^n\:./;

		if (searchingFor.match(taglabel)) {
			const tagSearch = trimmedSearch.substr(2); // for tags use trimmedSearch
			const checkedTag = Meteor.myFunctions.checkTagAliases(tagSearch);
			FlowRouter.setParams({slug: checkedTag, page: '1'});
			FlowRouter.setQueryParams({q: 'tag'});
		} else if (searchingFor.match(namelabel)) {
			const nameSearch = searchingFor.substr(2);
			FlowRouter.setParams({slug: nameSearch, page: '1'});
			FlowRouter.setQueryParams({q: 'name'});
		} else {
			FlowRouter.setParams({slug: searchingFor, page: '1'});
			FlowRouter.setQueryParams({q: null});
		}
	},
});
