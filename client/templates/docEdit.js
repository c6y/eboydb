Template.docEdit.onCreated(function() {
	const self = this;
	self.autorun(function() {
		const thisId = FlowRouter.getParam('_id');
		self.subscribe('aPix', thisId);
		self.subscribe('userStatus');
	});
});

Template.docEdit.helpers({
	thisPix() {
		const thisId = FlowRouter.getParam('_id');
		const thisDocument = MyPix.findOne(thisId);
		return thisDocument;
	},
	devicePixelRatio() {
		return window.devicePixelRatio;
	},
	deviceDimensions() {
		const widthOriginal = this.metadata.width;
		const heightOriginal = this.metadata.height;
		const deviceRatio = window.devicePixelRatio;
		const deviceWidth = widthOriginal / deviceRatio;
		const deviceHeight = heightOriginal / deviceRatio;
		return {
			ratio: deviceRatio,
			width: deviceWidth,
			height: deviceHeight,
		};
	},
	backColor() {
		if (this.metadata.backColor !== 'default') {
			return this.metadata.backColor;
		}
		return defaultBackColor;
	},
	madeDateGMT() {
		const date = this.metadata.madeDate;
		if (date) {
			return {
				iso: date.toISOString(),
				short: date.toISOString().substring(0, 10),
				utc: date.toUTCString(),
			};
		}
		return '';
	},
	sizeFormatted() {
		const str = this.formattedSize();
		const strValue = str.substr(0, str.indexOf(' '));
		const strUnit = str.substr(str.indexOf(' ') + 1);
		return {
			value: strValue,
			unit: strUnit,
		};
	},
	showThisUserName() {
		const thisUserId = this.metadata.uploadedBy.id;
		const thisUserObj = Meteor.users.findOne(thisUserId);
		const thisUserName = thisUserObj.username;
		return thisUserName;
	},
});

Template.docEdit.events({
	'click .goSpriteBox': function() {
		const thisId = this._id;
		const params = {_id: thisId, boxsize: 'auto'};
		FlowRouter.go('spriteBox', params);
	},
	'keypress input.addTag': function(event) {
		if (Meteor.user().profile.isEditor) {
			if (event.which === 13) {
				const newTag = event.currentTarget.value;
				const cleanNewTag = newTag.toLowerCase().replace(/ /gi, '-');
				const thisId = this._id;

				if (!!newTag) { // if not empty
					Meteor.call('addATag', thisId, cleanNewTag);
				}
				event.currentTarget.value = ''; // empty input field
			}
		}
	},
	'keypress input.editBackColor': function(event) {
		if (Meteor.user().profile.isEditor) {
			if (event.which === 13) {
				const updatedColor = event.currentTarget.value.toLowerCase();
				const thisId = this._id;

				re = / /gi;
				const trimmedColor = updatedColor.replace(re, ''); // remove whitespace

				const colorInHex = Meteor.myFunctions.colourNameToHex(trimmedColor);
				Meteor.call('updateBackColor', thisId, colorInHex);
			}
		}
	},
	'keypress input.editMadeDate': function(event) {
		if (Meteor.user().profile.isEditor) {
			if (event.which === 13) {
				const thisId = this._id;
				let updatedMadeDate = new Date();

				if (event.currentTarget.value !== 'now') {
					updatedMadeDate = new Date(event.currentTarget.value);
				}
				Meteor.call('updateMadeDate', thisId, updatedMadeDate);
			}
		}
	},
	'click input.editFullframe': function() {
		if (Meteor.user().profile.isEditor) {
			const thisId = this._id;
			if (this.metadata.fullframe) {
				Meteor.call('updateFullframe', thisId, false);
			} else {
				Meteor.call('updateFullframe', thisId, true);
			}
		}
	},
	'keypress input.editLicense': function(event) {
		if (Meteor.user().profile.isEditor) {
			const thisId = this._id;
			if (event.which === 13) {
				const license = event.currentTarget.value.toUpperCase();
				Meteor.call('updateLicense', thisId, license);
			}
		}
	},
	'click .remove': function() {
		if (Meteor.user().profile.isEditor) {
			const thisId = FlowRouter.getParam('_id');
			const thisTag = String(this);
			Meteor.call('removeTag', thisId, thisTag);
		}
	},
});
