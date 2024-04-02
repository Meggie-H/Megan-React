import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/$username/$repo/dashboard/git-tree',
)({
  component: () => <div>GitTree coming soon!</div>,
});
