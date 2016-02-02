Template.relations.onCreated(function() {
	this.distinctRelations = new ReactiveVar();
	Meteor.call('getDistinctRelations', (error, result) => {
		if (error) {
			// do something
		} else {
			this.distinctRelations.set(result); // save result when we get it
		}
	});
});

Template.relations.helpers({
	relations: function() {
		const theRelations = Template.instance().distinctRelations.get().sort();
		// turn theRelations array to relations — and path-to-relations
		return _.map(theRelations, aRelation => {
			const params = {slug: aRelation, page: '1'};
			const queryParams = {q: 'relation'};
			const pathToRelation = FlowRouter.path('pool', params, queryParams);
			return {
				aRelation,
				pathToRelation,
			};
		});
	},
	relationsQuantity() {
		const relationsArray = Template.instance().distinctRelations.get();
		return relationsArray.length;
	},
});
