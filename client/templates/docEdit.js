Template.docEdit.helpers({
	'devicePixelRatio': function () {
		return window.devicePixelRatio;
	},
	'deviceDimensions': function () {
		var widthOriginal = this.metadata.width;
		var heightOriginal = this.metadata.height;
		var deviceRatio = window.devicePixelRatio;
		var deviceWidth = widthOriginal / deviceRatio;
		var deviceHeight = heightOriginal / deviceRatio;
		return {
			ratio: deviceRatio,
			width: deviceWidth,
			height: deviceHeight
		}
	},
	'backColor': function() {
		if (this.metadata.backColor != 'default') {
			return this.metadata.backColor;
		} else {
			return defaultBackColor;
		}	
	}
});

Template.docEdit.events({
	'keypress input.addTag': function (event, template) {
		if (Meteor.user().profile.isEditor) {
			if (event.which === 13) {
				// event.preventDefault();
				var newTag = event.currentTarget.value.toLowerCase().replace(/ /gi, "-");
				var thisId = template.data._id;
	
				if (!!newTag) { // if not empty
					Meteor.call('addATag', thisId, newTag);
				}
				event.currentTarget.value = ""; // empty input field  
			}
		}
	},
	'keypress input.editBackColor': function (event) {
		if (Meteor.user().profile.isEditor) {
			if (event.which === 13) {
				// event.preventDefault();
				var updatedColor = event.currentTarget.value.toLowerCase();
				var colorInHex = Meteor.myFunctions.colourNameToHex(updatedColor);
				Meteor.call('updateBackColor', this._id, colorInHex);
			}
		}
	},
	'keypress input.editLicense': function (event) {
		if (Meteor.user().profile.isEditor) {
			if (event.which === 13) {
				// event.preventDefault();
				var license = event.currentTarget.value.toUpperCase();
				Meteor.call('updateLicense', this._id, license);
			}
		}
	},
	'click .remove': function(event, template) {
		if (Meteor.user().profile.isEditor) {
			var thisTag = String(this);
			var thisId = template.data._id;
			Meteor.call('removeTag', thisId, thisTag);
		}
	},
	'click #goBack': function(event) {
		history.back();
	},
});


