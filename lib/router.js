Router.route('/', function () {
  this.redirect('pool', {slug: "all", page: 1});
});

Router.route('/pool/1', function () {
  this.redirect('pool', {slug: "all", page: 1});
});

Router.route('/login', {
	name: 'login',
	template: 'login'
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

Router.route('/spriteBox/:_id/:boxsize', {
	name: 'spriteBox',
	template: 'spriteBox',

	after: function() {
		document.title = siteName + ' /spriteBox/' + this.params._id;
	},

	waitOn: function() {
		var query = this.params.query;
		return [
			Meteor.subscribe('aPix', this.params._id),
		];
	},
	data: function() {

		var maxSpriteBoxSize = screen.width; // set maximal size of box to actual screen width
		var spriteBoxSize = Math.min(maxSpriteBoxSize, this.params.boxsize);
		var spriteDocument = MyPix.findOne({_id: this.params._id});

		templateData = {
			sprite: spriteDocument,
			boxsize: spriteBoxSize,
		}
		return templateData;
	}
});

Router.route('/pool/:slug/:page', {
	name: 'pool',
	template: 'pool',

	after: function() {
		document.title = siteName + ' /pool/' + this.params.slug + '/' + this.params.page;
	},

	data: function() {
		// set search slugs that will show everything
		var allOptions = [
			"all",
			"everything",
			"show all",
		];

		// when the slug is part of the array show everything
		if (allOptions.indexOf(this.params.slug.toLowerCase()) > -1) {
			var searchTerm = ".*";
			// console.log('slug: all > ' + this.params.slug);
		} else {
			var searchTerm = this.params.slug;
		}

		Meteor.subscribe('PixQuery', searchTerm, this.params.page);

		templateData = {
			slug: this.params.slug,
		}
		return templateData;
	},
});
