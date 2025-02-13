export const Footer = () => {
  return (
    <div className="w-full h-fit lg:h-[280px] bg-indigo-700 justify-center items-start gap-12 inline-flex">
      <div className="w-full xl:w-[1440px] h-fit  py-10 bg-indigo-700 justify-center items-start gap-12 inline-flex">
        <div className="lg;grow lg:shrink lg:basis-0 h-fit lg:justify-start lg:items-start lg:gap-[120px] lg:flex">
          <div className="self-stretch flex-col justify-start items-start gap-10 inline-flex">
            <div className="flex-col justify-start items-start gap-3 block lg:flex">
              <div className="h-5 justify-start items-center gap-2 inline-flex">
                <img src="../filmWhite.svg" alt="Logo" />
                <p className="text-white text-base m-2 lg:m-[0px] font-bold lg:leading-tight lg:tracking-tight">
                  Movie Z
                </p>
              </div>
              <div className="text-neutral-50 text-xl  m-2 lg:m-[0px] font-normal vleading-tight">
                © 2024 Movie Z. All Rights Reserved.
              </div>
            </div>
          </div>
          <div className=" lg:grow lg:shrink basis-0 h-fit justify-end items-start gap-32 flex">
            <div className="h-fit  flex-col justify-start items-start gap-3 inline-flex">
              <div className="self-stretch text-neutral-50 lg:text-xl font-normal lg:leading-tight  m-2 lg:m-[0px] ">
                Contact Information
              </div>
              <div className="flex-col justify-start items-start gap-6 flex">
                <div className="justify-start items-center gap-3 inline-flex">
                  <div className=" h-4 relative  overflow-hidden"></div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <div className="text-neutral-50 lg:text-xl lg:font-medium lg:leading-tight  m-2 lg:m-[0px]">
                      Email:
                    </div>
                    <div className="text-neutral-50 lg:text-xl lg:font-normal lg:leading-tight  m-2 lg:m-[0px]">
                      support@movieZ.com
                    </div>
                  </div>
                </div>
                <div className="justify-start items-center gap-3 inline-flex">
                  <div className="w-4 h-4 relative  overflow-hidden"></div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <div className="text-neutral-50 lg:text-xl font-medium lg:leading-tight  m-2 lg:m-[0px]">
                      Phone:
                    </div>
                    <div className="text-neutral-50 lg:text-xl font-normal lg:leading-tight  m-2 lg:m-[0px]">
                      +976 (11) 123-4567
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="block xl:flex-col justify-start items-start xl:inline-flex">
              <div className="text-neutral-50 lg:text-xl font-normal lg:leading-tight  m-2 lg:m-[0px]">
                Follow us{" "}
              </div>
              <div className="justify-start items-center gap-3 xl:inline-flex">
                <div className="text-neutral-50 lg:text-xl font-medium lg:leading-tight  m-2 lg:m-[0px]">
                  Facebook
                </div>
                <div className="text-neutral-50 lg:text-xl font-medium lg:leading-tight  m-2 lg:m-[0px]">
                  Instagram
                </div>
                <div className="text-neutral-50 lg:text-xl font-medium lg:leading-tight  m-2 lg:m-[0px]">
                  Twitter
                </div>
                <div className="text-neutral-50 lg:text-xl font-medium lg:leading-tight  m-2 lg:m-[0px]">
                  Youtube
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
