import { createFileRoute } from '@tanstack/react-router';
import StatsPage from '../components/StatsPage';

export const Route = createFileRoute('/$username/$repo/dashboard/stats')({
  component: StatsPage,
});
