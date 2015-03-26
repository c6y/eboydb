BaseController = RouteController.extend({
	// specify stuff that every controller should have
});

SpriteBoxController = BaseController.extend({
	template: 'spriteBox',
	waitOn: function() {
		// var query = this.params.query;
		return [
			Meteor.subscribe('aPix', this.params._id),
		];
	},
	data: function() {
		var maxSpriteBoxSize = screen.width; // set maximal size of box to actual screen width
		var spriteBoxSize = Math.min(maxSpriteBoxSize, this.params.boxsize);
		var spriteDocument = MyPix.findOne(this.params._id);

		templateData = {
			sprite: spriteDocument,
			boxsize: spriteBoxSize,
		}
		return templateData;
	},
	onBeforeAction:function(){
		if(this.data()){
			this.next();
		}
	},
	after: function() {
		document.title = siteName + ' /spriteBox/' + this.params._id;
	}
});


PoolController = BaseController.extend({
	template: 'pool',

	after: function() {
		document.title = siteName + ' /pool/' + this.params.slug + '/' + this.params.page;
	},

	data: function() {
		// set search slugs that will show everything
		var allOptions = [
			"all",
			"everything",
			"showall",
			".*"
		];

		// when the slug is part of the array show everything
		if (allOptions.indexOf(this.params.slug.toLowerCase()) > -1) {
			var searchTerm = ".*";
		} else {
			var searchTerm = this.params.slug;
		}

		var page = this.params.page;
		var query = this.params.query;
		Meteor.subscribe('PixQuery', searchTerm, page, query);

		var filter = query.q;
		if (filter == 'tag') {
			var filterAbrev = 't:'
		} else if (filter == 'name') {
			var filterAbrev = 'n:'
		} else {
			var filterAbrev = ''
		}
		var currentFilter = filterAbrev + this.params.slug;

		templateData = {
			filter: currentFilter // used to display current seach value in search field
		}
		return templateData;
	},
})