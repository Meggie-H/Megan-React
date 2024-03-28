import { createFileRoute } from '@tanstack/react-router'
import IssueGraph from '../components/IssueGraph'
import BuildGraph from '../components/BuildGraph'

export const Route = createFileRoute('/$username/$repo/dashboard/stats')({
  component: () => (
    <>
      <IssueGraph />
      <BuildGraph />
    </>
  ),
})