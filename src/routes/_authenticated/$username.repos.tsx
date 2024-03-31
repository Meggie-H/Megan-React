import { createFileRoute } from '@tanstack/react-router'
import PickRepoList from '../../components/PickRepoList'

export const Route = createFileRoute('/_authenticated/$username/repos')({
  component: PickRepoList,
})