import axios, { AxiosInstance } from 'axios';
import { URL } from 'url';

interface GitlabBasicAuth {
  username: string;
  password: string;
}

type GitlabAuth = GitlabBasicAuth | string;

export class Gitlab {
  private client: AxiosInstance;

  public async getRepo(dataEntry: ResourceDataEntry): Promise<Resource> {
    // https://gitlab.com/mikesimps/mike-public-test
    // https://gitlab.com/api/v4/projects/mikesimps%2Fmike-public-test
    let u: URL = new URL(dataEntry.url);
    const encPath = '/'+encodeURIComponent(u.pathname.substring(1));
    console.log('https://' + u.hostname + '/api/v4/projects');
    this.client = axios.create({
      baseURL: 'https://' + u.hostname + '/api/v4/projects'
    });
    const response = await this.client.get<GitlabProj>(encPath);
    console.log(response);
    return this.mapGitlabToResource(response.data, dataEntry);
  }

  private mapGitlabToResource(gitlab: GitlabProj, dataEntry: ResourceDataEntry): Resource {
    let {
      name,
      description,
      organization,
      id,
      namespace: { name: username },
      path_with_namespace: fullName,
      web_url: url,
      web_url: htmlUrl,
      http_url_to_repo: gitUrl,
      language = null,
      license = null,
      isFork = false,
      forks_count: forkCount = null,
      star_count: favoriteCount = null,
      watcherCount = null,
      open_issues_count: openIssueCount = null,
      tag_list: topics,
      created_at: createdDate,
      forked_from_project: parent = null
    } = gitlab;

    name = dataEntry.name || name;
    language = dataEntry.language || language;
    license = dataEntry.license || license;
    organization = dataEntry.organization || organization;
    description = dataEntry.description || description;
    
    username = gitlab.namespace.name;
    isFork = forkCount > 0 ? true : false;

    return {
      type: 'repository',
      platform: 'gitlab',
      name,
      owner: { username },
      description,
      organization,
      id,
      fullName,
      url,
      htmlUrl,
      gitUrl,
      language,
      license,
      isFork,
      forkCount,
      favoriteCount,
      watcherCount,
      openIssueCount,
      topics,
      createdDate,
      parent
    }
  }

  // private getAuthValue(auth: GitlabAuth){
  //   if (typeof auth === 'string') {
  //     return `token ${auth}`;
  //   } else {
  //     let b64 = new Buffer(auth.username + ':' + auth.password).toString('base64');
  //     return `basic ${b64}`;
  //   }
  // }

}

