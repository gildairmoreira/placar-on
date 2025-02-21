import axios from 'axios';

const API_KEY = process.env.API_KEY;
const API_BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
});

export interface League {
  id: number;
  name: string;
  logo: string;
  country: string;
  flag: string;
  type: 'NATIONAL' | 'INTERNATIONAL';
}

export interface TeamStanding {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  goalsDiff: number;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface Match {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
      elapsed: number | null;
    };
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
}

export interface TopScorer {
  player: {
    id: number;
    name: string;
    photo: string;
  };
  statistics: [{
    team: {
      id: number;
      name: string;
      logo: string;
    };
    goals: {
      total: number;
    };
    games: {
      appearences: number;
    };
  }];
}

export const LEAGUES: Record<string, League> = {
  PREMIER_LEAGUE: {
    id: 39,
    name: 'Premier League',
    logo: 'https://media-4.api-sports.io/football/leagues/39.png',
    country: 'Inglaterra',
    flag: 'https://media-4.api-sports.io/flags/gb.svg',
    type: 'NATIONAL'
  },
  LALIGA: {
    id: 140,
    name: 'La Liga',
    logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    country: 'Espanha',
    flag: 'https://media-4.api-sports.io/flags/es.svg',
    type: 'NATIONAL'
  },
  BRASILEIRAO: {
    id: 71,
    name: 'Brasileirão Série A',
    logo: 'https://media-4.api-sports.io/football/leagues/71.png',
    country: 'Brasil',
    flag: 'https://media-4.api-sports.io/flags/br.svg',
    type: 'NATIONAL'
  },
  CHAMPIONS_LEAGUE: {
    id: 2,
    name: 'Champions League',
    logo: 'https://media-4.api-sports.io/football/leagues/2.png',
    country: 'Europa',
    flag: 'https://media-4.api-sports.io/flags/eu.svg',
    type: 'INTERNATIONAL'
  }
};

export const LEAGUE_CATEGORIES = {
  EUROPE: 'Ligas Europeias',
  BRAZIL: 'Futebol Brasileiro',
  INTERNATIONAL: 'Competições Internacionais'
} as const;

export type LeagueCategory = keyof typeof LEAGUE_CATEGORIES;

export const CATEGORIZED_LEAGUES: Record<LeagueCategory, string[]> = {
  EUROPE: ['PREMIER_LEAGUE', 'LALIGA'],
  BRAZIL: ['BRASILEIRAO'],
  INTERNATIONAL: ['CHAMPIONS_LEAGUE']
};

export async function getLeagueStandings(leagueId: number): Promise<TeamStanding[]> {
  try {
    const currentYear = new Date().getFullYear();
    const { data } = await axiosInstance.get(`/standings?league=${leagueId}&season=${currentYear}`);
    const standings = data.response[0]?.league?.standings[0] || [];
    
    return standings.map((standing: any) => ({
      rank: standing.rank,
      team: {
        id: standing.team.id,
        name: standing.team.name,
        logo: standing.team.logo,
      },
      points: standing.points,
      goalsDiff: standing.goalsDiff,
      played: standing.all.played,
      win: standing.all.win,
      draw: standing.all.draw,
      lose: standing.all.lose,
      goalsFor: standing.all.goals.for,
      goalsAgainst: standing.all.goals.against,
    }));
  } catch (error) {
    console.error('Error fetching standings:', error);
    return [];
  }
}

export async function getLeagueMatches(leagueId: number): Promise<Match[]> {
  try {
    const currentYear = new Date().getFullYear();
    const { data } = await axiosInstance.get(`/fixtures?league=${leagueId}&season=${currentYear}&last=10`);
    
    return data.response.map((match: any) => ({
      fixture: {
        id: match.fixture.id,
        date: match.fixture.date,
        status: {
          short: match.fixture.status.short,
          elapsed: match.fixture.status.elapsed,
        },
      },
      teams: {
        home: {
          id: match.teams.home.id,
          name: match.teams.home.name,
          logo: match.teams.home.logo,
        },
        away: {
          id: match.teams.away.id,
          name: match.teams.away.name,
          logo: match.teams.away.logo,
        },
      },
      goals: {
        home: match.goals.home,
        away: match.goals.away,
      },
    }));
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
}

export async function getTeamMatches(teamId: number): Promise<{
  lastMatches: Match[];
  nextMatches: Match[];
}> {
  try {
    const [lastMatches, nextMatches] = await Promise.all([
      axiosInstance.get(`/fixtures?team=${teamId}&last=5`),
      axiosInstance.get(`/fixtures?team=${teamId}&next=3`)
    ]);

    return {
      lastMatches: lastMatches.data.response || [],
      nextMatches: nextMatches.data.response || []
    };
  } catch (error) {
    console.error('Error fetching team matches:', error);
    return {
      lastMatches: [],
      nextMatches: []
    };
  }
}

export async function getTopScorers(leagueId: number): Promise<TopScorer[]> {
  try {
    const currentYear = new Date().getFullYear();
    const { data } = await axiosInstance.get(`/players/topscorers?league=${leagueId}&season=${currentYear}`);
    
    return data.response.map((scorer: any) => ({
      player: {
        id: scorer.player.id,
        name: scorer.player.name,
        photo: scorer.player.photo,
      },
      statistics: [{
        team: {
          id: scorer.statistics[0].team.id,
          name: scorer.statistics[0].team.name,
          logo: scorer.statistics[0].team.logo,
        },
        goals: {
          total: scorer.statistics[0].goals.total,
        },
        games: {
          appearences: scorer.statistics[0].games.appearences,
        },
      }],
    }));
  } catch (error) {
    console.error('Error fetching top scorers:', error);
    return [];
  }
}

export async function getLeagueStatistics(leagueId: number) {
  try {
    const { data } = await axiosInstance.get(`/leagues/statistics?league=${leagueId}`);
    return data.response || null;
  } catch (error) {
    console.error('Error fetching league statistics:', error);
    return null;
  }
}

export async function searchTeams(query: string): Promise<Array<{ id: number; name: string; logo: string }>> {
  try {
    const { data } = await axiosInstance.get(`/teams?search=${query}`);
    return data.response.map((item: any) => ({
      id: item.team.id,
      name: item.team.name,
      logo: item.team.logo
    })) || [];
  } catch (error) {
    console.error('Error searching teams:', error);
    return [];
  }
}

export async function getCurrentLeagues(): Promise<League[]> {
  // Simulated API call - in a real app, this would fetch from your backend
  return Object.values(LEAGUES);
}

export async function getLeagueInfo(leagueId: number): Promise<League | null> {
  try {
    const { data } = await axiosInstance.get(`/leagues?id=${leagueId}`);
    return data.response[0] || null;
  } catch (error) {
    console.error('Error fetching league info:', error);
    return null;
  }
} 