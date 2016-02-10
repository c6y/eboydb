FlowRouter.route('/', {
	triggersEnter: [function(context, redirect) {
		redirect('/pool/everything/1');
	}],
});

FlowRouter.route('/pool', {
	triggersEnter: [function(context, redirect) {
		redirect('/pool/everything/1');
	}],
});

FlowRouter.route( '/adddoc', {
	action() {
		GAnalytics.pageview();
		BlazeLayout.render( 'applicationLayout', { main: 'addDoc' } );
	},
	name: 'addDoc',
});

FlowRouter.route( '/spritebox/:_id/:boxsize', {
	action() {
		GAnalytics.pageview();
		BlazeLayout.render( 'applicationLayout', { main: 'spriteBox' } );
	},
	name: 'spriteBox',
});

FlowRouter.route( '/docedit/:_id', {
	action() {
		GAnalytics.pageview();
		BlazeLayout.render( 'applicationLayout', { main: 'docEdit' } );
	},
	name: 'docEdit',
});

FlowRouter.route( '/login', {
	action() {
		GAnalytics.pageview();
		BlazeLayout.render( 'applicationLayout', { main: 'login' } );
	},
	name: 'login',
});

FlowRouter.route( '/pool/:slug/:page', {
	action() {
		GAnalytics.pageview();
		BlazeLayout.render( 'applicationLayout', {
			header: 'poolHeader',
			main: 'pool',
		});
	},
	name: 'pool',
});

FlowRouter.route( '/colors', {
	action() {
		GAnalytics.pageview();
		BlazeLayout.render( 'applicationLayout', { main: 'colors' } );
	},
	name: 'colors',
});

FlowRouter.route( '/tags', {
	action() {
		GAnalytics.pageview();
		BlazeLayout.render( 'applicationLayout', { main: 'tags' } );
	},
	name: 'tags',
});

FlowRouter.route( '/relations', {
	action() {
		GAnalytics.pageview();
		BlazeLayout.render( 'applicationLayout', { main: 'relations' } );
	},
	name: 'relations',
});

FlowRouter.notFound = {
	action() {
		GAnalytics.pageview();
		BlazeLayout.render( 'applicationLayout', { main: 'notFound' } );
	},
};

FlowRouter.route( '/docrender/:_id', {
	action() {
		GAnalytics.pageview();
		BlazeLayout.render( 'applicationLayout', { main: 'docRender' } );
	},
	name: 'docRender',
});
