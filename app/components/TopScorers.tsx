import { getTopScorers } from '../utils/api';
import { ImageWithFallback } from './ImageWithFallback';

interface TopScorersProps {
  leagueId: number;
}

export default async function TopScorers({ leagueId }: TopScorersProps) {
  const currentYear = new Date().getFullYear();
  const scorers = await getTopScorers(leagueId, currentYear);

  if (scorers.length === 0) {
    return (
      <div className="text-gray-400 text-center py-4">
        Nenhum artilheiro encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {scorers.slice(0, 10).map((scorer, index) => (
        <div key={scorer.player.id} className="flex justify-between items-center text-gray-300 py-2 border-b border-gray-700">
          <div className="flex items-center">
            <span className="text-gray-400 mr-4">{index + 1}</span>
            <div className="relative w-8 h-8 mr-2">
              <ImageWithFallback
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
  );
} 