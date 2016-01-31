Meteor.startup(function() {
	$(document).on('keyup', function(event) {
		const thisRoute = FlowRouter.getRouteName();
		const newerKey = 219;
		const olderKey = 221;
		const infoKey = 73;

		// shortcuts for SpriteBox Template
		if (thisRoute === 'spriteBox') {
			if (event.keyCode === olderKey) {
				const olderDocument = MyPix.findOne({}, {sort: {uploadedAt: 1}});
				const params = {_id: olderDocument._id, boxsize: 'auto'};
				FlowRouter.go('spriteBox', params);
			}
			if (event.keyCode === newerKey) {
				const newerDocument = MyPix.findOne({}, {sort: {uploadedAt: -1}});
				const params = {_id: newerDocument._id, boxsize: 'auto'};
				FlowRouter.go('spriteBox', params);
			}
			if (event.keyCode === infoKey) {
				if (Session.get('displaySpriteBoxInfo') === 'true') {
					Session.set('displaySpriteBoxInfo', 'false');
				} else {
					Session.set('displaySpriteBoxInfo', 'true');
				}
			}
		}
		// shortcuts for pool Template
		if (thisRoute === 'pool') {
			// allow navigation only if searchField does not have focus
			if (document.activeElement !== searchField) {
				let currentPage;
				let currentSlug;
				let thisQuery;
				let maxPages;
				if (event.keyCode === newerKey || event.keyCode === olderKey) {
					currentPage = FlowRouter.getParam('page');
					currentSlug = FlowRouter.getParam('slug');
					thisQuery = FlowRouter.getParam('query');
					maxPages = Math.ceil(Counts.get('numberOfFinds') / displayQty);
				}
				if (event.keyCode === newerKey) {
					if (currentPage > 1) {
						const newerPage = Number(currentPage) - 1;
						const params = {slug: currentSlug, page: newerPage};
						const query = {query: thisQuery};
						FlowRouter.go('pool', params, query);
					}
				} else if (event.keyCode === olderKey) {
					if (currentPage < maxPages) {
						const olderPage = Number(currentPage) + 1;
						const params = {slug: currentSlug, page: olderPage};
						const query = {query: thisQuery};
						FlowRouter.go('pool', params, query);
					}
				}
			}
		}
	});
});
