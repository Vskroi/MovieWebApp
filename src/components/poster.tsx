import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ArrowRight } from "lucide-react";

export const Poster = ({
  moviee,
  GenreName,
  PageName,
  MovieDetail,
}: PosterProps) => {
  const {  theme } = useTheme();
  const isDark = theme === "dark";

  /*   const selectedMovie = moviee.find((m) => m.id === selectedMovieId);

  const movieGenres = selectedMovie
    ? genres.filter((g) => selectedMovie.genre_ids.includes(g.id))
    : [];
 */
  return (
    <>
      <div className="w-full xl:w-[1440px] flex-col relative inline-flex ">
        <div className="flex gap-5  w-full xl:w-[1440px] justify-between">
          <div
            className={`${
              isDark ? "text-white" : "text-black "
            } text-2xl font-semibold leading-loose relative left-[0px]`}
          >
            {GenreName}
          </div>
          <Link
            href={`/seeMore/${GenreName}`}
            className={`h-9 px-4 py-2 ${
              isDark ? "bg-black text-white" : "bg-white text-black"
            } rounded-md justify-center items-center gap-2 inline-flex`}
          >
            <div className=" text-xl font-medium leading-tight flex">See more
            <ArrowRight></ArrowRight>
            </div>
          
         

          </Link>
        </div>
        <div className="w-full xl:w-[1440px] justify-center items-center relative flex gap-6 xl:block">
          <div className="w-full xl:w-[1440px] block  justify-start items-start relative  xl:justify-between xl:mb-20 mx-[28px] xl:mx-[0px] grid gap-4 grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {moviee.slice(0, 10).map((m, index) => (
              <Link
                key={index}
                href={`/detail/${m.id}`}
                className={`h-[439px]  ${
                  isDark ? "bg-black text-white" : "bg-zinc-100 text-zinc-950"
                }  rounded-lg flex-col justify-start items-start gap-1 xl:inline-flex overflow-hidden`}
              >
                <img
                  className="w-full h-[340px] rounded-lg relative"
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
                        <img
                          className="h-[20px]"
                          src="../star.png"
                          alt="star"
                        />
                        <span className="text-xl font-medium leading-tight">
                          {m.vote_average.toString().slice(0, 3)}
                        </span>
                        <span className="text-zinc-500 font-normal leading-none">
                          /10
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                    <div className="grow shrink basis-0 text-lg font-normal leading-7 .break-words ">
                      {m.original_title}
                      <br />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
     
        </div>
      </div>
    </>
  );
};
