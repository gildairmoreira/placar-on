"use client";

import React from "react";

export const NavigationHeader = () => {
  return (
    <header className="flex gap-5 justify-between items-center pr-20 pl-9 w-full bg-stone-950 max-md:px-5 max-md:max-w-full">
      <nav className="flex gap-9 items-center self-stretch text-lg font-medium text-gray-400">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/2046941d1a970398b4834879d0e53185b7fad3091d4df44d676323f98717a156"
          className="object-contain shrink-0 self-stretch my-auto w-7 aspect-square"
          alt="Sports logo"
        />
        <div className="shrink-0 self-stretch w-px border border-solid border-neutral-700 h-[105px]" />
        <div className="self-start text-cyan-900 whitespace-nowrap">
          <div className="flex shrink-0 h-1 bg-red-500 rounded-[100px]" />
          <div className="mt-11 max-md:mt-10">Matches</div>
        </div>
        <div className="self-stretch my-auto">Live Score</div>
        <div className="self-stretch my-auto">Statistics</div>
        <div className="self-stretch my-auto">Analytics</div>
      </nav>

      <div className="flex flex-wrap gap-10 self-stretch px-8 py-3.5 my-auto text-sm border border-gray-800 border-solid bg-stone-950 rounded-[100px] text-stone-300 max-md:px-5 max-md:max-w-full">
        <input
          type="search"
          placeholder="Search Matches, Players, Stats ..."
          className="my-auto bg-transparent outline-none"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/50370dc74b0116ce69ae7770c1eacc529f6fb0b3e4942d849d82dd3318d5d9b7"
          className="object-contain shrink-0 w-6 aspect-square"
          alt="Search icon"
        />
      </div>

      <div className="flex gap-7 items-start self-stretch my-auto">
        <button>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/db7b1e59ee021c6b25013b550f72acc802391fd3cd233dd125af5ebe30c0d8f9"
            className="object-contain shrink-0 w-6 aspect-square"
            alt="Notification"
          />
        </button>
        <button>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/d96fb7d2658eb35784f4f81b0160072d8f9fe4e7198f5bfa833b42322271102d"
            className="object-contain shrink-0 w-6 aspect-square"
            alt="Messages"
          />
        </button>
        <button>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/10fa5e3a297cffe07c7298b5f9c75957ef0d935d6928a9e13d7d0f656506666a"
            className="object-contain shrink-0 w-6 aspect-square"
            alt="Settings"
          />
        </button>
      </div>

      <div className="flex gap-4 items-center self-stretch my-auto text-lg font-medium text-white">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/efa118cc80d2dff072a4e441d80e69f50245e3ca056923b8f1cfa065c4160d8b"
          className="object-contain shrink-0 self-stretch rounded-full aspect-square w-[59px]"
          alt="User avatar"
        />
        <span className="self-stretch my-auto">Jane Doe</span>
        <button>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/6be6a9b979535e2c9a319e11d9fa8549c0ccee95b04b1c9d25e9b0d75258875e"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            alt="Expand menu"
          />
        </button>
      </div>
    </header>
  );
};
