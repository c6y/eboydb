BaseController = RouteController.extend({
	// specify stuff that every controller should have
});


LoginController = BaseController.extend({
	template: 'login',
	// no idea why onBeforeAction is not working here
	data: function() {
		Meteor.subscribe('userStatus');
		$('body').removeClass();
	},
});


AddDocController = BaseController.extend({
	template: 'addDoc',
	// no idea why onBeforeAction is not working here
	after: function() {
		document.title = siteName + ' /addDoc';
	},
});


DocEditController = BaseController.extend({
	template: 'docEdit',
	onBeforeAction: function(){
		if(this.data()){
			$('body').removeClass(); // remove existing classes from body tag
			$('body').addClass('bodyDocEdit'); // ad class to body tag
			this.next();
		}
	},
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


PoolController = BaseController.extend({
	template: 'pool',

	onBeforeAction: function() {
		if(this.data()){
			$('body').removeClass(); // remove existing classes from body tag
			$('body').addClass('bodyPool'); // ad class to body tag
			this.next();
		}
	},

	onRun: function() {
		// Only required on client
		if ( Meteor.isClient ) {
			// Wait for template to render
			_.defer(function() {
				// Animate the scroll
				$('body,html').animate({
					scrollTop: 0,
				}, 100);
			});
		}
		this.next();
	},

	onStop: function() {
		$('body').removeClass('bodyPool');
	},

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

	onBeforeAction: function(){
		if(this.data()){
			$('body').removeClass(); // remove existing classes from body tag
			$('body').addClass('bodySpriteBox'); // ad class to body tag
			this.next();
		}
	},

	// // removing class after leaving SpriteBox page
	// // is being moved in the PoolController
	// onStop: function() {
	// 	$('body').removeClass('bodySpriteBox');
	// },

	after: function() {
		document.title = siteName + ' /spriteBox/' + this.params._id;
	}
});

ColorsController = BaseController.extend({
	template: 'login'
});