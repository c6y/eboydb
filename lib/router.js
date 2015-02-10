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

Router.route('/spriteBox/:_id/:boxsize', {
	name: 'spriteBox',
	template: 'spriteBox',
	waitOn: function() {
		return [
			subs.subscribe('aPix', this.params._id)
		];
	},
	data: function() {

		var maxSpriteBoxSize = screen.width; // set maximal size of box to actual screen width
		var spriteBoxSize = Math.min(maxSpriteBoxSize, this.params.boxsize);
		var spriteDocument = MyPix.findOne({_id: this.params._id});

		templateData = {
			sprite: spriteDocument,
			boxsize: spriteBoxSize
		}
		return templateData;
	}
});

Router.route('/browsethumbs/:page', {
	name: 'browsethumbs',
	template: 'browsethumbs',
	data: function() {
		Meteor.subscribe('PixPage', this.params.page);
	}
});
