import React from "react";

export const FeaturedMatch = () => {
  return (
    <section className="px-px bg-orange-500 rounded-md max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-[27%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/eeb9ee5dfd4fabf3661ef7228169f24f59ec21b69cd68db7a9581545f10187d2"
            className="object-contain grow mt-0 w-full rounded-none aspect-[0.82] max-md:mt-0"
            alt="Featured match"
          />
        </div>

        <div className="ml-5 w-[73%] max-md:ml-0 max-md:w-full">
          <div className="grow max-md:mt-3.5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex z-10 flex-col self-stretch my-auto mr-0 w-full text-white max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-8 self-start text-4xl font-extrabold uppercase">
                    <h2 className="basis-auto">Barcelona</h2>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/eac60d3ab11855bb01e25313881be2f80fa765cb13733ab388d241041eb5d73f"
                      className="object-contain shrink-0 self-end mt-6 aspect-[1.7] w-[34px]"
                      alt="Barcelona logo"
                    />
                  </div>

                  <div className="flex flex-col items-start pl-16 mt-3.5 w-full font-medium max-md:pl-5 max-md:max-w-full">
                    <h2 className="self-end text-4xl font-bold uppercase">
                      Real Madrid
                    </h2>
                    <div className="flex relative flex-col px-11 py-2.5 mt-3.5 ml-11 text-sm whitespace-nowrap aspect-[2.972] max-md:px-5 max-md:ml-2.5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/6dc230a055fed537fda8ec996cb924611f8d2859f537f6507afe1018f8d2b004"
                        className="object-cover absolute inset-0 size-full"
                        alt="VS"
                      />
                      VS
                    </div>

                    <div className="flex gap-8 mt-6 text-lg">
                      <div className="flex gap-3">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/15d09842d77ffc917ac6be6627f0a40b3982fefb62b2de34d367243ef67f2f5f"
                          className="object-contain shrink-0 w-6 aspect-square"
                          alt="Time icon"
                        />
                        <time>5:00 PM</time>
                      </div>
                      <div className="flex gap-3 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/fb90ec83b05848351d015d39fffd85ef094402bc9dc27feab189cc42db75a82e"
                          className="object-contain shrink-0 w-6 aspect-square"
                          alt="Location icon"
                        />
                        <span>Spain</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex relative flex-col grow pt-36 pr-6 pb-8 pl-20 aspect-[1.24] rounded-[1000px_5px_5px_0px] max-md:px-5 max-md:pt-24">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/f2f0d07c92af475fbe73112240f82d7d/0b093f0142e2c50b39315f158705b1a929acc1a996129cc728210fdbb59882df"
                    className="object-cover absolute inset-0 size-full"
                    alt="Background"
                  />
                  <div className="relative self-end text-4xl leading-10 text-stone-950">
                    <span className="font-medium text-[29px]">Up To $50</span>
                    <br />
                    <span className="font-medium text-[32px]">
                      Free Matched Bet
                    </span>
                  </div>
                  <button className="relative self-center px-14 py-3.5 mt-7 ml-8 max-w-full text-lg font-medium text-white bg-stone-950 rounded-[100px] w-[180px] max-md:px-5">
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
