Meteor.startup(function() {
	$(document).on('keyup', function(event) {
		const thisRoute = FlowRouter.getRouteName();
		const newerKey = 219; // opening square brackets
		const olderKey = 221; // closing square brackets
		const infoKey = 73; // i

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
				// if Editor is visible then also do display SpriteBox info
				// set default if it hasn't been set before:
				Session.setDefault('displayEditor', 'false');
				const theSession = Session.get('displayEditor');
				if (theSession === 'false') {
					Session.set('displayEditor', 'true');
					Session.set('displaySpriteBoxInfo', 'true');
				} else if (theSession === 'true') {
					Session.set('displayEditor', 'false');
					Session.set('displaySpriteBoxInfo', 'false');
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
				// toggle editorMenu
				if (Meteor.user()) {
					if (Meteor.user().profile.isEditor) {
						if (event.keyCode === infoKey) {
							// set default if it hasn't been set before:
							Session.setDefault('displayEditor', 'false');
							const theSession = Session.get('displayEditor');
							if (theSession === 'false') {
								Session.set('displayEditor', 'true');
							} else if (theSession === 'true') {
								Session.set('displayEditor', 'false');
							}
						}
					}
				}
			}
		}
	});
});
