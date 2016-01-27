Link = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData() {
		let data = {};
		theId = 'o29J4FceReBJfD6B5';
		const handle = Meteor.subscribe('aDocsLinks', theId);
		if (handle.ready()) {
			data = DocLinks.findOne();
		}
		return data;
	},

	render() {
		return (
			<div className="container">
				name:&nbsp;{ this.data.name }
			</div>
		);
	},
});


Tags = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let docTags = {};
		const handle = Meteor.subscribe('PixTags');
		if (handle.ready()) {
			// theData = MyPix.findOne();
			docTags = MyPix.find().fetch();
		}
		return docTags;
	},

	renderTags() {
		return this.getMeteorData().map((tag) => {
			return <Tag key={tag._id} tag={tag} />;
		});
	},

	render() {
		return (
			<div className="container">
				<ul>
					{ this.renderTags() }
				</ul>
			</div>
		);
	},
});
