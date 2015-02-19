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
	'keypress input.addTag': function (event) {
		if (event.which === 13) {
			event.preventDefault();
			// var newTag =  event.target.tags.value.toLowerCase().replace(/ /gi, "-");
			var newTag =  event.currentTarget.value.toLowerCase().replace(/ /gi, "-");
			if (!!newTag) { // if not empty
				MyPix.update (
					this._id,
					{
						$addToSet: {
							'metadata.tags': {
									$each: [ newTag ]
							}
						}
					}
				);
			}
			event.currentTarget.value = ""; // empty input field  
		}
	},
	'keypress input.editBackColor': function (event) {
		if (event.which === 13) {
			event.preventDefault();
			var updatedColor = event.currentTarget.value;

			var colorInHex =  Meteor.myFunctions.colourNameToHex(updatedColor);

			MyPix.update(this._id, {
				$set: {
					'metadata.backColor': colorInHex
				}
			});
		}
	},
	'click #goBack': function(event) {
		history.back();
	},
	'click .remove': function(event, template) {
		var thisTag = String(this);
		console.log("removing tag: " + thisTag);

		MyPix.update (
			template.data._id,
			{ $pull: { 'metadata.tags': thisTag }}
		);
	},
});


