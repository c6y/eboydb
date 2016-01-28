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
			const qtyDocs = Object.keys(docTags).length;
			console.log('qtyDocs: ' + qtyDocs);
		}

		return {
			docTags,
		};
	},

	renderTags() {
		return this.data.docTags.map((tagArray) => {
			const tags = tagArray.metadata.tags;
			console.log('tags: ' + tags);
			return <span key={tagArray._id}>{tags} </span>
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
