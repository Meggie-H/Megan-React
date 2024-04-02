export interface IBuildStats {
  successes: number;
  failures: number;
}

export interface IWorkflowRuns {
  total_count: number;
  workflow_runs: WorkflowRun[];
}

export interface IWorkflowRun {
  id: number;
  name: string | null;
  status: string | null;
  conclusion: string | null;
}
