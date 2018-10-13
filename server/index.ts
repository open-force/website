import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as cache from 'memory-cache';
import { Github } from './lib/githubClient';
import { Bitbucket } from './lib/bitbucketClient';
import { Gitlab } from './lib/gitlabClient';

require('dotenv').config();

const github = new Github({
  username: process.env.GITHUB_USER,
  password: process.env.GITHUB_PASS
});

const bitbucket = new Bitbucket({
  username: process.env.BITBUCKET_USER,
  password: process.env.BITBUCKET_PASS
});

const gitlab = new Gitlab();

const resourceData: ResourceDataEntry[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../data/repositories.json')).toString()
);

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-app/dist')));

app.get('/api/repos', async function (request, response) {
  response.send(await getResourceData());
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../react-app/dist', 'index.html'));
});

app.listen(PORT, function () {
  console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});

const CACHE_KEY = 'repos'
const CACHE_TIMEOUT = 60*5*1000;
async function getResourceData(){

  //check cache
  if(cache.get(CACHE_KEY)){
    return cache.get(CACHE_KEY);
  }
  console.log('no cache found!')

  //pull data
  let data: Resource[] = [];
  for (let item of resourceData) {
    try{
      let resource;
      if (item.type === 'repository') {
        switch (item.platform) {
          case 'bitbucket': {
            resource = await bitbucket.getRepo(item);
            break;
          }
          case 'gitlab': {
            resource = await gitlab.getRepo(item);
            console.log(resource);
            break;
          }
          default: {
            resource = await github.getRepo(item);
          }
        }
      } else if (item.type === 'gist') {
        resource = await github.getGist(item);
      } else if (item.type === 'website') {
        resource = mapWebsiteToResource(item);
      }
      if (resource !== undefined) { data.push(resource); }
    } catch(e){
      console.log(e);
    }
  }

  cache.put(CACHE_KEY, data, CACHE_TIMEOUT);
  return data;
}

function mapWebsiteToResource(website: WebsiteDataEntry): Resource {
  let {
    type,
    name,
    url,
    owner = {},
    description,
    organization = {},
    topics,
    favoriteCount = 0,
    watcherCount = 0
  } = website;
  
   topics ? topics.push(type) : topics = [type];

  return {
    type,
    name,
    url,
    owner,
    description,
    organization,
    topics,
    favoriteCount,
    watcherCount
  }
}