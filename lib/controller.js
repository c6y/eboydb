BaseController = RouteController.extend({
	// specify stuff that every controller should have
});

SpriteBoxController = BaseController.extend({
	template: 'spriteBox',

	waitOn: function() {
		var slug = Session.get('poolSlug');
		var query = Session.get('poolQuery');
		return [
			Meteor.subscribe(
				'aPix',
				this.params._id,
				slug,
				query
			),
		];
	},

	data: function() {

		if (this.params.boxsize == 'auto') {
			var spriteBoxSize = (Math.min(window.innerHeight, window.innerWidth));
			var SpriteBoxWidth = window.innerWidth;
			var SpriteBoxHeight= window.innerHeight;

		} else {
			var maxSpriteBoxSize = Math.min(window.innerHeight, window.innerWidth);
			var spriteBoxSize = Math.min(maxSpriteBoxSize, this.params.boxsize);
			var SpriteBoxWidth = spriteBoxSize;
			var SpriteBoxHeight= spriteBoxSize;
		}

		var spriteDocument = MyPix.findOne(this.params._id);

		templateData = {
			sprite: spriteDocument,
			boxsize: spriteBoxSize,
			boxwidth: SpriteBoxWidth,
			boxheight: SpriteBoxHeight
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
		// check if slug is part of array that contain aliases that will get everything
		// the aliasesForFullSearch array is defined in environment.js
		if (aliasesForFullSearch.indexOf(this.params.slug.toLowerCase()) > -1) {
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