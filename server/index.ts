import * as express from 'express';
import * as path from 'path';
import { Github } from './lib/githubClient';
import * as fs from 'fs';
import * as cache from 'memory-cache'

require('dotenv').config();

const github = new Github({
  username: process.env.GITHUB_USER,
  password: process.env.GITHUB_PASS
});

const repoData: AppData = JSON.parse(
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
        let response = await github.getRepo(item.user, repo);
        data.push(response.data);
      }catch(e){
        console.log(e);
      }
    }
  }
  cache.put(CACHE_KEY, data, CACHE_TIMEOUT);
  return data;
}