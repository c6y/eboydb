FlowRouter.route('/', {
	triggersEnter: [function(context, redirect) {
		redirect('/pool/everything/1');
	}],
});

FlowRouter.route( '/adddoc', {
	action() {
		BlazeLayout.render( 'applicationLayout', { main: 'addDoc' } );
	},
	name: 'addDoc',
});

FlowRouter.route( '/spritebox/:_id/:boxsize', {
	action() {
		BlazeLayout.render( 'applicationLayout', { main: 'spriteBox' } );
	},
	name: 'spriteBox',
});

FlowRouter.route( '/docedit/:_id', {
	action() {
		BlazeLayout.render( 'applicationLayout', { main: 'docEdit' } );
	},
	name: 'docEdit',
});

FlowRouter.route( '/login', {
	action() {
		BlazeLayout.render( 'applicationLayout', { main: 'login' } );
	},
	name: 'login',
});

FlowRouter.route( '/pool/:slug/:page', {
	action() {
		BlazeLayout.render( 'applicationLayout', {
			header: 'poolHeader',
			main: 'pool',
		});
	},
	name: 'pool',
});

FlowRouter.route( '/colors', {
	action() {
		BlazeLayout.render( 'applicationLayout', { main: 'colors' } );
	},
	name: 'colors',

});

