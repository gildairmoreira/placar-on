import { Suspense } from 'react';
import { League, Match, getLeagueMatches } from '../utils/api';
import { ImageWithFallback } from './ImageWithFallback';
import Image from 'next/image';

interface LeagueStatusProps {
  league: League;
  isActive: boolean;
}

async function LeagueMatches({ league }: { league: League }) {
  const currentYear = new Date().getFullYear();
  const matches = await getLeagueMatches(league.id, currentYear, 5);

  if (matches.length === 0) {
    return (
      <div className="text-gray-400 text-center py-4">
        Nenhum jogo encontrado para esta competição.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {matches.map((match) => (
        <div key={match.fixture.id} className="bg-gray-700 rounded-lg p-3">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-blue-400">{match.league.round}</span>
            <span className={getStatusColor(match.fixture.status.short)}>
              {getStatusText(match.fixture.status.short)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 flex-1">
              <div className="relative w-6 h-6">
                <ImageWithFallback
                  src={match.teams.home.logo}
                  alt={match.teams.home.name}
                  fill
                  className="object-contain"
                  sizes="24px"
                />
              </div>
              <span className="text-white text-sm">{match.teams.home.name}</span>
            </div>

            <div className="px-4">
              {match.fixture.status.short === 'NS' ? (
                <span className="text-gray-400 text-sm">
                  {new Date(match.fixture.date).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              ) : (
                <span className="text-white font-bold">
                  {match.goals.home} x {match.goals.away}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 flex-1 justify-end">
              <span className="text-white text-sm">{match.teams.away.name}</span>
              <div className="relative w-6 h-6">
                <ImageWithFallback
                  src={match.teams.away.logo}
                  alt={match.teams.away.name}
                  fill
                  className="object-contain"
                  sizes="24px"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
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

export function LeagueStatus({ league, isActive }: LeagueStatusProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16">
          <Image
            src={league.logo}
            alt={league.name}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{league.name}</h1>
          <p className="text-gray-400">
            {isActive ? (
              <span className="text-green-400">Temporada em andamento</span>
            ) : (
              <span className="text-red-400">Temporada encerrada</span>
            )}
          </p>
        </div>
      </div>

      {isActive ? (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Últimos Jogos</h2>
          <Suspense fallback={<div className="text-center py-4 text-gray-400">Carregando jogos...</div>}>
            <LeagueMatches league={league} />
          </Suspense>
        </div>
      ) : (
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400">
            Esta competição não está em andamento no momento. Confira o calendário para saber quando começa a próxima temporada.
          </p>
        </div>
      )}
    </div>
  );
} 