import { Resource } from '../generated/sobs';
import * as cache from 'memory-cache'
import { generateSelect } from 'ts-force';
import { Github } from '../lib/githubClient';

const CACHE_KEY = 'repos'
const CACHE_TIMEOUT = 60 * 5 * 1000;

export class ResourceService{
  private github: Github;
  constructor(){
    this.github = new Github({
      username: process.env.GITHUB_USER,
      password: process.env.GITHUB_PASS
    });
  }

  public async getRepoData() {

    //check cache
    if (cache.get(CACHE_KEY)) {
      console.log('returning cache');
      return cache.get(CACHE_KEY);
    }

    console.log('no cache found. Retrieving');

    let resources = await Resource.retrieve(
      `SELECT ${generateSelect(Object.values(Resource.FIELDS))} FROM ${Resource.API_NAME}`
    );

    const repoData: {user: string, url: string}[] = resources.map(r => {
      if (r.type.toLowerCase() === 'repository') {
        let parts = r.canonicalURL.split('/');
        return {
          user: parts[3],
          url: parts[4]
        }
      }
      return null;
    });

    //pull data
    let data: Repository[] = [];
    for (let item of repoData) {
        if(!item){
          return;
        }
        try {
          let response = await this.github.getRepo(item.user, item.url);
          data.push(response.data);
        } catch (e) {
          console.log(e);
        }
    }
    cache.put(CACHE_KEY, data, CACHE_TIMEOUT);
    return data;
  }
}
