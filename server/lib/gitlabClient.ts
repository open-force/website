import axios, { AxiosInstance } from 'axios';
import { Repository, Owner, Organization } from '../../shared/resource';

interface GitlabBasicAuth {
  username: string;
  password: string;
}

type GitlabAuth = GitlabBasicAuth | string;

export class Gitlab {
  private client: AxiosInstance;

  public async getRepo(id: number, baseUrl: string): Promise<Repository> {

    this.client = axios.create({
      baseURL: baseUrl + '/api/v4/' || 'https://gitlab.com/api/v4/'
    });

    const response = await this.client.get<GitlabProject>(`/projects/${id}?statistics=true`);
    let data = response.data;
    console.log(data);
    let r = new Repository();
    r.name = data.name;
    r.fullName = data.path_with_namespace;
    r.owner = new Owner(data.namespace.path,  baseUrl + data.namespace.path, null); //need another call to get avatar
    r.description = data.description;
    r.url = data.http_url_to_repo;
    r.htmlUrl = data.web_url;
    // r.license = data.license ? data.license.name : null;
    r.platform = 'gitlab';
    r.organization = data.namespace ? new Organization(data.namespace.name, null) : null; // need another call to get htmlUrl
    r.favoriteCount = data.star_count;
    // r.watcherCount = need another api call to get this info
    r.forkCount = data.forks_count
    r.createdDate = data.created_at;
    // r.language = need another api call to get this
    r.openIssueCount = data.open_issues_count;
    r.topics = data.tag_list;
    r.topics.push('gitlab');
    r.parent = data.forked_from_project ? await this.getRepo(data.forked_from_project.id, data.forked_from_project._links.self) : null;
    r.fork = data.forked_from_project ? true : false;
    return r;
  }

  private getAuthValue(auth: GitlabAuth){
    if (typeof auth === 'string') {
      return `token ${auth}`;
    } else {
      let b64 = new Buffer(auth.username + ':' + auth.password).toString('base64');
      return `basic ${b64}`;
    }
  }

}

