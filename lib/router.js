Router.map(function() {
	this.route('home', {
		path: '/'
	});
	this.route('doc', {
		path: '/doc/:_id',
		data: function() {
			return MyPix.findOne({_id: this.params._id});
		}
	});
});
	
