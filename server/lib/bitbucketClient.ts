import axios, { AxiosInstance } from 'axios';
import { URL } from 'url';

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

  public async getRepo(dataEntry: ResourceDataEntry): Promise<Resource> {
    // https://bitbucket.org/mikesimps/mike-public-test
    // https://api.bitbucket.org/2.0/repositories/mikesimps/mike-public-test
    let u: URL = new URL(dataEntry.url);
    const response = await this.client.get<BitbucketRepo>(`/repositories${u.pathname}`);
    return this.mapBitbucketToResource(response.data, dataEntry);
  }

  private mapBitbucketToResource(bitbucket: BitbucketRepo, dataEntry: ResourceDataEntry): Resource {
    let {
      name,
      owner: { username: username ,
                links: {
                  html: { href: website },
                  avatar: { href: avatarUrl }
                } 
      },
      description,
      organization = null,
      id,
      full_name: fullName,
      links: {
        html: { href: htmlUrl , href: url }
      },
      gitUrl = null,
      language = null,
      license = null,
      isFork = false,
      forkCount = null,
      favoriteCount = null,
      watcherCount = null,
      openIssueCount = null,
      topics = null,
      created_on: createdDate,
      parent = null
    } = bitbucket;

    name = dataEntry.name || name;
    language = dataEntry.language || language;
    license = dataEntry.license || license;
    organization = dataEntry.organization || organization;
    description = dataEntry.description || description;

    topics ? topics.push('bitbucket') : topics = ['bitbucket'] ;
    gitUrl = bitbucket.links.self + '.git';

    return {
      type: 'repository',
      platform: 'bitbucket',
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

  private getAuthValue(auth: BitbucketAuth){
    if (typeof auth === 'string') {
      return `token ${auth}`;
    } else {
      let b64 = new Buffer(auth.username + ':' + auth.password).toString('base64');
      return `basic ${b64}`;
    }
  }

}

