export class Repository {
  name: string;
  fullName: string;
  owner: Owner;
  description: string;
  url: string;
  htmlUrl: string;
  license: string;
  platform: string;
  organization: Organization;
  favoriteCount: number;
  watcherCount: number;
  forkCount: number;
  createdDate: Date;
  language: string;
  openIssueCount: number;
  topics: string[];
  parent: Repository;
  fork: boolean;

  constructor (name?: string) {
    this.name = name;
  }
}

export class Owner {
  public username: string;
  public website: string;
  public avatarUrl: string;

  constructor (username: string, website?: string, avatarUrl?: string) {
    this.username = username;
    this.website = website;
    this.avatarUrl = avatarUrl;
  }
}

export class Organization {
  name: string;
  website: string;
  address: Address;

  constructor (name: string, website?: string, address?: Address) {
    this.name = name;
    this.website = website;
    this.address = address;
  }
}

class Address {
  firstLine: string;
  secondLine: string;
  city: string;
  stateProvince: string;
  country: string;
}