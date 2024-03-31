import { createFileRoute } from '@tanstack/react-router';
import GitTable from '../../components/GitTable';

export const Route = createFileRoute('/_authenticated/$username/$repo/dashboard/commits')({
  component: GitTable,
});
