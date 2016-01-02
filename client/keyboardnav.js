Meteor.startup(function() {
	$(document).on('keyup', function(event) {
		const thisRoute = FlowRouter.getRouteName();
		// shortcuts for SpriteBox Template
		if (thisRoute === 'newSpriteBox') {
			if (event.keyCode === 75) { // key k
				// event.preventDefault(); // why is this not working?
				const olderDocument = MyPix.findOne({}, {sort: {uploadedAt: 1}});
				const params = {_id: olderDocument._id, boxsize: 'auto'};
				FlowRouter.go('newSpriteBox', params);
			}
			if (event.keyCode === 74) { // key j
				// event.preventDefault(); // why is this not working?
				const newerDocument = MyPix.findOne({}, {sort: {uploadedAt: -1}});
				const params = {_id: newerDocument._id, boxsize: 'auto'};
				FlowRouter.go('newSpriteBox', params);
			}
			if (event.keyCode === 73) { // key i
				if (Session.get('displaySpriteBoxInfo') === 'true') {
					Session.set('displaySpriteBoxInfo', 'false');
				} else {
					Session.set('displaySpriteBoxInfo', 'true');
				}
			}
		}

		// // shortcuts for pool Template
		// // (does not work well as the arrow keys can interfere with the search field)
		// if (thisRoute == 'pool') {
		// 	if (event.keyCode == 37, 39) {
		// 		var currentPage = Number(Router.current().params.page);
		// 		var currentSlug = Router.current().params.slug;
		// 		var thisQuery = Router.current().params.query;
		// 		var maxPages = Math.ceil(Counts.get('numberOfFinds') / displayQty);
		// 	};

		// 	if (event.keyCode == 37) {
		// 		if (currentPage > 1) {
		// 			var newerPage = currentPage - 1;
		// 			Router.go('pool', {slug: currentSlug, page: newerPage}, {query: thisQuery});
		// 		}
		// 	} else if (event.keyCode == 39){
		// 		if (currentPage < maxPages) {
		// 			var olderPage = currentPage + 1;
		// 			Router.go('pool', {slug: currentSlug, page: olderPage}, {query: thisQuery});
		// 		}
		// 	}
		// }
	});
});
