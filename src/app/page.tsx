import HomeClient from './HomeClient'

// Enable ISR with revalidation every 3600 seconds (1 hour)
export const revalidate = 3600;

export default async function Home() {
  // If you need to fetch any data for the home page in the future, do it here
  // For now, we'll just pass static data

  return <HomeClient />
}