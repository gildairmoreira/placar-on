import Image from 'next/image';
import { TeamStanding, getLeagueStandings } from '../utils/api';
import { Suspense } from 'react';

interface LeagueTableProps {
  leagueId: number;
}

async function getStandings(leagueId: number): Promise<TeamStanding[]> {
  return getLeagueStandings(leagueId);
}

function TableHeader() {
  return (
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
          <td className="text-center py-2">{team.played}</td>
          <td className="text-center py-2">{team.win}</td>
          <td className="text-center py-2">{team.draw}</td>
          <td className="text-center py-2">{team.lose}</td>
          <td className="text-center py-2">{team.goalsFor}</td>
          <td className="text-center py-2">{team.goalsAgainst}</td>
          <td className="text-center py-2">{team.goalsDiff}</td>
          <td className="text-center py-2">
            {((team.points / (team.played * 3)) * 100).toFixed(1)}%
          </td>
        </tr>
      ))}
    </>
  );
}

export default function LeagueTable({ leagueId }: LeagueTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <TableHeader />
        <tbody>
          <Suspense fallback={<tr><td colSpan={11} className="text-center py-4">Carregando...</td></tr>}>
            <TableRows leagueId={leagueId} />
          </Suspense>
        </tbody>
      </table>
    </div>
  );
} 