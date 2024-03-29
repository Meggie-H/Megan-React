import { createFileRoute } from '@tanstack/react-router'
import IssueGraph from '../components/IssueGraph'
import BuildGraph from '../components/BuildGraph'
import Contributors from '../components/Contributors'
import CommitGraph from '../components/CommitGraph'
import LanguageGraph from '../components/LanguageGraph'

export const Route = createFileRoute('/$username/$repo/dashboard/stats')({
  component: () => (
    <div className='flex flex-wrap gap-4'>
      <IssueGraph />
      <BuildGraph />
      <Contributors />
      <CommitGraph />
      <LanguageGraph />
    </div>
  ),
})