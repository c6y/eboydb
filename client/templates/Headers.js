// Session.setDefault('searchJumpOff', Router.current().route.url);

Template.mainHeader.helpers({
	name: function () {
		return siteName;
	}
});

Template.pagingHeader.helpers({
	'postsCount': function() {
		return Counts.get('numberOfFinds')
	},
	'currentPage': function() {
		var currentPage = Number(Router.current().params.page);
		return currentPage;
	},
	'totalPages': function() {
		return Math.ceil(Counts.get('numberOfFinds') / displayQty);
	},
});

Template.searchPool.events({
	'submit .seachDbForm': function (event) {
		event.preventDefault();
		var searchingFor = event.target.searchDB.value.toLowerCase();
		re = / /gi;

		var trimmedSearch = searchingFor.replace(re, ''); // remove whitespace
		Session.set('slug', trimmedSearch); // read this for status in search field

		var taglabel = /^t\:./;
		var namelabel = /^n\:./;

		if (trimmedSearch.match(taglabel)) {
			var tagSearch = trimmedSearch.substr(2);
			// Session.set('slug', tagSearch);
			Router.go('pool', {slug: tagSearch, page: 1}, {query: 'q=tag'});

		} else if (trimmedSearch.match(namelabel)) {
			var nameSearch = trimmedSearch.substr(2);
			// Session.set('slug', nameSearch);
			Router.go('pool', {slug: nameSearch, page: 1}, {query: 'q=name'});

		} else {
			Router.go('pool', {slug: trimmedSearch, page: 1});
			// Session.set('slug', trimmedSearch);
		}
	}
});

Template.pagingHeader.events({
	'click .previous': function(event, template) {
		event.preventDefault();
		var currentPage = Number(Router.current().params.page);
		var currentSlug = Router.current().params.slug;
		if (currentPage > 1) {
			var previousPage = currentPage - 1;
			Router.go('pool', {slug: currentSlug, page: previousPage});
		}
	},
	'click .next': function(event, template) {
		event.preventDefault();
		var currentPage = Number(Router.current().params.page);
		var maxPages = Math.ceil(Counts.get('numberOfFinds') / displayQty);
		var currentSlug = Router.current().params.slug;
		if (currentPage < maxPages) {
			var nextPage = currentPage + 1;
			Router.go('pool', {slug: currentSlug, page: nextPage});
		}
	}
});