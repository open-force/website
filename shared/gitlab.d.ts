interface GitlabProject {
  id: number;
  description: string;
  default_branch: string;
  visibility: string;
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
  readme_url: string;
  tag_list: string[];
  owner: GitlabOwner;
  name: string;
  name_with_namespace: string;
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
  forked_from_project: GitlabProject;
}

interface GitlabStatistics {
  commit_count: number;
  storage_size: number;
  repository_size: number;
  lfs_objects_size: number;
  job_artifacts_size: number;
}

interface GitlabShareGroup {
  group_id: number;
  group_name: string;
  group_access_level: number;
}

interface GitlabLinks {
  self: string;
  issues: string;
  merge_requests: string;
  repo_branches: string;
  events: string;
  members: string;
}

interface GitlabOwner {
    id: number;
    name: string;
    created_at: Date;
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