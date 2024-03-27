import { createFileRoute } from '@tanstack/react-router';
import GitTable from '../components/GitTable';

export const Route = createFileRoute('/$username/$repo/dashboard/commits')({
  component: GitTable,
});