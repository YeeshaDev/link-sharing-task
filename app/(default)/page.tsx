import { redirect } from 'next/navigation'

export default async function Home() {
  // landing page coming soon redirect to customize links for now
  redirect('/customize-links')
}
