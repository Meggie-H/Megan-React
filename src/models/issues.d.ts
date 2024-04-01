interface IUser {
  login: string;
  id: number;
  avatar_url: string;
  starred_url: string;
}

interface IMilestone {
  url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  description: string;
  creator: User;
  open_issues: number;
  closed_issues: number;
  state: string;
  created_at: string;
  updated_at: string;
  due_on: string;
  closed_at: string | null;
}

export interface IIssue {
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  state: string;
  locked: boolean;
  User: User | null;
  Users: User[];
  milestone: Milestone | null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
}
