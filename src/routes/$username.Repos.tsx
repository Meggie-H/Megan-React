import { createFileRoute } from '@tanstack/react-router';
import PickRepoList from '../components/PickRepoList';

export const Route = createFileRoute('/$username/repos')({
  component: PickRepoList,
});
