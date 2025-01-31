import { title } from "process";
import { Button } from "./ui/button";

type Props = {
  moviee: {
    original_title: string;
    poster_path: string;
    title: string;
    overview: string;
    vote_average: number;
  }[];
  GenreName: string;
};

export const GenreMovies = ({ moviee, GenreName }: Props) => {
  return (
    <>
      <div className="w-[804px] flex-col relative inline-flex">
        <div className="flex gap-5 ">
          <div className="text-zinc-950 text-2xl font-semibold leading-loose relative left-[0px]">
            {GenreName}
          </div>
          <Button className="bg-white"></Button>
        </div>
      </div>
      <div className="w-[804px] justify-center items-center relative">
        <div className="w-[804px] flex justify-start items-start relative  justify-between mb-20">
          {moviee.slice(0, 4).map((m, index) => (
            <div
              key={index}
              className="h-[439px] bg-zinc-100 rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden"
            >
              <img
                className="w-[229.73px] h-[340px] relative"
                src={`https://image.tmdb.org/t/p/original/${m.poster_path}`}
                alt={m.title}
              />
              <div className="self-stretch h-[95px] p-2 flex-col justify-start items-start flex">
                <div className="self-stretch h-[23px] justify-start items-start gap-1 inline-flex">
                  <div className="h-[18px] pt-0.5 justify-start items-center gap-2.5 flex">
                    <div className="h-4 relative overflow-hidden"></div>
                  </div>
                  <div className="grow shrink basis-0 self-stretch justify-start items-start flex">
                    <div className="flex">
                      <img className="h-[20px]" src="star.png" alt="star" />
                      <span className="text-zinc-950 text-sm font-medium leading-tight">
                        {m.vote_average.toString().slice(0, 3)}
                      </span>
                      <span className="text-zinc-500 font-normal leading-none">
                        /10
                      </span>
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                  <div className="grow shrink basis-0 text-zinc-950 text-lg font-normal leading-7">
                    {m.original_title}
                    <br />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[804px] flex justify-start items-start relative  justify-between mb-20">
          {moviee.slice(4, 8).map((m, index) => (
            <div
              key={index}
              className="h-[439px] bg-zinc-100 rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden"
            >
              <img
                className="w-[229.73px] h-[340px] relative"
                src={`https://image.tmdb.org/t/p/original/${m.poster_path}`}
                alt={m.title}
              />
              <div className="self-stretch h-[95px] p-2 flex-col justify-start items-start flex">
                <div className="self-stretch h-[23px] justify-start items-start gap-1 inline-flex">
                  <div className="h-[18px] pt-0.5 justify-start items-center gap-2.5 flex">
                    <div className="h-4 relative overflow-hidden"></div>
                  </div>
                  <div className="grow shrink basis-0 self-stretch justify-start items-start flex">
                    <div className="flex">
                      <img className="h-[20px]" src="star.png" alt="star" />
                      <span className="text-zinc-950 text-sm font-medium leading-tight">
                        {m.vote_average.toString().slice(0, 3)}
                      </span>
                      <span className="text-zinc-500 font-normal leading-none">
                        /10
                      </span>
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                  <div className="grow shrink basis-0 text-zinc-950 text-lg font-normal leading-7">
                    {m.original_title}
                    <br />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[804px] flex justify-start items-start relative  justify-between mb-20">
          {moviee.slice(8, 12).map((m, index) => (
            <div
              key={index}
              className="h-[439px] bg-zinc-100 rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden"
            >
              <img
                className="w-[229.73px] h-[340px] relative"
                src={`https://image.tmdb.org/t/p/original/${m.poster_path}`}
                alt={m.title}
              />
              <div className="self-stretch h-[95px] p-2 flex-col justify-start items-start flex">
                <div className="self-stretch h-[23px] justify-start items-start gap-1 inline-flex">
                  <div className="h-[18px] pt-0.5 justify-start items-center gap-2.5 flex">
                    <div className="h-4 relative overflow-hidden"></div>
                  </div>
                  <div className="grow shrink basis-0 self-stretch justify-start items-start flex">
                    <div className="flex">
                      <img className="h-[20px]" src="star.png" alt="star" />
                      <span className="text-zinc-950 text-sm font-medium leading-tight">
                        {m.vote_average.toString().slice(0, 3)}
                      </span>
                      <span className="text-zinc-500 font-normal leading-none">
                        /10
                      </span>
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                  <div className="grow shrink basis-0 text-zinc-950 text-lg font-normal leading-7">
                    {m.original_title}
                    <br />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[804px] flex justify-start items-start relative  justify-between mb-20">
          {moviee.slice(12, 16).map((m, index) => (
            <div
              key={index}
              className="h-[439px] bg-zinc-100 rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden"
            >
              <img
                className="w-[229.73px] h-[340px] relative"
                src={`https://image.tmdb.org/t/p/original/${m.poster_path}`}
                alt={m.title}
              />
              <div className="self-stretch h-[95px] p-2 flex-col justify-start items-start flex">
                <div className="self-stretch h-[23px] justify-start items-start gap-1 inline-flex">
                  <div className="h-[18px] pt-0.5 justify-start items-center gap-2.5 flex">
                    <div className="h-4 relative overflow-hidden"></div>
                  </div>
                  <div className="grow shrink basis-0 self-stretch justify-start items-start flex">
                    <div className="flex">
                      <img className="h-[20px]" src="star.png" alt="star" />
                      <span className="text-zinc-950 text-sm font-medium leading-tight">
                        {m.vote_average.toString().slice(0, 3)}
                      </span>
                      <span className="text-zinc-500 font-normal leading-none">
                        /10
                      </span>
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                  <div className="grow shrink basis-0 text-zinc-950 text-lg font-normal leading-7">
                    {m.original_title}
                    <br />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        </div>
      
    </>
  );
};
