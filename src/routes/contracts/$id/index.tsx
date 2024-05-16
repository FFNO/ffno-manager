import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contracts/$id/')({
  component: () => <div>Hello /contracts/$id/!</div>
})