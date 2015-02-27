// Session.setDefault('searchJumpOff', Router.current().route.url);

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

Template.mainHeader.events({
	'keypress input.searchFor': function (event) {
		if (event.which === 13) {
			var searchingFor = event.currentTarget.value;
			Session.set('slug', searchingFor);
			console.log(Session.get('slug'));
			// console.log('slug: ' + slug);
			Router.go('pool', {slug: searchingFor, page: 1});
		}
	}
});

Template.pagingHeader.events({
	'click .previous': function(event, template) {
		var currentPage = Number(Router.current().params.page);
		var currentSlug = Router.current().params.slug;
		if (currentPage > 1) {
			var previousPage = currentPage - 1;
			Router.go('pool', {slug: currentSlug, page: previousPage});
		}
	},
	'click .next': function(event, template) {
		var currentPage = Number(Router.current().params.page);
		var maxPages = Math.ceil(Counts.get('numberOfFinds') / displayQty);
		var currentSlug = Router.current().params.slug;
		if (currentPage < maxPages) {
			var nextPage = currentPage + 1;
			Router.go('pool', {slug: currentSlug, page: nextPage});
		}
	}
});