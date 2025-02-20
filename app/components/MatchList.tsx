import Image from 'next/image';
import { Match, getLeagueMatches, LEAGUES } from '../utils/api';

interface MatchListProps {
  leagueId: number;
  limit?: number;
}

async function getMatches(leagueId: number, limit: number = 5) {
  const currentYear = new Date().getFullYear();
  return getLeagueMatches(leagueId, currentYear, limit);
}

export default function MatchList({ leagueId, limit = 5 }: MatchListProps) {
  return (
    <div className="space-y-4">
      {/* @ts-expect-error Async Server Component */}
      <MatchItems leagueId={leagueId} limit={limit} />
    </div>
  );
}

async function MatchItems({ leagueId, limit }: MatchListProps) {
  const matches = await getMatches(leagueId, limit);

  if (matches.length === 0) {
    return (
      <div className="text-gray-400 text-center py-4">
        Nenhum jogo programado no momento
      </div>
    );
  }

  return (
    <>
      {matches.map((match) => (
        <div
          key={match.fixture.id}
          className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between text-sm text-blue-400 mb-2">
            <span>{match.league.name} - {match.league.round}</span>
            <span className={getStatusColor(match.fixture.status.short)}>
              {getStatusText(match.fixture.status.short)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="relative w-6 h-6">
                <Image
                  src={match.teams.home.logo || '/placeholder-team.png'}
                  alt={match.teams.home.name}
                  fill
                  className="object-contain"
                  sizes="24px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-team.png';
                  }}
                />
              </div>
              <span className="text-white">{match.teams.home.name}</span>
            </div>

            <div className="text-center">
              {match.fixture.status.short === 'NS' ? (
                <div className="text-gray-400 text-sm px-4">
                  {new Date(match.fixture.date).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              ) : (
                <div className="text-2xl font-bold text-white px-4">
                  {match.goals.home} x {match.goals.away}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-white">{match.teams.away.name}</span>
              <div className="relative w-6 h-6">
                <Image
                  src={match.teams.away.logo || '/placeholder-team.png'}
                  alt={match.teams.away.name}
                  fill
                  className="object-contain"
                  sizes="24px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-team.png';
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-400 mt-2">
            {new Date(match.fixture.date).toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: '2-digit',
              month: 'long'
            })}
            {match.fixture.venue.name && ` - ${match.fixture.venue.name}`}
          </div>
        </div>
      ))}
    </>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'LIVE':
      return 'text-green-400';
    case 'FT':
      return 'text-gray-400';
    case 'NS':
      return 'text-blue-400';
    default:
      return 'text-gray-400';
  }
}

function getStatusText(status: string): string {
  switch (status) {
    case 'LIVE':
      return 'AO VIVO';
    case 'FT':
      return 'ENCERRADO';
    case 'NS':
      return 'NÃO INICIADO';
    default:
      return status;
  }
} 