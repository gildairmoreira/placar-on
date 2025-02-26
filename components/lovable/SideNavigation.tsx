import React from "react";

export const SideNavigation = () => {
  return (
    <nav className="pt-28 pb-14 bg-stone-950 max-md:hidden max-md:pt-24">
      <div className="flex gap-5 items-start w-[76px]">
        <div className="flex shrink-0 self-end mt-64 w-1 bg-red-500 h-[45px] rounded-[100px] max-md:mt-10" />
        <div className="flex flex-col items-center self-start">
          <hr className="shrink-0 self-stretch h-px border border-solid border-stone-950" />
          <button>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/48783a67d18b8265b657f196ff76861c934d3bbf0baa1379b05cb24a18430d52"
              className="object-contain mt-9 w-7 aspect-square"
              alt="Navigation item 1"
            />
          </button>
          <button>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/69b78cf16bfb40b333986bf42bc943beada4455aec4c64dd2a6520f45e4e2bee"
              className="object-contain mt-10 w-6 aspect-square"
              alt="Navigation item 2"
            />
          </button>
          <button>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/f02de93af3351f3fff0153dce808bf7f8269915cdf382fe9606fb0b115ccfae7"
              className="object-contain mt-10 w-6 aspect-square"
              alt="Navigation item 3"
            />
          </button>
          <hr className="shrink-0 self-stretch mt-9 h-px border border-solid border-stone-950" />
          <button>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/7bcbdda25fce10aaee25119141e98f6be865f16fcf97c918a87693540541c8d1"
              className="object-contain mt-9 aspect-square w-[23px]"
              alt="Navigation item 4"
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center px-5 mt-7">
        {[
          "3d5db4076e664d23e90ea8d891b2162acd117fe5f4a7cd627b9dfbc44a1335e9",
          "f43f78eb6d0d7ee43a0cebb648cbe9214576976087341d55ee7e4331b133723b",
          "462bed82addd4bb3a50bfec0cc3180932eea919b0e38852b0afb0da0e643d2d1",
          "9bffd262ba01bc9ea0c26367737e087213fd555401125e2a0ac628181df5e882",
          "35b0fd28102c42f607033d7adb9d4faf787621b45b9dedcc24cfe3b900b40f92",
          "24a3902d63cb4127053c9ff748c55bcb11471102b6e48d19632d0e3d709ddab6",
        ].map((id, index) => (
          <button key={index}>
            <img
              loading="lazy"
              src={`https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/${id}`}
              className={`object-contain ${
                index === 0 ? "" : "mt-10"
              } w-6 aspect-square`}
              alt={`Navigation item ${index + 5}`}
            />
          </button>
        ))}
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/b10d46a960805e52dfa0c3620186e221e7726bf63f5328e22ea3a2bc12d3ed83"
          className="object-contain self-stretch mt-48 w-full rounded-full aspect-square max-md:mt-10"
          alt="Profile"
        />
      </div>
    </nav>
  );
};
