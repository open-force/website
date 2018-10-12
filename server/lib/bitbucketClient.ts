import axios, { AxiosInstance } from 'axios';
import { BitbucketRepository } from '../../shared/bitbucket';
import { Repository, Owner } from '../../shared/resource';


interface BitbucketBasicAuth {
  username: string;
  password: string;
}

type BitbucketAuth = BitbucketBasicAuth | string;

export class Bitbucket {
  private client: AxiosInstance;
  constructor(auth?: BitbucketAuth) {

    let headers = {};
    if(auth){
      headers['Authorization'] = this.getAuthValue(auth);
    }

    this.client = axios.create({
      baseURL: 'https://api.bitbucket.org/2.0/',
      headers
    });
  }

  public async getRepo(user: string, name: string, repo: RepositoryDataEntry): Promise<Repository> {
    const response = await this.client.get<BitbucketRepository>(`/repositories/${user}/${name}`);
    let data = response.data;
    let r = new Repository();
    r.name = data.name;
    r.fullName = data.full_name;
    r.owner = new Owner(data.owner.username, data.owner.links.html.href, data.owner.links.avatar.href);
    r.description = data.description;
    r.url = data.links.self.href;
    r.htmlUrl = data.links.html.href;
    r.license = repo.license || null; // bitbucket does not allow you to specify a license
    r.platform = 'bitbucket';
    // r.organization = bitbucket doesn't have the same organziation concept that github has
    // r.favoriteCount = no concept of stars or bookmarks, just watchers
    // r.watcherCount = need a separate api call for this
    // r.forkCount = need a separate api call for this
    r.createdDate = data.created_on;
    r.language = data.language;
    // r.openIssueCount = need a separate api call for this
    r.topics = ['bitbucket']; // need a separate api call for this
    // r.parent = no concept of a parent
    // r.fork = need a separate api call for this
    return r;
  }

  private getAuthValue(auth: BitbucketAuth){
    if (typeof auth === 'string') {
      return `token ${auth}`;
    } else {
      let b64 = new Buffer(auth.username + ':' + auth.password).toString('base64');
      return `basic ${b64}`;
    }
  }

}

