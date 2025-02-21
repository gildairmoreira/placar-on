import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { LEAGUES, getCurrentLeagues } from '../../utils/api';
import { LeagueStatus } from '../../components/LeagueStatus';
import LeagueTable from '../../components/LeagueTable';
import TopScorers from '../../components/TopScorers';

interface LeaguePageProps {
  params: {
    league: string;
  };
}

export default async function LeaguePage({ params }: LeaguePageProps) {
  // Convert URL parameter to league key format (e.g., "brasileirao" -> "BRASILEIRAO")
  const leagueKey = params.league.toUpperCase();
  const league = LEAGUES[leagueKey];

  if (!league) {
    notFound();
  }

  const currentLeagues = await getCurrentLeagues();
  const isActive = currentLeagues.some(currentLeague => currentLeague.id === league.id);

  return (
    <div className="space-y-8">
      <LeagueStatus league={league} isActive={isActive} />
      
      {isActive && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Classificação</h2>
              <Suspense fallback={<div className="text-center py-4 text-gray-400">Carregando classificação...</div>}>
                <LeagueTable leagueId={league.id} />
              </Suspense>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Artilharia</h2>
              <Suspense fallback={<div className="text-center py-4 text-gray-400">Carregando artilheiros...</div>}>
                <TopScorers leagueId={league.id} />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 