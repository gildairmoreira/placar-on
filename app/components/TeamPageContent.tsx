'use client';

import { useEffect, useState } from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { Match } from '../utils/api';
import { TeamPerformanceChart } from './TeamPerformanceChart';

interface TeamInfo {
  team: {
    id: number;
    name: string;
    logo: string;
    founded: number;
    country: string;
    venue: {
      name: string;
      address: string;
      city: string;
      capacity: number;
      image: string;
    };
  };
  matches: {
    lastMatches: Match[];
    nextMatches: Match[];
  };
  statistics: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    cleanSheets: number;
    failedToScore: number;
    performance?: Array<{
      time: string;
      value: number;
    }>;
  };
}

interface TeamPageContentProps {
  teamId: string;
}

export default function TeamPageContent({ teamId }: TeamPageContentProps) {
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const retryDelay = 1000; // 1 second

  useEffect(() => {
    const fetchTeamInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/teams/${teamId}`);
        if (response.status === 429) {
          throw new Error('Muitas requisições. Por favor, aguarde um momento e tente novamente.');
        }
        if (!response.ok) {
          throw new Error('Falha ao carregar informações do time');
        }
        const data = await response.json();
        if (!data || !data.team) {
          throw new Error('Dados do time não encontrados');
        }
        setTeamInfo(data);
        setRetryCount(0); // Reset retry count on success
      } catch (error) {
        console.error('Error fetching team info:', error);
        const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar dados do time';
        setError(errorMessage);
        
        // Implement retry logic for rate limiting
        if (error instanceof Error && error.message.includes('Muitas requisições') && retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, retryDelay * Math.pow(2, retryCount)); // Exponential backoff
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeamInfo();
  }, [teamId, retryCount]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          {retryCount > 0 && (
            <p className="text-gray-400">Tentativa {retryCount} de {maxRetries}...</p>
          )}
        </div>
      </div>
    );
  }

  if (error || !teamInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1 className="text-2xl font-bold text-white mb-4">
          {error === 'Muitas requisições. Por favor, aguarde um momento e tente novamente.'
            ? 'Limite de requisições excedido'
            : 'Time não encontrado'}
        </h1>
        <p className="text-gray-400 text-center max-w-md">
          {error || 'Não foi possível encontrar informações para este time.'}
        </p>
        {retryCount < maxRetries && error?.includes('Muitas requisições') && (
          <p className="text-blue-400 mt-4">Tentando novamente em alguns segundos...</p>
        )}
      </div>
    );
  }

  const totalGoals = teamInfo.statistics.goalsFor + teamInfo.statistics.goalsAgainst;
  const goalsForPercentage = totalGoals > 0 
    ? (teamInfo.statistics.goalsFor / totalGoals) * 100 
    : 0;
  const goalsAgainstPercentage = totalGoals > 0 
    ? (teamInfo.statistics.goalsAgainst / totalGoals) * 100 
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <ImageWithFallback
              src={teamInfo.team.logo}
              alt={teamInfo.team.name}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{teamInfo.team.name}</h1>
            <p className="text-gray-400">Fundado em {teamInfo.team.founded}</p>
            <p className="text-gray-400">{teamInfo.team.country}</p>
          </div>
        </div>
      </div>

      {/* Stadium Info */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Estádio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-48 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={teamInfo.team.venue.image}
              alt={teamInfo.team.venue.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">{teamInfo.team.venue.name}</h3>
            <p className="text-gray-400">{teamInfo.team.venue.address}</p>
            <p className="text-gray-400">{teamInfo.team.venue.city}</p>
            <p className="text-gray-400">Capacidade: {teamInfo.team.venue.capacity.toLocaleString()} pessoas</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Estatísticas da Temporada</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">Vitórias</p>
              <p className="text-2xl font-bold text-green-400">{teamInfo.statistics.wins}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">Empates</p>
              <p className="text-2xl font-bold text-blue-400">{teamInfo.statistics.draws}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">Derrotas</p>
              <p className="text-2xl font-bold text-red-400">{teamInfo.statistics.losses}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">Clean Sheets</p>
              <p className="text-2xl font-bold text-purple-400">{teamInfo.statistics.cleanSheets}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Gols</h2>
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-400">Gols Marcados</p>
                <p className="text-lg font-bold text-green-400">{teamInfo.statistics.goalsFor}</p>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-green-400 rounded-full h-2"
                  style={{
                    width: `${goalsForPercentage}%`
                  }}
                />
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-400">Gols Sofridos</p>
                <p className="text-lg font-bold text-red-400">{teamInfo.statistics.goalsAgainst}</p>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-red-400 rounded-full h-2"
                  style={{
                    width: `${goalsAgainstPercentage}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      {teamInfo.statistics.performance && teamInfo.statistics.performance.length > 0 && (
        <div className="w-full">
          <TeamPerformanceChart
            data={teamInfo.statistics.performance}
            title="Desempenho na Temporada"
          />
        </div>
      )}

      {/* Matches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Últimos Jogos</h2>
          <div className="space-y-4">
            {teamInfo.matches.lastMatches.length > 0 ? (
              teamInfo.matches.lastMatches.map((match) => (
                <div key={match.fixture.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6">
                        <ImageWithFallback
                          src={match.teams.home.logo}
                          alt={match.teams.home.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm text-white">{match.teams.home.name}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-bold text-white">
                        {match.goals.home} x {match.goals.away}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white">{match.teams.away.name}</span>
                      <div className="relative w-6 h-6">
                        <ImageWithFallback
                          src={match.teams.away.logo}
                          alt={match.teams.away.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">Nenhum jogo anterior encontrado</p>
            )}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Próximos Jogos</h2>
          <div className="space-y-4">
            {teamInfo.matches.nextMatches.length > 0 ? (
              teamInfo.matches.nextMatches.map((match) => (
                <div key={match.fixture.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6">
                        <ImageWithFallback
                          src={match.teams.home.logo}
                          alt={match.teams.home.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm text-white">{match.teams.home.name}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm text-gray-400">
                        {new Date(match.fixture.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white">{match.teams.away.name}</span>
                      <div className="relative w-6 h-6">
                        <ImageWithFallback
                          src={match.teams.away.logo}
                          alt={match.teams.away.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">Nenhum jogo programado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 