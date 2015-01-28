var subs = new SubsManager();

Router.route('/', {
	name: 'home'
});

Router.route('/doc/:_id', {
	name: 'doc',
	template: 'doc',
	waitOn: function() {
		return [
			subs.subscribe('aPix', this.params._id)
		];
	},
	data: function() {
		return MyPix.findOne({_id: this.params._id});
	}
});