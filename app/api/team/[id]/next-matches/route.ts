import { NextResponse } from 'next/server';
import { getTeamMatches } from '../../../../util/api';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const teamId = parseInt(params.id);
    const matches = await getTeamMatches(teamId);
    return NextResponse.json(matches);
  } catch (error) {
    console.error('Error fetching next matches:', error);
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
} 