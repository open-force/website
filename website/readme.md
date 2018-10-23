# open-force prototype

Proof of concept

## Adding new Repositories

## Setup

### install

Project has 2 package.json files, so you will need to run `npm install` twice.

1. `git clone --recursive [URL]`: includes the website as a submodule
2. `cd`
3. `npm install`
4. `npm run new-org`: Creates a scratch org and deploys code in `./website-org` submodule. If you already have an org you want to use, cd into `website-org` and run `sfdx force:config:set defaultusername={ORG}`.
5. `cd react-app`
6. `npm install`

### .env

Project is configured with [dotenv](https://www.npmjs.com/package/dotenv) to load environmental vars

1. Create a `.env` file in root of project
2. add values for the following:

```
GITHUB_USER=
GITHUB_PASS=
```

## Development

1. open terminal
1. `npm run dev-server`
1. open new tab
1. `npm run dev-client`

- Uses `nodemon` to automatically update the server on changes.
- Uses `webpack-dev-server` to hot reload client changes.
- When `NODE_ENV`is not production, the server will connect using default user found in `../org/.sfdx/sfdx-config.json`

## Deploy to heroku

1. `heroku create`
2. `git push heroku master`
3. use the `heroku` cli or user interface to setup "config vars" for same `.env` properties above

Note: Uses the `heroku-postbuild` script to build the react app upon deployment.  This results in a slightly slower deploy time.
