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
