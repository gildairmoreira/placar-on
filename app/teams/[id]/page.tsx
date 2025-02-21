import { Suspense } from 'react';
import TeamPageContent from '../../components/TeamPageContent';
import { use } from 'react';

interface TeamPageProps {
  params: Promise<{ id: string }>;
}

export default function TeamPage({ params }: TeamPageProps) {
  const { id } = use(params);
  
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    }>
      <TeamPageContent teamId={id} />
    </Suspense>
  );
} 