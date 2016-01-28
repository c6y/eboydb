Tags = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let docTags = [];
		const handle = Meteor.subscribe('PixTags');

		if (handle.ready()) {
			docTags = MyPix.find().fetch();
			// check and log if Array
			if (docTags.constructor === Array) {
				console.log('docTags is an Array');
			}
			// log length of Array
			const qtyDocs = docTags.length;
			console.log('qtyDocs: ' + qtyDocs);
		}

		return {
			docTags,
		};
	},

	renderTags() {
		return this.data.docTags.map((tagArray) => {
			const tags = tagArray.metadata.tags;

			const qtyTags = tags.length;
			console.log('qtyTags: ' + qtyTags);

			if (tags.constructor === Array) {
				console.log('tags is an Array');
			}
			console.log('tags: ' + tags);
			return tags.toString() + ',';
		});
	},

	render() {
		return (
			<div className="container">
				{ this.renderTags() }
			</div>
		);
	},
});
