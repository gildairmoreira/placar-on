import React from "react";
import { LeagueStandings } from "./types";

interface StandingsTableProps {
  standings: LeagueStandings;
}

export const StandingsTable: React.FC<StandingsTableProps> = ({
  standings,
}) => {
  return (
    <section className="mt-11 w-full max-md:mt-10 max-md:mr-0.5">
      <div className="flex gap-3 items-start pr-16 max-w-full w-[318px] max-md:pr-5">
        <img
          loading="lazy"
          src={standings.logo}
          className="object-contain shrink-0 my-auto w-6 aspect-square"
          alt={standings.leagueName}
        />
        <div className="flex flex-col self-start">
          <h3 className="text-base font-semibold text-white">
            {standings.leagueName}
          </h3>
          <p className="self-start text-xs text-neutral-400">
            {standings.country}
          </p>
        </div>
      </div>

      <div className="mt-5 max-w-full text-xs leading-7 text-white w-[318px]">
        <div className="flex flex-col py-4 w-full rounded-2xl bg-stone-950">
          <div className="flex flex-col pr-px pl-5 w-full text-center whitespace-nowrap">
            <div className="flex gap-5 justify-between w-full">
              <div>Team</div>
              <div className="flex gap-5">
                <div>D</div>
                <div>L</div>
                <div>Ga</div>
                <div>Gd</div>
                <div>Pts</div>
              </div>
            </div>
            <hr className="shrink-0 self-end h-px border border-solid border-stone-950 w-[156px]" />
          </div>

          <div className="flex gap-10 self-start mt-2 ml-5 max-md:ml-2.5">
            <div className="flex flex-col items-start">
              {standings.standings.map((entry, index) => (
                <div key={index} className="flex gap-2.5 mt-2 first:mt-0">
                  <img
                    loading="lazy"
                    src={entry.teamLogo}
                    className="object-contain shrink-0 my-auto w-4 aspect-square"
                    alt={entry.team}
                  />
                  <span>{entry.team}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col text-center whitespace-nowrap">
              {standings.standings.map((entry, index) => (
                <div
                  key={index}
                  className="flex gap-5 self-start mt-2 first:mt-0"
                >
                  <div>{entry.draws}</div>
                  <div>{entry.losses}</div>
                  <div>{entry.goalsAgainst}</div>
                  <div>{entry.goalDifference}</div>
                  <div>{entry.points}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
