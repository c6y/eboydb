> _This project is outdated and has been closed. Instead you can check [rainbow](https://github.com/c6y/rainbow) (a rewrite that stores image urls, instead of the actual images — and is much faster)._

# eboydb
A simple image database and client, optimized to store and render small original pixel images (sprites). Client gets original sized images (1:1 pixel ratio) and scales and displays them sharp at any size (no antialiasing). Built with Meteor.js.

## Example
http://eboy.io/

## Setup
Apologies, this is messy at the moment
- you need to know how to handle and start Meteor.js apps
- lib/loadfirst/environment.js: set `noNewUsers` to `false` (and allow new accounts to be created)
- start the app
- go to `/login` to create an account
- set `profile.isAdmin` and `profile.isEditor` to `true` in the console

If you have questions or need sample pictures let me know at k@eboy.com
