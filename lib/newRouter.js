FlowRouter.route('/', {
	triggersEnter: [function(context, redirect) {
		redirect('/newpool/everything/1');
	}],
});

FlowRouter.route( '/adddoc', {
	action() {
		BlazeLayout.render( 'applicationLayout', { main: 'addDoc' } );
	},
	name: 'addDoc',
});

FlowRouter.route( '/newspritebox/:_id/:boxsize', {
	action() {
		BlazeLayout.render( 'applicationLayout', { main: 'newSpriteBox' } );
	},
	name: 'newSpriteBox',
});

FlowRouter.route( '/newdocedit/:_id', {
	action() {
		BlazeLayout.render( 'applicationLayout', { main: 'newDocEdit' } );
	},
	name: 'newDocEdit',
});

FlowRouter.route( '/newlogin', {
	action() {
		BlazeLayout.render( 'applicationLayout', { main: 'newLogin' } );
	},
	name: 'newLogin',
});

FlowRouter.route( '/newpool/:slug/:page', {
	action() {
		BlazeLayout.render( 'applicationLayout', {
			header: 'newPoolHeader',
			main: 'newPool',
		});
	},
	name: 'newPool',
});

FlowRouter.route( '/colors', {
	action() {
		BlazeLayout.render( 'applicationLayout', { main: 'colors' } );
	},
	name: 'colors',

});

