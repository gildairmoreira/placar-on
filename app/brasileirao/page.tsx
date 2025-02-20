import { Suspense } from 'react';
import LeagueTable from '../components/LeagueTable';
import MatchList from '../components/MatchList';
import { LEAGUES, getTopScorers, getLeagueStatistics } from '../utils/api';
import Image from 'next/image';

export default async function BrasileiraoPage() {
  const currentYear = new Date().getFullYear();
  const [topScorers, statistics] = await Promise.all([
    getTopScorers(LEAGUES.BRASILEIRAO.id, currentYear),
    getLeagueStatistics(LEAGUES.BRASILEIRAO.id, currentYear)
  ]);

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Brasileirão Série A {currentYear}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">Classificação</h2>
            <Suspense fallback={<div className="text-white">Carregando...</div>}>
              <LeagueTable leagueId={LEAGUES.BRASILEIRAO.id} />
            </Suspense>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Próximos Jogos</h2>
            <Suspense fallback={<div className="text-white">Carregando...</div>}>
              <MatchList leagueId={LEAGUES.BRASILEIRAO.id} limit={5} />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Artilheiros</h2>
          <div className="space-y-2">
            {topScorers.slice(0, 10).map((scorer, index) => (
              <div key={scorer.player.id} className="flex justify-between items-center text-gray-300 py-2 border-b border-gray-700">
                <div className="flex items-center">
                  <span className="text-gray-400 mr-4">{index + 1}</span>
                  <div className="relative w-8 h-8 mr-2">
                    <Image
                      src={scorer.player.photo}
                      alt={scorer.player.name}
                      fill
                      className="object-cover rounded-full"
                      sizes="32px"
                    />
                  </div>
                  <div>
                    <span>{scorer.player.name}</span>
                    <span className="text-gray-400 ml-2">({scorer.team.name})</span>
                  </div>
                </div>
                <div className="font-bold">{scorer.statistics[0].goals.total}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Estatísticas</h2>
          {statistics ? (
            <div className="space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>Total de Gols</span>
                <span className="font-bold">{statistics.goals.total}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Média de Gols por Jogo</span>
                <span className="font-bold">{statistics.goals.average.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Jogos Realizados</span>
                <span className="font-bold">{statistics.fixtures.played.total}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Cartões Amarelos</span>
                <span className="font-bold">{statistics.cards.yellow}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Cartões Vermelhos</span>
                <span className="font-bold">{statistics.cards.red}</span>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center py-4">
              Estatísticas não disponíveis
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 