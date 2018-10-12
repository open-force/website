interface RepositoryDataEntry {
  user: string;
  repositories: string[];
  source: string;
  url: string;
  license: string; // to manually specify the license (mainly for bitbucket)
}