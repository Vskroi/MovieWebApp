"use client";

import ReactPlayer from "react-player";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils";
import { useTheme } from "next-themes";
import { PlayIcon } from "lucide-react";

export const Slide = ({ movie }: { movie: movieNowPlaying }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [movieVideo, setMovieVideo] = useState<string>("");
  const key = "115ff36ff2575f01537accc67c1e0fa8";
  const trailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${key}&language=en-US`
      );
      const result = await response.json();
      setMovieVideo(result.results[0].key);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(movieVideo);
  useEffect(() => {
    /*  fetchData(`/movie/${movie.id}/videos?language=en-US`).then((response) => {
      setMovieVideo(response?.results[0]?.key);

    });  */
    trailer();
  }, []);

  return (
    <div className="relative w-full h-[510px] overflow-hidden cursor-pointer">
      <img
        className="relative xl:top-[-200px] hidden xl:block"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        loading="lazy"
        sizes="100vw"
      />
      <img
        className="relative h-[246px] lg:h-[380px] w-full block xl:hidden"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
        loading="lazy"
        sizes="100vw"
      />
      <div
        className={` h-[375px] text-black xl:text-white xl:h-[264px] w-full xl:w-[404px] absolute xl:top-[182px] xl:left-[140px] text-white flex-col justify-start items-start gap-4 inline-flex mx-8 xl:mx-[0px]`}
      >
        <h1
          className={`w-fit  ${
            isDark ? "text-white" : "text-black"
          } xl:text-white font-normal leading-normal`}
        >
          Now Playing:
        </h1>
        <div className={` xl:flex-col  justify-start items-start flex`}>
          <p
            className={`w-fit ${
              isDark ? "text-white" : "text-black"
            } xl:text-white  text-4xl font-bold font-['Inter'] leading-10`}
          >
            {movie.original_title}
          </p>
          <p
            className={`flex  ${
              isDark ? "text-white" : "text-black"
            } xl:text-white text-lg font-semibold leading-7`}
          >
            <img src="star.png" alt="" />
            {movie.vote_average.toString().slice(0, 3)}
            <span className="text-zinc-500 text-base font-normal leading-normal">
              /10
            </span>
          </p>
        </div>
        <p
          className={` w-[90%] pr-8  lg:pr-0 xl:w-[302px] ${
            isDark ? "text-white" : "text-black"
          } xl:text-white h-[100px] lg:h-[40px] xl:h-[80px] text-[16px] xl:text-[12px] font-normal leading-none`}
        >
          {movie.overview}
        </p>

        <Dialog>
          <DialogTrigger>
            <div className="text-secondary-foreground text-white xl:text-black bg-black xl:bg-background px-2 py-1 rounded-md flex gap-2">
              <PlayIcon className="block xl:hidden" stroke="white"></PlayIcon>    <PlayIcon className="hidden xl:block" stroke="black"></PlayIcon>
              Watch trailer
            </div>
          </DialogTrigger>
          <DialogContent className="w-fit max-w-screen">
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${movieVideo}`}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
