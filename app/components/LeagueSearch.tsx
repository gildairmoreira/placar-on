'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LEAGUES } from '../utils/api';

export function LeagueSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredLeagues = query === ''
    ? []
    : Object.entries(LEAGUES)
        .filter(([key, league]) =>
          league.name.toLowerCase().includes(query.toLowerCase()) ||
          league.country.toLowerCase().includes(query.toLowerCase())
        )
        .map(([key, league]) => ({
          key,
          ...league
        }));

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar campeonato..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
      />

      {isOpen && filteredLeagues.length > 0 && (
        <div 
          className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
          onMouseLeave={() => setIsOpen(false)}
        >
          <ul className="py-2">
            {filteredLeagues.map((league) => (
              <li key={league.key}>
                <Link
                  href={`/leagues/${league.key.toLowerCase()}`}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                  }}
                >
                  <div className="relative w-6 h-6">
                    <Image
                      src={league.logo}
                      alt={league.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{league.name}</p>
                    <p className="text-xs text-gray-400">{league.country}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 