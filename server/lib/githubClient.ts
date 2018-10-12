import axios, { AxiosInstance } from 'axios';
import { Repository, Owner, Organization } from '../../shared/resource';

interface GithubBasicAuth {
  username: string;
  password: string;
}

type GithubAuth = GithubBasicAuth | string;

export class Github {
  private client: AxiosInstance;
  constructor(auth?: GithubAuth) {

    let headers = {
      Accept: 'application/vnd.github.mercy-preview+json'
    };
    if(auth){
      headers['Authorization'] = this.getAuthValue(auth);
    }

    this.client = axios.create({
      baseURL: 'https://api.github.com/',
      headers
    });
  }

  public async getRepo(user, name): Promise<Repository> {
    const response = await this.client.get<GithubRepository>(`/repos/${user}/${name}`);
    let data = response.data;
    let r = new Repository();
    r.name = data.name;
    r.fullName = data.full_name;
    r.owner = new Owner(data.owner.login, data.owner.html_url, data.owner.avatar_url);
    r.description = data.description;
    r.url = data.url;
    r.htmlUrl = data.html_url;
    r.license = data.license ? data.license.name : null;
    r.platform = 'github';
    r.organization = data.organization ? new Organization(data.organization.login, data.organization.html_url) : null;
    r.favoriteCount = data.stargazers_count;
    r.watcherCount = data.watchers_count;
    r.forkCount = data.forks_count;
    r.createdDate = data.created_at;
    r.language = data.language;
    r.openIssueCount = data.open_issues_count;
    r.topics = data.topics;
    r.topics.push('github');
    r.parent = data.parent ? await this.getRepo(data.parent.owner.login, data.parent.name) : null;
    r.fork = data.fork;
    return r;
  }

  private getAuthValue(auth: GithubAuth){
    if (typeof auth === 'string') {
      return `token ${auth}`;
    } else {
      let b64 = new Buffer(auth.username + ':' + auth.password).toString('base64');
      return `basic ${b64}`;
    }
  }

}

