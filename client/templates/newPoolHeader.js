Template.newPoolHeader.helpers({
	name() {
		return siteName;
	},
});

Template.newPoolHeader.events({
	'click .dblogo': function(event) {
		event.preventDefault();
		FlowRouter.setParams({slug: 'everything', page: '1'});
		FlowRouter.setQueryParams({q: null});
	},
});

Template.newPagingHeader.helpers({
	'postsCount': function() {
		return Counts.get('numberOfFinds');
	},
	'currentPage': function() {
		const currentPage = FlowRouter.getParam('page');
		return currentPage;
	},
	'totalPages': function() {
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
		const searchingFor = event.target.searchDB.value.toLowerCase();
		const re = / /gi;

		const trimmedSearch = searchingFor.replace(re, ''); // remove whitespace
		Session.set('slug', trimmedSearch); // read this for status in search field

		const taglabel = /^t\:./;
		const namelabel = /^n\:./;

		if (trimmedSearch.match(taglabel)) {
			const tagSearch = trimmedSearch.substr(2);
			FlowRouter.setParams({slug: tagSearch, page: '1'});
			FlowRouter.setQueryParams({q: 'tag'});
		} else if (trimmedSearch.match(namelabel)) {
			const nameSearch = trimmedSearch.substr(2);
			FlowRouter.setParams({slug: nameSearch, page: '1'});
			FlowRouter.setQueryParams({q: 'name'});
		} else {
			FlowRouter.setParams({slug: trimmedSearch, page: '1'});
			FlowRouter.setQueryParams({q: null});
		}
	},
});
