export interface ICommitResponse {
  url: string;
  sha: string;
  node_id: string;
  html_url: string;
  comments_url: string;
  commit: CommitData;
  author: Author | null;
  committer: CommitterMain | null;
  parents: Parents[];
  stats: Stats;
  files: Files[];
}

interface CommitData {
  url: string;
  author: Author | null;
  committer: Committer | null;
  message: string;
  comment_count: number;
  tree: Tree | null;
}

interface Author {
  name: string;
  email: string;
  date: string;
}

interface Committer {
  name: string;
  email: string;
  date: string;
}

interface Tree {
  sha: string;
  url: string;
}

interface Verification {
  verified: boolean;
  reason: string;
  payload: string | null;
  signature: string | null;
}

interface Author {
  name: string | null;
  email: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
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
  starred_at: string;
}

interface CommitterMain {
  name: string | null;
  email: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
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
  starred_at: string;
}

interface Parents {
  sha: string;
  url: string;
  html_url: string;
}

interface Stats {
  additions: number;
  deletions: number;
  total: number;
}

export interface ICommit {
  author: Author | null;
  message: string;
  branches: string[];
  date: string | null;
  type: 'initial' | 'merge' | 'commit' | 'branch';
  id: string;
}
