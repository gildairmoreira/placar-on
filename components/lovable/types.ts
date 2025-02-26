export interface Match {
  homeTeam: string;
  awayTeam: string;
  time: string;
  location: string;
  league: string;
  score?: {
    home: number;
    away: number;
  };
}

export interface StandingsEntry {
  team: string;
  teamLogo: string;
  draws: number;
  losses: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface LeagueStandings {
  leagueName: string;
  country: string;
  logo: string;
  standings: StandingsEntry[];
}
