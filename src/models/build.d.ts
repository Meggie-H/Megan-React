export interface IBuildStats {
    successes: number;
    failures: number;
}

export interface IWorkflowRuns {
    total_count: number;
    workflow_runs: WorkflowRun[];
  }
  
  export interface WorkflowRun {
    id: number;
    name: string | null;
    node_id: string;
    check_suite_id: number;
    check_suite_node_id: string;
    head_branch: string | null;
    head_sha: string;
    path: string;
    run_number: number;
    run_attempt: number;
    referenced_workflows: ReferencedWorkflow[] | null;
    event: string;
    status: string | null;
    conclusion: string | null;
    workflow_id: number;
    url: string;
    html_url: string;
    pull_requests: PullRequestMinimal[] | null;
    created_at: string;
    updated_at: string;
    actor: WorkflowSimpleUser;
    triggering_actor: WorkflowSimpleUser;
    run_started_at: string;
    jobs_url: string;
    logs_url: string;
    check_suite_url: string;
    artifacts_url: string;
    cancel_url: string;
    rerun_url: string;
    previous_attempt_url: string | null;
    workflow_url: string;
    head_commit: SimpleCommit | null;
    repository: MinimalRepository;
    head_repository: MinimalRepository;
    head_repository_id: number;
    display_title: string;
  }
  
  export interface ReferencedWorkflow {
    path: string;
    sha: string;
    ref: string;
  }
  
  export interface PullRequestMinimal {
    id: number;
    number: number;
    url: string;
    head: {
      ref: string;
      sha: string;
      repo: {
        id: number;
        url: string;
        name: string;
      };
    };
    base: {
      ref: string;
      sha: string;
      repo: {
        id: number;
        url: string;
        name: string;
      };
    };
  }
  
  export interface WorkflowSimpleUser {
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
  
  export interface SimpleCommit {
    id: string;
    tree_id: string;
    message: string;
    timestamp: string;
    author: {
      name: string;
      email: string;
    } | null;
    committer: {
      name: string;
      email: string;
    } | null;
  }
  
  export interface MinimalRepository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    owner: SimpleUser;
    private: boolean;
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
    archive_url: string;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string;
    deployments_url: string;
    downloads_url: string;
    events_url: string;
    forks_url: string;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    git_url: string;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    languages_url: string;
    merges_url: string;
    milestones_url: string;
    notifications_url: string;
    pulls_url: string;
    releases_url: string;
    ssh_url: string;
    stargazers_url: string;
    statuses_url: string;
    subscribers_url: string;
    subscription_url: string;
    tags_url: string;
    teams_url: string;
    trees_url: string;
    clone_url: string;
    mirror_url: string | null;
    hooks_url: string;
    svn_url: string;
    homepage: string | null;
    language: string | null;
    forks_count: number;
    stargazers_count: number;
    watchers_count: number;
    size: number;
    default_branch: string;
    open_issues_count: number;
    is_template: boolean;
    topics: string[];
    has_issues: boolean;
    has_projects: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_downloads: boolean;
    has_discussions: boolean;
    archived: boolean;
    disabled: boolean;
    visibility: string;
    pushed_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    permissions: {
      admin: boolean;
      maintain: boolean;
      push: boolean;
      triage: boolean;
      pull: boolean;
    };
    role_name: string;
    temp_clone_token: string;
    delete_branch_on_merge: boolean;
    subscribers_count: number;
    network_count: number;
    code_of_conduct: CodeOfConduct;
    license: License | null;
    forks: number;
    open_issues: number;
    watchers: number;
    allow_forking: boolean;
    web_commit_signoff_required: boolean;
    security_and_analysis: SecurityAndAnalysis | null;
  }
