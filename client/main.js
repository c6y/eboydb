Template.pixUpload.events({
	'change .myPixInput': function(event, template) {
		event.preventDefault();
		var file = event.target.files[0]; //assuming 1 file only
		if (!file) return;
		
		var reader = new FileReader();

		reader.onload = function(event){
			MyPix.insert({
				binary: reader.result,
				createdAt: new Date
			});
		}
		reader.readAsDataURL(file);
	}
})

Template.pixCount.helpers({
	'posts': function() {
		return Counts.get('numberOfPosts')
	},
	'currentPage': function() {
		var page = Math.floor(Session.get('docCursor') / 4) + 1;
		return page;
	} 
})

Template.pixList.helpers({
	'showPix': function(){
		return MyPix.find({}, {sort: {createdAt: -1}});
	},
	'thedate': function() {
		var date = this.createdAt;
		var formattedDate = moment(date).format('hh:mm:ss/dddd/DD/MMMM/YYYY');
		return "date: " + formattedDate;
	}
})

Template.pixList.events({
	'click .remove': function(event, template) {
		console.log("Removing \"" + this._id + "\"");
		MyPix.remove(this._id);
	},

	'click .previous': function(event, template) {
		if(Number(Session.get('docCursor') > 3)) {
			Session.set('docCursor', Number(Session.get('docCursor')) - 4);
			console.log("Cursor: " + Session.get('docCursor'));
		}		
	},

	'click .next': function(event, template) {
		if(Number(Session.get('docCursor')) + 4 < Counts.get('numberOfPosts')) {
			Session.set('docCursor', Number(Session.get('docCursor')) + 4);
			console.log("Cursor: " + Session.get('docCursor'));
		};
	}
})