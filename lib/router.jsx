FlowRouter.route( '/tags', {
	action() {
		ReactLayout.render( Default, { content: <Tags /> } );
	},
	name: 'tags',
});
