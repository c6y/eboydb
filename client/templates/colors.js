Template.colors.helpers({
	'colorListArray': function () {
		var result = [];
		for (var key in colorNames) result.push({
			name:key,
			value:colorNames[key]
		});
		return result;
	},
});