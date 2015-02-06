var subs = new SubsManager();



Router.route('/', function () {
  this.redirect('browse', {page: 1});
});

Router.route('/browse/:page', {
	name: 'browse',
	template: 'browse',
	data: function() {
		Meteor.subscribe('PixPage', this.params.page);
	}
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

//////////////////////////////////// TESTS
Router.route('/tester/:_id', {
	name: 'tester',
	template: 'tester',
	waitOn: function() {
		return [
			subs.subscribe('aPix', this.params._id)
		];
	},
	data: function() {
		return MyPix.findOne({_id: this.params._id});
	}
});
