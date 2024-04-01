export interface IRepositoryResponse {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: SimpleUser;
  private: boolean;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  open_issues_count: number;
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  has_discussions: boolean;
  visibility: string;
  pushed_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface IRepository {
  id: number;
  name: string;
  fullName: string;
  owner: SimpleUser;
  description: string | null;
  updatedTime: string | null;
  language: string;
}
