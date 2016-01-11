// prevent users to be updated from any client console,
// active when true
noConsoleUpdates = true;

siteName = 'eboy.io';
displayQty = 24;
pathToThumbsFolder = '/eboydb_test/images/thumbs';
pathToOriginalsFolder = '/eboydb_test/images/originals';
thumbnailDimension = 216;
thumbnailBleed = 24;
defaultBackColor = '#272822';

Accounts.config({
	forbidClientAccountCreation: false,
	loginExpirationInDays: 7,
});

if (Meteor.isClient) {
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_EMAIL',
	});
}

aliasesForFullSearch = [
	'everything',
	'all',
	'.*',
];

linkLabels = [
	'twitter',
	'facebook',
	'web',
	'agency',
	'client',
	'link',
	'via',
	'instagram',
	'wikipedia',
	'project',
	'event',
	'photo',
	'shop',
	'credit',
];

tagaliases = {
	epaul: ['paul'],
	person: ['people', 'peoples', 'persons'],
	photo: ['photos', 'foto'],
	't-shirt': ['tshirt'],
	shoe: ['shoes'],
	sneaker: ['sneakers'],
};
