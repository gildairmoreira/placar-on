import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LEAGUES, getCurrentLeagues, getLeagueInfo } from './utils/api';

export default async function HomePage() {
  const currentLeagues = await getCurrentLeagues();
  const leagueIds = Object.values(LEAGUES).map(league => league.id);
  const activeLeagues = currentLeagues.filter(league => leagueIds.includes(league.id));

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Competições em Andamento</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeLeagues.length > 0 ? (
            activeLeagues.map((league) => (
              <Link
                key={league.id}
                href={`/${Object.entries(LEAGUES).find(([_, l]) => l.id === league.id)?.[0].toLowerCase()}`}
                className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12">
                    <Image
                      src={league.logo}
                      alt={league.name}
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold">{league.name}</h2>
                    <p className="text-gray-400 text-sm">{league.country}</p>
                    <div className="flex items-center mt-1">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-green-400 text-sm">Em andamento</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-400">Nenhuma competição em andamento no momento.</p>
              <p className="text-gray-500 mt-2">
                Confira o calendário das próximas competições no menu Competições.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Próximas Competições</h2>
          <div className="space-y-4">
            {Object.entries(LEAGUES)
              .filter(([_, league]) => !activeLeagues.some(active => active.id === league.id))
              .map(([key, league]) => (
                <Link
                  key={key}
                  href={`/${key.toLowerCase()}`}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative w-8 h-8">
                      <Image
                        src={league.logo || '/placeholder-league.png'}
                        alt={league.name}
                        fill
                        className="object-contain"
                        sizes="32px"
                      />
                    </div>
                    <div>
                      <h3 className="text-white">{league.name}</h3>
                      <p className="text-gray-400 text-sm">{league.country}</p>
                    </div>
                  </div>
                  <div className="text-gray-400">Em breve</div>
                </Link>
              ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Destaques</h2>
          <div className="space-y-4">
            <p className="text-gray-400">
              Acompanhe os principais campeonatos do Brasil e do mundo.
              Fique por dentro de todas as estatísticas, resultados e classificações.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Campeonatos</h3>
                <p className="text-gray-400 text-sm">
                  {Object.keys(LEAGUES).length} competições disponíveis
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Ao Vivo</h3>
                <p className="text-gray-400 text-sm">
                  {activeLeagues.length} competições em andamento
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
