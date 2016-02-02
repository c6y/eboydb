Template.docEdit.onCreated(function() {
	const self = this;
	self.autorun(function() {
		const thisId = FlowRouter.getParam('_id');
		self.subscribe('aPix', thisId);
		self.subscribe('userStatus');
		self.subscribe('aDocsLinks', thisId);
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
	showLinks() {
		const thisId = this._id;
		const selector = { myPixId: thisId };
		const thisLinkObj = DocLinks.find(selector);
		return thisLinkObj;
	},
	hasLinks() {
		const thisId = this._id;
		const selector = { myPixId: thisId };
		const thisLinkObj = DocLinks.findOne(selector);
		if (thisLinkObj) {
			return true;
		}
	},
	displayLinkFields() {
		if (!this.showLinkFields) {
			this.showLinkFields = new ReactiveVar();
			this.showLinkFields.set(false);
		}
		const visible	= this.showLinkFields.get();
		if (visible) {
			return 'true';
		}
		return 'none';
	},
	displayMoreMeta() {
		if (!this.toggleMoreMeta) {
			this.toggleMoreMeta = new ReactiveVar();
			this.toggleMoreMeta.set(false);
		}
		const visible	= this.toggleMoreMeta.get();
		if (visible) {
			return true;
		}
		return false;
	},
});

Template.docEdit.events({
	'click .goSpriteBox'() {
		const thisId = this._id;
		const params = {_id: thisId, boxsize: 'auto'};
		FlowRouter.go('spriteBox', params);
	},
	'keypress input.addTag'(event) {
		if (Meteor.user().profile.isEditor) {
			if (event.which === 13) {
				const newTag = event.currentTarget.value;
				const cleanNewTag = newTag.toLowerCase().replace(/ /gi, '-');
				const checkedTag = Meteor.myFunctions.checkTagAliases(cleanNewTag);
				const thisId = this._id;

				if (!!newTag) { // if not empty
					Meteor.call('addATag', thisId, checkedTag);
				}
				event.currentTarget.value = ''; // empty input field
			}
		}
	},
	'click .removeTag'() {
		if (Meteor.user().profile.isEditor) {
			const thisId = FlowRouter.getParam('_id');
			const thisTag = String(this);
			Meteor.call('removeTag', thisId, thisTag);
		}
	},
	'keypress input.addRelation'(event) {
		if (Meteor.user().profile.isEditor) {
			if (event.which === 13) {
				const newRelation = event.currentTarget.value;
				const checkedRel = Meteor.myFunctions.checkRelationAliases(newRelation);
				const thisId = this._id;

				if (!!newRelation) { // if not empty
					Meteor.call('addRelation', thisId, checkedRel);
				}
				event.currentTarget.value = ''; // empty input field
			}
		}
	},
	'click .removeRelation'() {
		if (Meteor.user().profile.isEditor) {
			const thisId = FlowRouter.getParam('_id');
			const thisRelation = String(this);
			Meteor.call('removeRelation', thisId, thisRelation);
		}
	},
	'keypress input.editBackColor'(event) {
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
	'keypress input.editMadeDate'(event) {
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
	'click .fullframeToggle'() {
		toggleFullframe(this);
	},
	'keypress .fullframeToggle'() {
		if (event.keyCode === 13) {
			toggleFullframe(this);
		}
	},
	'keypress input.editLicense'(event) {
		if (Meteor.user().profile.isEditor) {
			const thisId = this._id;
			if (event.which === 13) {
				const license = event.currentTarget.value.toUpperCase();
				Meteor.call('updateLicense', thisId, license);
			}
		}
	},
	'click #submitLink'() {
		submitTheLink(this);
	},
	'keypress #submitLink'() {
		if (event.which === 13) {
			submitTheLink(this);
		}
	},
	'click .removelink'() {
		if (Meteor.user().profile.isEditor) {
			const thisId =  this._id;
			Meteor.call('deleteLink', thisId);
		}
	},
	// show additional link fields if link name is entered
	'change #editLinkName'() {
		const linkInput = document.getElementById('editLinkName').value;
		if (linkInput) {
			this.showLinkFields.set(true);
		} else {
			this.showLinkFields.set(false);
		}
	},
	'click .moreMetaToggle'() {
		let visible = this.toggleMoreMeta.get();
		if (visible) {
			this.toggleMoreMeta.set(false);
		} else {
			this.toggleMoreMeta.set(true);
		}
	},
});

// these functions are used twice
// for click and for keypress events

function toggleFullframe(t) {
	const thisId = t._id;
	if (t.metadata.fullframe) {
		Meteor.call('updateFullframe', thisId, false);
	} else {
		Meteor.call('updateFullframe', thisId, true);
	}
}

function submitTheLink(t) {
	const linkLabel = document.getElementById('editLinkLabel').value;
	const linkName = document.getElementById('editLinkName').value;
	const linkURL = document.getElementById('editLinkURL').value;
	const httpStart = linkURL.match('^http');

	if (linkName.length > 0) {
		// URL cannot be empty and has to start with 'http'
		if (linkURL && httpStart ) {
			if (linkLabels.includes(linkLabel)) {
				const thisId = t._id;
				Meteor.call('addLink', thisId, linkLabel, linkName, linkURL);
				document.getElementById('editLinkName').value = '';
				document.getElementById('editLinkLabel').value = '';
				t.showLinkFields.set(false);
			} else {
				const allowedLabels = linkLabels.join(', ');
				window.alert(
					'\"' + linkLabel +
					'\" label not allowed, please use these: ' +
					allowedLabels
				);
			}
		} else {
			window.alert('Error: URL does not start with \"http\" or is empty');
		}
	} else {
		window.alert('Error: Name field empty');
	}
}
