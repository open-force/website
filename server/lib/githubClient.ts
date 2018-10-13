import axios, { AxiosInstance } from 'axios';
import { URL } from 'url';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

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

  public async getRepo(dataEntry: ResourceDataEntry): Promise<Resource> {
    // https://github.com/open-force/website
    // https://api.github.com/repos/open-force/website
    let u: URL = new URL(dataEntry.url);
    const response = await this.client.get<GithubRepo>(`/repos${u.pathname}`);
    return this.mapGithubToResource(response.data, dataEntry);
  }

  public async getGist(dataEntry: ResourceDataEntry): Promise<Resource> {
    // https://gist.github.com/mikesimps/fd2de065248c878f1790a663fbf16e2e
    // https://api.github.com/gists/fd2de065248c878f1790a663fbf16e2e
    let u: URL = new URL(dataEntry.url);
    const response = await this.client.get<GistRepo>(`/gists/${u.pathname.split('/')[2]}`);
    return this.mapGistToResource(response.data, dataEntry);
  }

  private mapGithubToResource(github: GithubRepo, dataEntry: ResourceDataEntry ): Resource {
    let { 
      name,
      owner: { login: username , html_url: website, avatar_url: avatarUrl },
      description,
      organization = null,
      id,
      full_name: fullName,
      homepage: url,
      html_url: htmlUrl,
      git_url: gitUrl,
      language: language = null,
      license: license = null,
      fork: isFork,
      forks_count: forkCount = 0,
      stargazers_count: favoriteCount = 0,
      watchers_count: watcherCount = 0,
      open_issues_count: openIssueCount = 0,
      topics: topics,
      created_at: createdDate,
      parent: parent = null
    } = github;


    name = dataEntry.name || name;
    language = dataEntry.language || language;
    license = dataEntry.license || license;
    organization = dataEntry.organization || organization;
    description = dataEntry.description || description;
    topics ? topics.push('github') : topics = ['github'] ;


    return {
      type: 'repository',
      platform: 'github',
      name,
      owner: { username, website, avatarUrl},
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

  private mapGistToResource(gist: GistRepo, dataEntry: ResourceDataEntry ): Resource {
    let { 
      name,
      organization,
      url,
      language,
      license,
      topics,
      id: id,
      owner: { login: username , html_url: website, avatar_url: avatarUrl },
      description: description,
      html_url: htmlUrl,
      git_pull_url: gitUrl,
      created_at: createdDate
    } = gist;

    url = url || htmlUrl; 
    name = dataEntry.name ? dataEntry.name : name;
    topics ? topics.push('github') : topics = ['github'] ;
    
    return {
      type: 'gist',
      platform: 'github',
      name,
      organization,
      url,
      language,
      license,
      topics,
      id,
      owner: { username, website, avatarUrl},
      description,
      htmlUrl,
      gitUrl,
      createdDate
    }
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

