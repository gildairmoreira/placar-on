import React from "react";

export const TrendingMatches = () => {
  return (
    <aside className="flex flex-col items-start self-stretch my-auto w-full max-md:mt-10">
      <div className="flex gap-5 justify-between max-w-full w-[281px]">
        <h2 className="text-lg font-medium text-white">Trending Now</h2>
        <div className="flex gap-1 self-start">
          <button>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/96145db3e9f492ab6502447edbb850fc5a65f2ccec7d3099554b2a1043498c92"
              className="object-contain shrink-0 aspect-square w-[13px]"
              alt="Previous"
            />
          </button>
          <button>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/8fabc8b9a0bb49a2526d5765a31eaaf5f173f56709ed4189c7d8f63dc8729545"
              className="object-contain shrink-0 aspect-square w-[13px]"
              alt="Next"
            />
          </button>
        </div>
      </div>

      <div className="flex overflow-hidden gap-4 p-4 mt-4 text-center rounded-lg border border-red-500 border-solid">
        <div className="flex flex-col">
          <div className="flex gap-10 self-end max-md:mr-2">
            <p className="self-end mt-14 text-xs font-bold text-white max-md:mt-10">
              Chelsea
            </p>
            <div>
              <p className="text-xs text-white">Premier League</p>
              <div className="flex flex-col px-1.5 mt-2.5 w-full">
                <p className="text-2xl font-extrabold text-white uppercase">
                  1 : 2
                </p>
                <div className="flex gap-1.5 self-start mt-2 text-xs whitespace-nowrap text-stone-950">
                  <div className="flex shrink-0 my-auto w-2 h-2 bg-orange-400 rounded-full" />
                  <span>49:30</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-3.5 text-xs font-bold whitespace-nowrap text-stone-950">
            <button className="overflow-hidden px-9 py-2.5 bg-white rounded-md border border-solid border-stone-950 max-md:px-5">
              1.8
            </button>
            <button className="overflow-hidden px-9 py-2.5 bg-white rounded-md border border-solid border-stone-950 border-opacity-10 max-md:px-5">
              2.1
            </button>
          </div>
        </div>
        <div className="flex flex-col self-end mt-14 text-xs font-bold max-md:mt-10">
          <p className="self-center text-white">Leicester C</p>
          <button className="overflow-hidden px-9 py-2.5 mt-3.5 whitespace-nowrap bg-white rounded-md border border-solid border-stone-950 border-opacity-10 text-stone-950 max-md:px-5">
            1.3
          </button>
        </div>
      </div>

      <div className="flex overflow-hidden flex-col justify-center px-px py-0.5 mt-10 max-w-full bg-green-600 rounded-xl w-[313px]">
        <div className="px-5 py-5 w-full bg-green-600 rounded-lg">
          <div className="flex gap-5 justify-between max-md:mr-1.5">
            <h3 className="text-xs text-stone-950">Attacks</h3>
            <div className="flex gap-4 my-auto">
              <span className="text-xs font-bold text-center text-stone-950">
                27
              </span>
              <div className="flex flex-col items-start my-auto bg-white rounded-lg">
                <div className="flex shrink-0 h-1 rounded-none bg-stone-950 w-[67px]" />
              </div>
              <span className="text-xs font-bold text-center text-stone-950">
                12
              </span>
            </div>
          </div>

          <div className="flex gap-5 justify-between mt-5 w-full max-md:mr-1">
            <h3 className="text-xs text-stone-950">Posts</h3>
            <div className="flex gap-5 self-start mt-2">
              <span className="text-xs font-bold text-center text-stone-950">
                6
              </span>
              <div className="flex flex-col items-start my-auto bg-white rounded-lg">
                <div className="flex shrink-0 h-1 rounded-none bg-stone-950 w-[47px]" />
              </div>
              <span className="text-xs font-bold text-center text-stone-950">
                16
              </span>
            </div>
          </div>

          <div className="flex gap-3.5 items-center mt-7">
            <h3 className="self-stretch text-xs text-stone-950">Possession</h3>
            <span className="self-stretch my-auto text-xs font-bold text-center text-stone-950">
              70%
            </span>
            <div className="flex flex-col items-start self-stretch my-auto bg-white rounded-lg">
              <div className="flex shrink-0 h-1 rounded-none bg-stone-950 w-[85px]" />
            </div>
            <span className="self-stretch my-auto text-xs font-bold text-center text-stone-950">
              30%
            </span>
          </div>
        </div>
      </div>

      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/fb8e5aeede59be3128b37a0340634dbb22f384d001a94fcb44b441c5c31466f8"
        className="object-contain self-stretch mt-10 w-full aspect-[1.96]"
        alt="Advertisement"
      />

      <div className="overflow-hidden py-6 mt-16 max-w-full bg-white rounded-xl w-[318px] max-md:mt-10">
        <div className="flex z-10 flex-col px-3.5 w-full text-stone-950 max-md:pr-5">
          <div className="flex gap-5 justify-between">
            <div className="self-start">
              <h3 className="text-sm font-medium">Chelsea — Leicester C</h3>
              <p className="mt-2 text-xs max-md:mr-2">
                Second participant wins
              </p>
            </div>
            <div className="flex flex-col text-right whitespace-nowrap">
              <div className="flex gap-1.5 text-xs">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/0ac2fc5b6470f34966cbc3275cb95bb56a33e993a030e6d4cfea6628a9a913a5"
                  className="object-contain shrink-0 aspect-[1.07] w-[15px]"
                  alt="Time icon"
                />
                <time className="my-auto">49:30</time>
              </div>
              <span className="self-end mt-3 text-xs font-extrabold">1.3</span>
            </div>
          </div>

          <button>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/ef89fa79e6d31dda46ea769514d7b780738e418637b65138f43e4360527a753f"
              className="object-contain self-end mt-3.5 aspect-square w-[13px] max-md:mr-2"
              alt="More options"
            />
          </button>
        </div>

        <div className="flex flex-col pr-2.5 pl-6 mt-0 w-full max-md:pl-5">
          <div className="flex gap-10 self-start">
            <div className="flex gap-1.5 my-auto text-lg whitespace-nowrap text-stone-950">
              <span className="grow">$200</span>
              <span className="my-auto text-xs font-bold">→</span>
              <span>$260</span>
            </div>
            <button className="overflow-hidden px-7 py-3.5 text-xs font-medium text-center text-white rounded-md bg-stone-950 max-md:px-5">
              Make a bet
            </button>
          </div>

          <div className="flex gap-5 mt-4 text-xs font-bold text-center whitespace-nowrap text-stone-950 max-md:ml-2.5">
            <span className="my-auto">$5</span>
            <div className="flex gap-2">
              <button className="overflow-hidden px-3.5 py-2.5 bg-white rounded-md border-stone-950 border-opacity-10">
                $20
              </button>
              <button className="overflow-hidden px-3 py-2.5 bg-white rounded-md border-stone-950 border-opacity-10">
                $50
              </button>
              <button className="overflow-hidden px-2.5 py-2.5 bg-white rounded-md border-stone-950 border-opacity-10">
                $100
              </button>
              <button className="overflow-hidden p-2.5 text-white rounded-md bg-stone-950">
                $200
              </button>
              <button className="overflow-hidden px-2.5 py-2.5 bg-white rounded-md border-stone-950 border-opacity-10">
                $500
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
