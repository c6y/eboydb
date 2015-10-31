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
	controller: LoginController,
	action: function() {
		this.render('login');
	}
});

Router.route('/addDoc', {
	name: 'addDoc',
	controller: AddDocController,
	action: function() {
		this.render('addDoc');
	}
});

Router.route('/docEdit/:_id', {
	name: 'docEdit',
	controller: DocEditController,
	action: function() {
		this.render('docEdit');
	}
});

Router.route('/pool/:slug/:page', {
	name: 'pool',
	controller: PoolController,
	action: function() {
		this.render('pool');
	}
});

Router.route('/spriteBox/:_id/:boxsize', {
	name: 'spriteBox',
	controller: SpriteBoxController,
	action: function() {
		this.render('spriteBox');
	}
});