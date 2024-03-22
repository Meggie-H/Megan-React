import { createLazyFileRoute } from '@tanstack/react-router'
import UserForm from '../components/UserForm'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <UserForm />
    </div>
  )
}