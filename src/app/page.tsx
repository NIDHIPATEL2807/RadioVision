import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  const { userId } = await auth();
  if(userId) {
    redirect('/dashboard');
  }
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-2xl">Home Page</div>
    </div>
  );
}