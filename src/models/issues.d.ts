interface User {
  login: string;
  id: number;
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

interface Reaction {
  url: string;
  total_count: number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

interface Assignee extends User {}

interface Milestone {
  url: string;
  html_url: string;
  labels_url: string;
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
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  state: string;
  locked: boolean;
  assignee: Assignee | null;
  assignees: Assignee[];
  milestone: Milestone | null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  active_lock_reason: string | null;
  body: string | null;
  reactions: Reaction;
  timeline_url: string;
  performed_via_github_app: string | null;
  state_reason: string | null;
}
