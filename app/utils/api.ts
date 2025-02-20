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
  country: string;
  type: 'League' | 'Cup' | 'Regional';
  logo: string;
  season?: {
    start: string;
    end: string;
    current: boolean;
  };
}

export interface TeamStanding {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  goalsDiff: number;
  form: string;
}

export interface Match {
  fixture: {
    id: number;
    date: string;
    status: {
      long: string;
      short: string;
    };
    venue: {
      name: string;
      city: string;
    };
  };
  league: {
    id: number;
    name: string;
    round: string;
    logo: string;
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
  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
  };
}

export interface TopScorer {
  player: {
    id: number;
    name: string;
    photo: string;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  statistics: Array<{
    goals: {
      total: number;
      assists: number;
    };
    games: {
      appearences: number;
      minutes: number;
    };
  }>;
}

export const LEAGUES: Record<string, League> = {
  BRASILEIRAO: {
    id: 71,
    name: 'Brasileirão',
    country: 'Brasil',
    type: 'League',
    logo: 'https://media.api-sports.io/football/leagues/71.png'
  },
  PAULISTA: {
    id: 475,
    name: 'Campeonato Paulista',
    country: 'Brasil',
    type: 'Regional',
    logo: 'https://media.api-sports.io/football/leagues/475.png'
  },
  CARIOCA: {
    id: 476,
    name: 'Campeonato Carioca',
    country: 'Brasil',
    type: 'Regional',
    logo: 'https://media.api-sports.io/football/leagues/476.png'
  },
  MINEIRO: {
    id: 477,
    name: 'Campeonato Mineiro',
    country: 'Brasil',
    type: 'Regional',
    logo: 'https://media.api-sports.io/football/leagues/477.png'
  },
  COPA_DO_BRASIL: {
    id: 73,
    name: 'Copa do Brasil',
    country: 'Brasil',
    type: 'Cup',
    logo: 'https://media.api-sports.io/football/leagues/73.png'
  },
  LIBERTADORES: {
    id: 13,
    name: 'Copa Libertadores',
    country: 'South America',
    type: 'Cup',
    logo: 'https://media.api-sports.io/football/leagues/13.png'
  },
  PREMIER_LEAGUE: {
    id: 39,
    name: 'Premier League',
    country: 'England',
    type: 'League',
    logo: 'https://media.api-sports.io/football/leagues/39.png'
  },
  LALIGA: {
    id: 140,
    name: 'La Liga',
    country: 'Spain',
    type: 'League',
    logo: 'https://media.api-sports.io/football/leagues/140.png'
  },
  CHAMPIONS_LEAGUE: {
    id: 2,
    name: 'UEFA Champions League',
    country: 'Europe',
    type: 'Cup',
    logo: 'https://media.api-sports.io/football/leagues/2.png'
  },
  MUNDIAL: {
    id: 21,
    name: 'Mundial de Clubes',
    country: 'World',
    type: 'Cup',
    logo: 'https://media.api-sports.io/football/leagues/21.png'
  }
};

export const LEAGUE_CATEGORIES = {
  BRAZILIAN: 'Campeonatos Brasileiros',
  REGIONAL: 'Campeonatos Regionais',
  INTERNATIONAL: 'Competições Internacionais'
} as const;

export const CATEGORIZED_LEAGUES = {
  [LEAGUE_CATEGORIES.BRAZILIAN]: ['BRASILEIRAO', 'COPA_DO_BRASIL'],
  [LEAGUE_CATEGORIES.REGIONAL]: ['PAULISTA', 'CARIOCA', 'MINEIRO'],
  [LEAGUE_CATEGORIES.INTERNATIONAL]: ['LIBERTADORES', 'CHAMPIONS_LEAGUE', 'MUNDIAL', 'PREMIER_LEAGUE', 'LALIGA']
};

export async function getLeagueStandings(leagueId: number, season: number): Promise<TeamStanding[]> {
  try {
    const { data } = await axiosInstance.get(`/standings?league=${leagueId}&season=${season}`);
    return data.response[0]?.league?.standings[0] || [];
  } catch (error) {
    console.error('Error fetching standings:', error);
    return [];
  }
}

export async function getLeagueMatches(leagueId: number, season: number, next: number = 10): Promise<Match[]> {
  try {
    const { data } = await axiosInstance.get(`/fixtures?league=${leagueId}&season=${season}&next=${next}`);
    return data.response || [];
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

export async function getTopScorers(leagueId: number, season: number): Promise<TopScorer[]> {
  try {
    const { data } = await axiosInstance.get(`/players/topscorers?league=${leagueId}&season=${season}`);
    return data.response || [];
  } catch (error) {
    console.error('Error fetching top scorers:', error);
    return [];
  }
}

export async function getLeagueStatistics(leagueId: number, season: number) {
  try {
    const { data } = await axiosInstance.get(`/leagues/statistics?league=${leagueId}&season=${season}`);
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
  // For now, return all leagues as active
  // In a real implementation, this would check the current date against league seasons
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