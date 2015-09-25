Meteor.startup(function () {
	$(document).on('keyup', function (event) {

		var thisRoute = Router.current().route.getName();
		// console.log('thisRoute: ' + thisRoute);
		// console.log('event.keyCode: ' + event.keyCode);

		// shortcuts for SpriteBox Template
		if (thisRoute == 'spriteBox') {

			if (event.keyCode == 75) { // key k
				// event.preventDefault(); // why is this not working?
				var olderDocument = MyPix.findOne({}, {sort: {uploadedAt: 1}});
				Router.go('spriteBox', {_id: olderDocument._id, boxsize: 'auto'});
				// console.log('showing previous document: ' + olderDocument._id);
			}
			else if (event.keyCode == 74) { // key j
				// event.preventDefault(); // why is this not working?
				var newerDocument = MyPix.findOne({}, {sort: {uploadedAt: -1}});
				Router.go('spriteBox', {_id: newerDocument._id, boxsize: 'auto'});
				// console.log('showing next document: ' + newerDocument._id);
			}
			else if (event.keyCode == 73) { // key i
				if (Session.get('displaySpriteBoxInfo') == 'block') {
					Session.set('displaySpriteBoxInfo', 'none');
				} else {
					Session.set('displaySpriteBoxInfo', 'block');
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
	})
});