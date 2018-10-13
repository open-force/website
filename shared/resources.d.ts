type Repository = BaseRepo | GithubRepo | GitlabProj | BitbucketRepo | GistRepo;
type User = WebsiteUser | GithubUser | GitlabUser | BitbucketUser;
type Organization = WebsiteOrg | GithubOrg | GitlabGroup | BitbucketTeam;
type License = GithubLicense | GitlabLicense | BitbucketLicense;
type ResourceDataEntry = RepoDataEntry | WebsiteDataEntry;
type Resource = BaseRepo | WebsiteDataEntry;


interface BaseDataEntry {
  name: string;
  url: string | string[]; // website related to repo/project => http://open-force.org
  owner?: User;
  description?: string;
  organization?: Organization; // information about the colllection that the repo belongs to
  topics?: string[]; // what are the tags/topics/keywords related to the repo
  favoriteCount?: number; //needed because it is a sort field
  watcherCount?: number; //needed because it is a sort field
  language?: string;
  license?: License;
}

interface WebsiteDataEntry extends BaseDataEntry {
  type: 'website'; //'blog' | 'wiki' | 'article';
  owner?: WebsiteUser;
}

interface RepoDataEntry extends BaseDataEntry {
  type: 'repository' | 'gist'
  platform: 'github' | 'gitlab' | 'bitbucket';
}

// REPOSITORY
interface BaseRepo extends RepoDataEntry {
  id: string; // unique id for the repo in the respective system (not for us)
  organization?: Organization; // information about the colllection that the repo belongs to
  fullName?: string;
  topics: string[]; // what are the tags/topics/keywords related to the repo
  gitUrl: string; // git url string => https://github.com/open-force/website.git
  htmlUrl: string; // html page of repo/project => https://github.com/open-force/website
  favoriteCount?: number;  // number of users who bookmarked the repo
  watcherCount?: number;  // number of users who are watching the repository
  openIssueCount?: number; // number of open issues related to the repo
  forkCount?: number; // number of times the repo has been forked
  isFork?: boolean; // indicates if the repo is a forked repository
  createdDate?: Date; // when was the repo first created
  parent?: Repository; // if forked, the repo it was forked from
  license?: License; // what license is the software released under
  language?: string; // what is the primary language the code is written in
}

interface GithubRepo extends BaseRepo {
  type: 'repository' | 'gist';
  platform: 'github';
  owner: GithubUser;
  node_id?: string;
  full_name?: string;
  private?: boolean;
  html_url: string;
  fork: boolean;
  url: string;
  archive_url?: string;
  assignees_url?: string;
  blobs_url?: string;
  branches_url?: string;
  collaborators_url?: string;
  comments_url?: string;
  commits_url?: string;
  compare_url?: string;
  contents_url?: string;
  contributors_url?: string;
  deployments_url?: string;
  downloads_url?: string;
  events_url?: string;
  forks_url?: string;
  git_commits_url?: string;
  git_refs_url?: string;
  git_tags_url?: string;
  git_url: string;
  issue_comment_url?: string;
  issue_events_url?: string;
  issues_url?: string;
  keys_url?: string;
  labels_url?: string;
  languages_url?: string;
  merges_url?: string;
  milestones_url?: string;
  notifications_url?: string;
  pulls_url?: string;
  releases_url?: string;
  ssh_url?: string;
  stargazers_url?: string;
  statuses_url?: string;
  subscribers_url?: string;
  subscription_url?: string;
  tags_url?: string;
  teams_url?: string;
  trees_url?: string;
  clone_url?: string;
  mirror_url?: string;
  hooks_url?: string;
  svn_url?: string;
  homepage: string;
  language: any;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size?: number;
  default_branch?: string;
  open_issues_count: number;
  topics: string[];
  has_issues?: boolean;
  has_projects?: boolean;
  has_wiki?: boolean;
  has_pages?: boolean;
  has_downloads?: boolean;
  archived?: boolean;
  pushed_at?: Date;
  created_at: Date;
  updated_at?: Date;
  permissions?: GithubPermissions;
  allow_rebase_merge?: boolean;
  allow_squash_merge?: boolean;
  allow_merge_commit?: boolean;
  subscribers_count?: number;
  network_count?: number;
  source?: GithubRepo;  // this is the ultimate parent if it has been forked...the OG Repo
}

interface GitlabProj extends BaseRepo {
  type: 'repository';
  platform: 'gitlab';
  owner: GitlabUser;
  name: string;
  default_branch: string;
  visibility: string;
  ssh_url_to_repo: string;
  http_url_to_repo: string;  //gitUrl
  web_url: string;  // url, htmlUrl
  readme_url: string;
  tag_list: string[]; //topics
  name_with_namespace: string;  // fullName
  path: string;
  path_with_namespace: string;
  issues_enabled: boolean;
  open_issues_count: number;
  merge_requests_enabled: boolean;
  jobs_enabled: boolean;
  wiki_enabled: boolean;
  snippets_enabled: boolean;
  resolve_outdated_diff_discussions: boolean;
  container_registry_enabled: boolean;
  created_at: Date;
  last_activity_at: Date;
  creator_id: number;
  namespace: GitlabNamespace;
  import_status: string;
  import_error: string;
  permissions: GitlabPermissions;
  archived: boolean;
  avatar_url: string;
  shared_runners_enabled: boolean;
  forks_count: number;
  star_count: number;
  runners_token: string;
  public_jobs: boolean;
  shared_with_groups: GitlabShareGroup[];
  repository_storage: string;
  only_allow_merge_if_pipeline_succeeds: boolean;
  only_allow_merge_if_all_discussions_are_resolved: boolean;
  printing_merge_requests_link_enabled: boolean;
  request_access_enabled: boolean;
  merge_method: string;
  approvals_before_merge: number;
  statistics: GitlabStatistics;
  _links: GitlabLinks;
  forked_from_project: GitlabProj; // parent
}

interface BitbucketRepo extends BaseRepo {
  // https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D
  type: 'repository';
  platform: 'bitbucket';
  owner: BitbucketUser;
  scm?: string;
  website: string;
  links: BitbucketLinks;
  fork_policy: string;
  uuid: string;
  language?: string;
  created_on: Date;
  mainbranch: BitbucketMainBranch;
  full_name: string;
  has_issues: boolean;
  updated_on: Date;
  size: string;
  slug: string;
  is_private: boolean;
  description: string;
}

interface GistRepo extends GithubRepo {
  type: 'gist';
  platform: 'github';
  url: string;
  id: string;
  description: string;
  owner: GithubUser;
  html_url: string;
  forks_url?: string;
  commits_url?: string;
  comments_url?: string;
  git_pull_url?: string;
  git_push_url?: string;
  files?: GistFile[];
  public?: true,
  comments?: number;
  user?: string;
  truncated?: boolean;
  forks?: GistFork[];
  created_at: Date;
  updated_at?: Date;
}

// OWNER / USER
interface WebsiteUser {
  firstName?: string;
  lastName?: string;
  username?: string;
  website?: string;
  avatarUrl?: string;
}

interface Collaborator extends WebsiteUser {
  repoId: string;
  id: string;
}

interface GithubUser extends Collaborator {
  login: string; // username
  node_id: string;
  avatar_url: string; // avatarUrl
  gravatar_id: string;
  url: string;
  html_url: string; // website
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface GitlabUser extends Collaborator {
  name: string; // username
  created_at: Date;
}

interface BitbucketUser extends Collaborator {
  username: string;  // username
  display_name: string;
  account_id: string; 
  links: BitbucketLinks; // links.avatar.href = avatarUrl and links.html.ref = website
  nickname: string;
  type: string; 
  uuid: string; // id
}

// ORGANIZATION
interface WebsiteOrg {
  name?: string;
  website?: string;
  address?: Address;
}

interface Address {
  firstLine: string;
  secondLine: string;
  city: string;
  stateProvince: string;
  country: string;
  lat: string;
  long: string;
}

interface GithubOrg extends WebsiteOrg {
  id: string;
  login: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface GitlabGroup extends WebsiteOrg {
  id: string;
  name: string;
  path: string;
  description: string;
  visibility: string;
  lfs_enabled: boolean;
  avatar_url: string;
  web_url: string;
  request_access_enabled: boolean;
  full_name: string;
  full_path: string;
  parent_id: string;
}

interface BitbucketTeam extends WebsiteOrg {
  /* https://developer.atlassian.com/bitbucket/api/2/reference/resource/teams
     Bitbucket has a very poor implementation of a team that isnt useful for this
     implementation 
  */
}

// LICENSE

interface BaseLicense {
  name: string;
}

interface GithubLicense extends BaseLicense{
  key: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

interface GitlabLicense extends BaseLicense{} // https://gitlab.com/gitlab-org/gitlab-ce/issues/28267
interface BitbucketLicense extends BaseLicense{} // bitbucket does not support a license attribute

// GITHUB SPECIFIC

interface GithubPermissions {
  admin: boolean;
  push: boolean;
  pull: boolean;
}


// GITLAB SPECIFIC

interface GitlabShareGroup {
  group_id: number;
  group_name: string;
  group_access_level: number;
}

interface GitlabNamespace {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
}

interface GitlabPermissions {
  project_access: GitlabAccess;
  group_access: GitlabAccess;
}

interface GitlabAccess {
  access_level: number;
  notification_level: number;
}

interface GitlabStatistics {
  commit_count: number;
  storage_size: number;
  repository_size: number;
  lfs_objects_size: number;
  job_artifacts_size: number;
}

interface GitlabLinks {
  self: string;
  issues: string;
  merge_requests: string;
  repo_branches: string;
  events: string;
  members: string;
}

// BITBUCKET SPECIFIC

interface BitbucketLinks {
  watchers: Link;
  branches: Link;
  tags: Link;
  commits: Link;
  clone: Link[];
  self: Link;
  source: Link;
  html: Link;
  avatar: Link;
  hooks: Link;
  forks: Link;
  downloads: Link;
  pullrequests: Link;
}

interface BitbucketMainBranch {
  type: string;
  name: string;
}

interface Link {
  href: string;
  name: string;
}

// GIST SPECIFIC

interface GistFile {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
  truncated: boolean;
  content: string;
}

interface GistFork {
  user: GithubUser;
  url: string;
  id: string;
  created_at: Date;
  updated_at: Date;
}
  
interface GistHistory extends GistFork {
  user: GithubUser;
  url: string;
  id: string;
  version: string;
  change_status: GistChangeStatus;
  committed_at: Date
}

interface GistChangeStatus {
  deletions: number;
  additions: number;
  total: number;
}