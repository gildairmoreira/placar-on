import Image from 'next/image';
import { TeamStanding, getLeagueStandings, LEAGUES } from '../utils/api';

interface LeagueTableProps {
  leagueId: number;
}

async function getStandings(leagueId: number) {
  const currentYear = new Date().getFullYear();
  return getLeagueStandings(leagueId, currentYear);
}

export default function LeagueTable({ leagueId }: LeagueTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-gray-400 text-sm">
            <th className="text-left py-2">#</th>
            <th className="text-left py-2">Time</th>
            <th className="text-center py-2">P</th>
            <th className="text-center py-2">J</th>
            <th className="text-center py-2">V</th>
            <th className="text-center py-2">E</th>
            <th className="text-center py-2">D</th>
            <th className="text-center py-2">GP</th>
            <th className="text-center py-2">GC</th>
            <th className="text-center py-2">SG</th>
            <th className="text-center py-2">%</th>
          </tr>
        </thead>
        <tbody>
          {/* @ts-expect-error Async Server Component */}
          <TableRows leagueId={leagueId} />
        </tbody>
      </table>
    </div>
  );
}

async function TableRows({ leagueId }: { leagueId: number }) {
  const standings = await getStandings(leagueId);
  
  return (
    <>
      {standings.map((team) => (
        <tr key={team.team.id} className="border-t border-gray-700 text-gray-300 hover:bg-gray-700">
          <td className="py-2">{team.rank}</td>
          <td className="py-2">
            <div className="flex items-center space-x-2">
              <div className="relative w-6 h-6">
                <Image
                  src={team.team.logo}
                  alt={team.team.name}
                  fill
                  className="object-contain"
                  sizes="24px"
                />
              </div>
              <span>{team.team.name}</span>
            </div>
          </td>
          <td className="text-center py-2">{team.points}</td>
          <td className="text-center py-2">{team.all.played}</td>
          <td className="text-center py-2">{team.all.win}</td>
          <td className="text-center py-2">{team.all.draw}</td>
          <td className="text-center py-2">{team.all.lose}</td>
          <td className="text-center py-2">{team.all.goals.for}</td>
          <td className="text-center py-2">{team.all.goals.against}</td>
          <td className="text-center py-2">{team.goalsDiff}</td>
          <td className="text-center py-2">
            {((team.points / (team.all.played * 3)) * 100).toFixed(1)}%
          </td>
        </tr>
      ))}
    </>
  );
} 