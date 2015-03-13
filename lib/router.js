Router.configure({
	layoutTemplate: 'mainLayout',
	notFoundTemplate: 'notFound'
});

Router.route('/', function () {
  this.redirect('pool', {slug: "all", page: 1});
});

Router.route('/pool/', function () {
  this.redirect('pool', {slug: "all", page: 1});
});

Router.route('/pool/all/', function () {
  this.redirect('pool', {slug: "all", page: 1});
});

Router.route('/login', {
	name: 'login',
	template: 'login',
	data: function() {
		Meteor.subscribe('userStatus');
	}
});

Router.route('/docEdit/:_id', {
	name: 'docEdit',
	template: 'docEdit',

	after: function() {
		document.title = siteName + ' /docEdit/' + this.params._id;
	},

	waitOn: function() {
		return [
			Meteor.subscribe('aPix', this.params._id)
		];
	},
	data: function() {
		return MyPix.findOne({_id: this.params._id});
	}
});

Router.route('/addDoc', {
	name: 'addDoc',
	template: 'addDoc',
	after: function() {
		document.title = siteName + ' /addDoc';
	}
});

// Router.route('/:_id/:boxsize', {
Router.route('/spriteBox/:_id/:boxsize', {
	name: 'spriteBox',
	controller: SpriteBoxController,
	action: function() {
    this.render('spriteBox');
  }
});

// Router.route('/:slug/:page', {
Router.route('/pool/:slug/:page', {
	name: 'pool',
	controller: PoolController,
	action: function() {
		this.render('pool');
	}
});
