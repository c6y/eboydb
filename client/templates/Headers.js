// Session.setDefault('searchJumpOff', Router.current().route.url);

Template.mainHeader.helpers({
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

Template.searchPool.helpers({
	'searchSlug': function() {
		return Router.current().params.slug;
	}
});