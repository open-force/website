# open-force prototype

Proof of concept

## Setup

Project has 2 package.json files, so you will need to run `npm install` twice.

1. `git clone`
2. `cd`
3. `npm install`
4. `cd react-app`
5. `npm install`

## Deploy to heroku

1. `heroku create`
1. `git push heroku master`

Note: Uses the `heroku-postbuild` script to build the react app upon deployment.

## Development

1. open terminal
1. `npm run dev-server`
1. open new tab
1. `npm run dev-client`

- Uses `nodemon` to automaticly update the server on changes.
- Uses `webpack-dev-server` to hot reload client changes.