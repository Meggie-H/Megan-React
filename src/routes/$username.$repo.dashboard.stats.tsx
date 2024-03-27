import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$username/$repo/dashboard/stats')({
  component: () => <div>Hello /$username/$repo/dashboard/stats!</div>
})