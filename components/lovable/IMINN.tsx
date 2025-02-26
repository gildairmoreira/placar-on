"use client";

import React from "react";
import { NavigationHeader } from "./NavigationHeader";
import { LiveMatchesSidebar } from "./LiveMatchesSidebar";
import { StandingsTable } from "./StandingsTable";
import { FeaturedMatch } from "./FeaturedMatch";
import { MatchList } from "./MatchList";
import { TrendingMatches } from "./TrendingMatches";
import { SideNavigation } from "./SideNavigation";

const IMINN = () => {
  const matches = [
    {
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      time: "5:00 PM",
      location: "Spain",
      league: "La Liga",
    },
    // Add more matches as needed
  ];

  const premierLeagueStandings = {
    leagueName: "Premier League",
    country: "England",
    logo: "https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/3e03aa969ae959110096ad7d7273be14e129cd593fbd467884735792a7dc6378",
    standings: [
      {
        team: "Liverpool",
        teamLogo:
          "https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/0ab6c9d5c05298785f7f5f250cb6dd4642453d78df37114bcc512bb27e5848b0",
        draws: 6,
        losses: 2,
        goalsAgainst: 21,
        goalDifference: 16,
        points: 33,
      },
      // Add more standings entries
    ],
  };

  return (
    <div className="flex overflow-hidden pr-20 bg-neutral-900 max-md:pr-5">
      <div className="flex z-10 flex-col self-start mr-0 w-full max-md:max-w-full">
        <NavigationHeader />

        <main className="self-end mt-6 w-full max-w-[1800px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <LiveMatchesSidebar />

            <section className="ml-5 w-[62%] max-md:ml-0 max-md:w-full">
              <div className="w-full max-md:mt-7 max-md:max-w-full">
                <FeaturedMatch />
                <MatchList matches={matches} />
              </div>
            </section>

            <section className="ml-5 w-[19%] max-md:ml-0 max-md:w-full">
              <TrendingMatches />
            </section>
          </div>
        </main>
      </div>

      <SideNavigation />
    </div>
  );
};

export default IMINN;
