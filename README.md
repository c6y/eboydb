# eboydb
A simple image database and client, optimized to store and render small original pixel images (sprites). Client gets original sized images (1:1 pixel ratio) and scales and displays them sharp at any size (no antialiasing). Built with Meteor.js.

## Setup

- you need to know how to handle and start Meteor.js apps
- lib/loadfirst/environment.js: set `noNewUsers` to `false` (and allow new accounts to be created)
- start the app
- go to `/login` to create an account
- copy your user _id
- set `isAdmin` and `isEditor` to `true` in the client console:

`Meteor.users.update(Meteor.userId(your_id), {$set: {'profile.isAdmin': true}});`
`Meteor.users.update(Meteor.userId(your_id), {$set: {'profile.isEditor': true}});`

If you have questions or need sample pictues let me know at k@eboy.com
