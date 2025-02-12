export const Footer = () => {
  return (
    <div className="w-full h-[280px] bg-indigo-700 justify-center items-start gap-12 inline-flex">
        <div className="w-full xl:w-[1440px] h-[280px] py-10 bg-indigo-700 justify-center items-start gap-12 inline-flex">
      <div className="grow shrink basis-0 h-[200px] justify-start items-start gap-[120px] flex">
        <div className="self-stretch flex-col justify-start items-start gap-10 inline-flex">
          <div className="flex-col justify-start items-start gap-3 flex">
          <div className="h-5 justify-start items-center gap-2 inline-flex">
            <img src="../filmWhite.svg" alt="Logo" />
            <p className="text-white text-base font-bold leading-tight tracking-tight">
              Movie Z
            </p>
          </div>
            <div className="text-neutral-50 text-xl font-normal leading-tight">
              © 2024 Movie Z. All Rights Reserved.
            </div>
          </div>
        </div>
        <div className="grow shrink basis-0 h-[200px] justify-end items-start gap-24 flex">
          <div className="h-[200px] flex-col justify-start items-start gap-3 inline-flex">
            <div className="self-stretch text-neutral-50 text-xl font-normal leading-tight">
              Contact Information
            </div>
            <div className="flex-col justify-start items-start gap-6 flex">
              <div className="justify-start items-center gap-3 inline-flex">
                <div className="w-4 h-4 relative  overflow-hidden"></div>
                <div className="flex-col justify-start items-start inline-flex">
                  <div className="text-neutral-50 text-xl font-medium leading-tight">
                    Email:
                  </div>
                  <div className="text-neutral-50 text-xl font-normal leading-tight">
                    support@movieZ.com
                  </div>
                </div>
              </div>
              <div className="justify-start items-center gap-3 inline-flex">
                <div className="w-4 h-4 relative  overflow-hidden"></div>
                <div className="flex-col justify-start items-start inline-flex">
                  <div className="text-neutral-50 text-xl font-medium leading-tight">
                    Phone:
                  </div>
                  <div className="text-neutral-50 text-xl font-normal leading-tight">
                    +976 (11) 123-4567
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block xl:flex-col justify-start items-start gap-3 xl:inline-flex">
            <div className="text-neutral-50 text-xl font-normal leading-tight">
              Follow us{" "}
            </div>
            <div className="justify-start items-center gap-3 xl:inline-flex">
              <div className="text-neutral-50 text-xl font-medium leading-tight">
                Facebook
              </div>
              <div className="text-neutral-50 text-xl font-medium leading-tight">
                Instagram
              </div>
              <div className="text-neutral-50 text-xl font-medium leading-tight">
                Twitter
              </div>
              <div className="text-neutral-50 text-xl font-medium leading-tight">
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
