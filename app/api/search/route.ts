import { NextResponse } from 'next/server';
import { searchTeams, getTeamMatches } from '../../utils/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const teamId = searchParams.get('teamId');

  if (teamId) {
    try {
      const matches = await getTeamMatches(parseInt(teamId));
      return NextResponse.json(matches);
    } catch (error) {
      console.error('Error fetching team matches:', error);
      return NextResponse.json({ error: 'Failed to fetch team matches' }, { status: 500 });
    }
  }

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const teams = await searchTeams(query);
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error searching teams:', error);
    return NextResponse.json({ error: 'Failed to search teams' }, { status: 500 });
  }
} 