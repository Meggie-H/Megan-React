import { createFileRoute } from '@tanstack/react-router';
import Dashboard from '../components/Dashboard';

export const Route = createFileRoute('/$username/Dashboard')({
  component: Dashboard,
});