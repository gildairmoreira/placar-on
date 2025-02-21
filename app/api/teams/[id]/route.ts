import { NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key não configurada' },
      { status: 500 }
    );
  }

  try {
    const teamId = parseInt(params.id);
    const currentYear = new Date().getFullYear();

    // Fetch all data in parallel
    const [teamResponse, matchesResponses, statisticsResponse, fixturesResponse] = await Promise.all([
      // Team information
      axiosInstance.get(`/teams?id=${teamId}`),
      // Team matches (last 5 and next 3)
      Promise.all([
        axiosInstance.get(`/fixtures?team=${teamId}&last=5`),
        axiosInstance.get(`/fixtures?team=${teamId}&next=3`)
      ]),
      // Team statistics for current season
      axiosInstance.get(`/teams/statistics?team=${teamId}&league=71&season=${currentYear}`),
      // All fixtures for performance chart
      axiosInstance.get(`/fixtures?team=${teamId}&season=${currentYear}&status=FT`)
    ]);

    const team = teamResponse.data.response[0];
    if (!team) {
      return NextResponse.json(
        { error: 'Time não encontrado' },
        { status: 404 }
      );
    }

    const [lastMatches, nextMatches] = matchesResponses;
    const stats = statisticsResponse.data.response;

    // Calculate performance data
    const performanceData = fixturesResponse.data.response
      .sort((a: any, b: any) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime())
      .map((match: any) => {
        const isHome = match.teams.home.id === teamId;
        const score = isHome ? match.goals.home - match.goals.away : match.goals.away - match.goals.home;
        const points = score > 0 ? 3 : score === 0 ? 1 : 0;
        
        return {
          time: match.fixture.date.split('T')[0],
          value: points
        };
      });

    // Calculate cumulative performance
    let cumulativePoints = 0;
    const cumulativePerformance = performanceData.map(match => ({
      time: match.time,
      value: (cumulativePoints += match.value)
    }));

    const teamData = {
      team: {
        id: team.team.id,
        name: team.team.name,
        logo: team.team.logo,
        founded: team.team.founded,
        country: team.team.country,
        venue: {
          name: team.venue.name,
          address: team.venue.address,
          city: team.venue.city,
          capacity: team.venue.capacity,
          image: team.venue.image,
        },
      },
      matches: {
        lastMatches: lastMatches.data.response || [],
        nextMatches: nextMatches.data.response || [],
      },
      statistics: {
        wins: stats?.fixtures?.wins?.total || 0,
        draws: stats?.fixtures?.draws?.total || 0,
        losses: stats?.fixtures?.loses?.total || 0,
        goalsFor: stats?.goals?.for?.total?.total || 0,
        goalsAgainst: stats?.goals?.against?.total?.total || 0,
        cleanSheets: stats?.clean_sheet?.total || 0,
        failedToScore: stats?.failed_to_score?.total || 0,
        performance: cumulativePerformance,
      },
    };

    return NextResponse.json(teamData);
  } catch (error) {
    console.error('Error fetching team info:', error);
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || 'Erro ao buscar informações do time';
      return NextResponse.json({ error: message }, { status });
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 