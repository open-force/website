import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as cache from 'memory-cache';
import { Github } from './lib/githubClient';
import { Bitbucket } from './lib/bitbucketClient';
import { Gitlab } from './lib/gitlabClient';
import { Repository } from '../shared/resource';

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

const repoData: RepositoryDataEntry[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../data/repositories.json')).toString()
);

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-app/dist')));

app.get('/api/repos', async function (request, response) {
  response.send(await getRepoData());
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
async function getRepoData(){

  //check cache
  if(cache.get(CACHE_KEY)){
    return cache.get(CACHE_KEY);
  }
  console.log('no cache found!')

  //pull data
  let data: Repository[] = [];
  for (let item of repoData) {
    for (let repo of item.repositories) {
      try{
        let repository: Repository;
        switch (item.source) {
          case 'bitbucket': {
            repository = await bitbucket.getRepo(item.user, repo);
            break;
          }
          case 'gitlab': {
            repository = await gitlab.getRepo(Number(repo), item.url);
            break;
          }
          default: {
            repository = await github.getRepo(item.user, repo);
          }
        }
        data.push(repository);
      }catch(e){
        console.log(e);
      }
    }
  }

  cache.put(CACHE_KEY, data, CACHE_TIMEOUT);
  return data;
}