import axios, { AxiosInstance } from 'axios';

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

  public getRepo(user, name){
    return this.client.get<Repository>(`/repos/${user}/${name}`);
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

