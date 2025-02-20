'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { LEAGUES, LEAGUE_CATEGORIES, CATEGORIZED_LEAGUES, Match } from '../utils/api'
import { useRouter } from 'next/navigation';
import { useDebounce } from '../hooks/useDebounce';

type LeagueCategory = keyof typeof CATEGORIZED_LEAGUES;

interface TeamSearchResult {
  id: number;
  name: string;
  logo: string;
  matches?: {
    lastMatches: Match[];
    nextMatches: Match[];
  };
}

const ImageWithFallback = ({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) => {
  const [error, setError] = useState(false);
  const fallbackSrc = 'https://media.api-sports.io/football/teams/default.png';

  return (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TeamSearchResult[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamSearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
        setSelectedTeam(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchTeams = async () => {
      if (debouncedSearch.length < 3) {
        setSearchResults([]);
        setSelectedTeam(null);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(`/api/search?q=${debouncedSearch}`);
        const data = await response.json();
        setSearchResults(data);
        setSelectedTeam(null);
      } catch (error) {
        console.error('Error searching teams:', error);
      } finally {
        setIsSearching(false);
      }
    };

    searchTeams();
  }, [debouncedSearch]);

  const handleTeamClick = async (team: TeamSearchResult) => {
    try {
      const response = await fetch(`/api/search?teamId=${team.id}`);
      const matches = await response.json();
      setSelectedTeam({ ...team, matches });
    } catch (error) {
      console.error('Error fetching team matches:', error);
    }
  };

  const getMatchLeague = (match: Match) => {
    const leagueEntry = Object.entries(LEAGUES).find(([_, league]) => league.id === match.league.id);
    return leagueEntry ? leagueEntry[1].name : match.league.name;
  };

  return (
    <nav className="bg-gray-800 border-b border-blue-900 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <ImageWithFallback
                src="/logo.png"
                alt="PLACAR ON"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <span className="text-2xl font-bold text-white">PLACAR ON</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Buscar time..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {(searchResults.length > 0 || selectedTeam) && (
                <div className="absolute top-full left-0 w-96 mt-1 bg-gray-700 rounded-md shadow-lg max-h-[32rem] overflow-y-auto">
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
                                <div key={match.fixture.id} className="bg-gray-600 rounded p-2 text-sm">
                                  <div className="text-blue-400 text-xs mb-1">{getMatchLeague(match)}</div>
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
                                <div key={match.fixture.id} className="bg-gray-600 rounded p-2 text-sm">
                                  <div className="text-blue-400 text-xs mb-1">{getMatchLeague(match)}</div>
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
                                      {new Date(match.fixture.date).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
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
                    searchResults.map((team) => (
                      <button
                        key={team.id}
                        onClick={() => handleTeamClick(team)}
                        className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-600 text-white text-left"
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
                    ))
                  )}
                </div>
              )}
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </div>
              )}
            </div>

            {/* Leagues Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
              >
                <span>Competições</span>
                <svg
                  className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-700 rounded-md shadow-lg py-1 z-50">
                  {Object.entries(LEAGUE_CATEGORIES).map(([key, category]) => (
                    <div key={key} className="px-4 py-2">
                      <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{category}</div>
                      {CATEGORIZED_LEAGUES[key as LeagueCategory]?.map((leagueKey) => {
                        const league = LEAGUES[leagueKey];
                        return (
                          <Link
                            key={leagueKey}
                            href={`/${leagueKey.toLowerCase()}`}
                            className="flex items-center space-x-2 px-2 py-1 text-white hover:bg-gray-600 rounded"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="relative w-5 h-5">
                              <ImageWithFallback
                                src={league.logo}
                                alt={league.name}
                                fill
                                className="object-contain"
                                sizes="20px"
                              />
                            </div>
                            <span>{league.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 