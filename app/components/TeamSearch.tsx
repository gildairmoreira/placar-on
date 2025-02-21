'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ImageWithFallback } from './ImageWithFallback';
import { useDebounce } from '../hooks/useDebounce';

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface Match {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
    };
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  league: {
    name: string;
  };
}

interface TeamWithMatches extends Team {
  matches?: {
    lastMatches: Match[];
    nextMatches: Match[];
  };
}

export function TeamSearch() {
  const [query, setQuery] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamWithMatches | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setTeams([]);
        setSelectedTeam(null);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchTeams = async () => {
      if (debouncedQuery.length < 3) {
        setTeams([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${debouncedQuery}`);
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error searching teams:', error);
      } finally {
        setIsLoading(false);
      }
    };

    searchTeams();
  }, [debouncedQuery]);

  const handleTeamSelect = (team: Team) => {
    router.push(`/teams/${team.id}`);
    setTeams([]);
    setQuery('');
  };

  const formatMatchDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        placeholder="Buscar time..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
      />

      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        </div>
      )}

      {(teams.length > 0 || selectedTeam) && (
        <div className="absolute top-full left-0 w-96 mt-1 bg-gray-800 rounded-lg shadow-lg max-h-[32rem] overflow-y-auto">
          {selectedTeam ? (
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="relative w-8 h-8">
                    <ImageWithFallback
                      src={selectedTeam.logo}
                      alt={selectedTeam.name}
                      fill
                      className="object-contain"
                      sizes="32px"
                    />
                  </div>
                  <span className="text-white font-semibold">{selectedTeam.name}</span>
                </div>
              </div>

              {selectedTeam.matches && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Últimos Jogos</h3>
                    <div className="space-y-2">
                      {selectedTeam.matches.lastMatches.map((match) => (
                        <div key={match.fixture.id} className="bg-gray-700 rounded p-2 text-sm">
                          <div className="text-blue-400 text-xs mb-1">{match.league.name}</div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <div className="relative w-4 h-4">
                                <ImageWithFallback
                                  src={match.teams.home.logo}
                                  alt={match.teams.home.name}
                                  fill
                                  className="object-contain"
                                  sizes="16px"
                                />
                              </div>
                              <span className="text-white">{match.teams.home.name}</span>
                            </div>
                            <span className="text-white font-bold px-2">
                              {match.goals.home} x {match.goals.away}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-white">{match.teams.away.name}</span>
                              <div className="relative w-4 h-4">
                                <ImageWithFallback
                                  src={match.teams.away.logo}
                                  alt={match.teams.away.name}
                                  fill
                                  className="object-contain"
                                  sizes="16px"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Próximos Jogos</h3>
                    <div className="space-y-2">
                      {selectedTeam.matches.nextMatches.map((match) => (
                        <div key={match.fixture.id} className="bg-gray-700 rounded p-2 text-sm">
                          <div className="text-blue-400 text-xs mb-1">{match.league.name}</div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <div className="relative w-4 h-4">
                                <ImageWithFallback
                                  src={match.teams.home.logo}
                                  alt={match.teams.home.name}
                                  fill
                                  className="object-contain"
                                  sizes="16px"
                                />
                              </div>
                              <span className="text-white">{match.teams.home.name}</span>
                            </div>
                            <span className="text-gray-400 text-xs">
                              {formatMatchDate(match.fixture.date)}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-white">{match.teams.away.name}</span>
                              <div className="relative w-4 h-4">
                                <ImageWithFallback
                                  src={match.teams.away.logo}
                                  alt={match.teams.away.name}
                                  fill
                                  className="object-contain"
                                  sizes="16px"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <ul className="py-2">
              {teams.map((team) => (
                <li key={team.id}>
                  <button
                    onClick={() => handleTeamSelect(team)}
                    className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 text-white text-left"
                  >
                    <div className="relative w-6 h-6">
                      <ImageWithFallback
                        src={team.logo}
                        alt={team.name}
                        fill
                        className="object-contain"
                        sizes="24px"
                      />
                    </div>
                    <span>{team.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
} 