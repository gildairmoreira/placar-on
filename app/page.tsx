import Link from 'next/link';
import Image from 'next/image';
import { LeagueSearch } from './components/LeagueSearch';
import { LEAGUES } from './utils/api';

export default function HomePage() {
  const nationalLeagues = Object.entries(LEAGUES)
    .filter(([_, league]) => league.type === 'NATIONAL')
    .map(([key, league]) => ({ key, ...league }));

  const internationalLeagues = Object.entries(LEAGUES)
    .filter(([_, league]) => league.type === 'INTERNATIONAL')
    .map(([key, league]) => ({ key, ...league }));

  return (
    <div className="space-y-8">
      <div className="max-w-xl mx-auto">
        <LeagueSearch />
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Ligas Nacionais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nationalLeagues.map((league) => (
              <Link
                key={league.key}
                href={`/leagues/${league.key.toLowerCase()}`}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <Image
                      src={league.logo}
                      alt={league.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{league.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="relative w-4 h-4">
                        <Image
                          src={league.flag}
                          alt={league.country}
                          fill
                          className="object-contain rounded-sm"
                        />
                      </div>
                      <p className="text-sm text-gray-400">{league.country}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Competições Internacionais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {internationalLeagues.map((league) => (
              <Link
                key={league.key}
                href={`/leagues/${league.key.toLowerCase()}`}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <Image
                      src={league.logo}
                      alt={league.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{league.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="relative w-4 h-4">
                        <Image
                          src={league.flag}
                          alt={league.country}
                          fill
                          className="object-contain rounded-sm"
                        />
                      </div>
                      <p className="text-sm text-gray-400">{league.country}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
