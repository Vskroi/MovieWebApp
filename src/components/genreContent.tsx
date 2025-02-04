import { useState, useEffect } from "react";
import { Button } from "./ui/button";

import { GenreMovies } from "./ganremovies";
type Props = {
  movies: {
    original_title: string;
    poster_path: string;
    title: string;
    overview: string;
    vote_average: number;
  }[];
  genres:{
    id: string;
    name: string;
  }[],
}
export const GenreContent = ( {genres ,movies} : Props) => {

  return (
    <>
      <div className="h-fit w-fit felx justify-start items-start gap-1">
        <div className="w-[387px] h-[352px] flex-col justify-start items-start gap-5 inline-flex">
          <div className="h-[60px] flex-col justify-start items-start gap-1 flex">
            <div className="self-stretch text-zinc-950 text-2xl font-semibold leading-loose">
              Genres
            </div>
            <div className="self-stretch text-zinc-950 text-base font-normal fleading-normal">
              See lists of movies by genre
            </div>
          </div>
          <div className="w-[387px]  flex-wrap self-stretch justify-start items-start gap-4 inline-flex">
            {genres.map((nameId, index) => (
              <Button
                key={index}
 /*                onClick={() => handleGenreSelect(nameId.id)} */
                className="pl-2.5 pr-1 py-0.5 rounded-full border border-[#e3e3e7] justify-center items-center gap-2 flex cursor-pointer  hover:bg-gray-100 bg-white"
              >
                <div className="text-zinc-950 text-xs font-semibold  leading-none">
                  {nameId.name}
                </div>
                <img
                  className="w-4 h-4 relative  overflow-hidden"
                  src="vercelRight.svg"
                />
              </Button>
            ))}
          </div>
        </div>
        <GenreMovies moviee={movies} GenreName="" />
      </div>
    </>
  );
};
