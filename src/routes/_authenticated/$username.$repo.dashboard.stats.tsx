import { createFileRoute } from '@tanstack/react-router';
import StatsPage from '../../pages/StatsPage';

export const Route = createFileRoute(
  '/_authenticated/$username/$repo/dashboard/stats',
)({
  component: StatsPage,
});
