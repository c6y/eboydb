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
		return MyPix.find().count();
	}
})

Template.pixList.helpers({
	'showPix': function(){
		return MyPix.find({}, {sort: {createdAt: -1}});
	},
	'thedate': function(){
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
	'click .nextPage': function(event, template) {
		console.log('next');

		if(Number(Session.get('docCursor') < 100)) {
			Session.set('docCursor', Number(Session.get('docCursor')) + 2);
			console.log(Session.get('docCursor'));
		}


		
	}
})