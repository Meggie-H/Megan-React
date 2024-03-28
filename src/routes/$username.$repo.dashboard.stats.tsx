import { createFileRoute } from '@tanstack/react-router'
import IssueGraph from '../components/IssueGraph'

export const Route = createFileRoute('/$username/$repo/dashboard/stats')({
  component: IssueGraph,
})