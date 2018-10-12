import { size } from "memory-cache";

interface BitbucketRepository {
  scm: string;
  website: string;
  name: string;
  links: BitbucketLinks;
  fork_policy: string;
  uuid: string;
  language: string;
  created_on: Date;
  mainbranch: BitbucketMainBranch;
  full_name: string;
  has_issues: boolean;
  owner: BitbucketOwner;
  updated_on: Date;
  size: string;
  type: string
  slug: string;
  is_private: boolean;
  description: string;
}

interface BitbucketMainBranch {
  type: string;
  name: string;
}

interface BitbucketOwner {
  username: string;
  display_name: string;
  account_id: string;
  links: BitbucketLinks;
  nickname: string;
  type: string;
  uuid: string;
}

interface BitbucketLinks {
  watchers: BitbucketLink;
  branches: BitbucketLink;
  tags: BitbucketLink;
  commits: BitbucketLink;
  clone: BitbucketLink[];
  self: BitbucketLink;
  source: BitbucketLink;
  html: BitbucketLink;
  avatar: BitbucketLink;
  hooks: BitbucketLink;
  forks: BitbucketLink;
  downloads: BitbucketLink;
  pullrequests: BitbucketLink;
}

interface BitbucketLink {
  href: string;
  name: string;
}