"use client";

import React from "react";

export const LiveMatchesSidebar = () => {
  return (
    <aside className="w-[18%] max-md:ml-0 max-md:w-full">
      <div className="self-stretch my-auto max-md:mt-10">
        <div className="pl-2.5 w-full">
          <div className="flex gap-5 justify-between max-w-full w-[219px]">
            <h2 className="text-lg font-medium text-red-500">Live Matches</h2>
            <div className="flex gap-1 my-auto">
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
                  src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/1c7459b8228feed781377ab16440638190bd3b5f1b86a26d3ea102f93773a3fc"
                  className="object-contain shrink-0 aspect-square w-[13px]"
                  alt="Next"
                />
              </button>
            </div>
          </div>

          <div className="flex overflow-hidden gap-4 p-4 mt-6 text-center rounded-lg border border-red-500 border-solid">
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
        </div>
      </div>
    </aside>
  );
};
