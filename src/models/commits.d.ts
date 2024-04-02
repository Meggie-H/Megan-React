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

interface ICommitData {
  url: string;
  author: Author | null;
  committer: Committer | null;
  message: string;
  comment_count: number;
  tree: Tree | null;
}

interface ICommitter {
  name: string;
  email: string;
  date: string;
}

interface IAuthor {
  name: string | null;
  email: string | null;
  login: string;
  id: number;
  avatar_url: string;
}

interface IParents {
  sha: string;
  url: string;
  html_url: string;
}

interface IStats {
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
