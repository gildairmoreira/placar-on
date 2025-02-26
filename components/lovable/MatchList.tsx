import React from "react";
import { Match } from "./types";

interface MatchListProps {
  matches: Match[];
}

export const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  return (
    <section className="mt-10 w-full">
      <div className="flex gap-10 items-center w-full text-lg text-white max-md:mr-1 max-md:max-w-full">
        <h2 className="grow shrink self-stretch my-auto w-28 font-medium">
          Latest Matches
        </h2>

        <div className="flex gap-4 self-stretch text-sm">
          <span className="grow my-auto text-lg">Filter: </span>
          <button className="flex gap-3 px-2.5 py-2.5 whitespace-nowrap rounded-sm bg-stone-950">
            Football
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/1b06a4b952b12391837992c0adbf25cc1ac0ec410a4acbdc01edd0808c7d439c"
              className="object-contain shrink-0 self-start aspect-square w-[13px]"
              alt="Dropdown"
            />
          </button>
          <button className="flex gap-px px-2.5 py-2.5 whitespace-nowrap rounded-sm bg-stone-950">
            Anywhere
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/1b06a4b952b12391837992c0adbf25cc1ac0ec410a4acbdc01edd0808c7d439c"
              className="object-contain shrink-0 self-start aspect-square w-[13px]"
              alt="Dropdown"
            />
          </button>
        </div>

        <button className="self-stretch my-auto">View All</button>
      </div>

      <div className="space-y-6 mt-8">
        {matches.map((match, index) => (
          <article
            key={index}
            className="flex overflow-hidden gap-5 justify-between items-center px-9 py-5 max-w-full bg-white rounded-xl text-stone-950 w-[1079px] max-md:px-5 max-md:mr-2"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/0b1fdcf946dea7fefdd591355d98c3b806c7131934f47013ca20925b42b5507b"
              className="object-contain shrink-0 self-stretch my-auto w-9 aspect-square"
              alt={match.homeTeam}
            />

            <div className="flex flex-col self-stretch pb-6 whitespace-nowrap">
              <div className="flex gap-5 justify-between text-lg max-md:mr-2">
                <span className="my-auto">{match.homeTeam}</span>
                <div className="shrink-0 w-px h-16 border border-solid border-neutral-700" />
              </div>
              <span className="z-10 self-end -mt-3.5 text-sm font-medium bg-white rounded-full max-md:pr-0">
                VS
              </span>
            </div>

            <div className="flex gap-4 self-stretch my-auto text-lg">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/0232e54783d763019df8591196653e96c08cbd392a8be9eff1c206a046a9d626"
                className="object-contain shrink-0 w-9 aspect-square"
                alt={match.awayTeam}
              />
              <span className="my-auto">{match.awayTeam}</span>
            </div>

            <div className="flex gap-3.5 self-stretch my-auto text-lg">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/e8eb7021703a1d9bb315ab53eb57ba13552d6b985880dbee7446861e0eaab0e1"
                className="object-contain shrink-0 aspect-square w-[22px]"
                alt="Time icon"
              />
              <time>{match.time}</time>
            </div>

            <div className="flex gap-3.5 self-stretch my-auto text-lg whitespace-nowrap">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/29d4b1d989a0ef294cbd2858271e273d2c0cea32de4ea9cbfee78f7f7fb0e31c"
                className="object-contain shrink-0 w-5 aspect-[0.83]"
                alt="Location icon"
              />
              <span className="my-auto">{match.location}</span>
            </div>

            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/ce37454fc71f155ce16fa75cd1136d2498c72cc7b336a1b64d8b006a87347acb"
              className="object-contain shrink-0 self-stretch my-auto aspect-[1.08] w-[26px]"
              alt="Stats icon"
            />

            <button className="flex gap-2 self-stretch my-auto text-lg">
              <span className="grow">View Details</span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/2ee0932b96a0eca4a4bf4e2a11917baf059e7aacdec578711ba6c6bc4ae2e860"
                className="object-contain shrink-0 my-auto w-4 aspect-[8]"
                alt="Arrow right"
              />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};
