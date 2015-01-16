//Publish method

Meteor.publish('MyPix', function(cursor) {
	return MyPix.find({}, {limit:2, skip:cursor});
})

