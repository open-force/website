# open-force prototype

Proof of concept

## Adding new Repositories
- Submit a PR updating [/data/repositories.json](https://github.com/open-force/website/blob/master/data/repositories.json) with the repo's you'd like to add 
- site will be updated when PR is merged into master

## Setup


### install

Project has 2 package.json files, so you will need to run `npm install` twice.

1. `git clone`
2. `cd`
3. `npm install`
4. `cd react-app`
5. `npm install`

### .env

Project is configured with [dotenv](https://www.npmjs.com/package/dotenv) to load enviormental vars

1. Create a `.env` file in root of project
2. add values for the following:

```
GITHUB_USER=
GITHUB_PASS=
```

## Deploy to heroku

1. `heroku create`
1. `git push heroku master`
1. use the `heroku` cli or user interface to setup "config vars" for same `.env` properties above

Note: Uses the `heroku-postbuild` script to build the react app upon deployment.  This results in a slightly slower deploy time.


## Development

1. open terminal
1. `npm run dev-server`
1. open new tab
1. `npm run dev-client`

- Uses `nodemon` to automaticly update the server on changes.
- Uses `webpack-dev-server` to hot reload client changes.
