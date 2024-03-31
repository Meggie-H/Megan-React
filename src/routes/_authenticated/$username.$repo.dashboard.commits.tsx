import { createFileRoute } from '@tanstack/react-router';
import { GitTable } from '../../components';

export const Route = createFileRoute(
  '/_authenticated/$username/$repo/dashboard/commits',
)({
  component: GitTable,
});
