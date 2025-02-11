import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { PaginationDemo } from "./ui/dynamicPagination";
import { ArrowRight } from "lucide-react";

export const Poster = ({
  moviee,
  GenreName,
  PageName,
  MovieDetail,
}: PosterProps) => {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";
  const key = "115ff36ff2575f01537accc67c1e0fa8";
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en`
      );
      const result = await response.json();
      setGenres(result.genres);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
    const storedData = localStorage.getItem("selectedMovieId");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSelectedMovieId(parsedData);
    }
  }, []);
  /*   const selectedMovie = moviee.find((m) => m.id === selectedMovieId);

  const movieGenres = selectedMovie
    ? genres.filter((g) => selectedMovie.genre_ids.includes(g.id))
    : [];
 */
  return (
    <>
      <div className="w-full sm:w-[1440px] flex-col relative inline-flex">
        <div className="flex gap-5  w-[640px] sm:w-[1440px] justify-between">
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
            <div className=" text-sm font-medium leading-tight flex">See more
            <ArrowRight></ArrowRight>
            </div>
          
         

          </Link>
        </div>
        <div className="w-full sm:w-[1440px] justify-center items-center relative">
          <div className="w-full sm:w-[1440px] sm:flex justify-start items-start relative sm:inline-flex sm:justify-between mb-20">
            {moviee.slice(0, 5).map((m, index) => (
              <Link
                key={index}
                href={`/detail/${m.id}`}
                className={`h-[439px]  ${
                  isDark ? "bg-black text-white" : "bg-zinc-100 text-zinc-950"
                } rounded-lg flex-col justify-start items-start gap-1 sm:inline-flex overflow-hidden`}
              >
                <img
                  className="w-full h-[340px] relative"
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
                        <span className="text-sm font-medium leading-tight">
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
          <div className="sm:flex justify-between">
            {moviee.slice(5, 10).map((m, index) => (
              <Link
                key={index}
                href={`/detail/${m.id}`}
                className={`h-[439px]  ${
                  isDark ? "bg-black text-white" : "bg-zinc-100 text-zinc-950"
                } rounded-lg flex-col justify-start items-start gap-1 sm:inline-flex overflow-hidden`}
              >
                <img
                  className="w-full h-[340px] relative"
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
                        <span className=" text-sm  font-medium leading-tight">
                          {m.vote_average.toString().slice(0, 3)}
                        </span>
                        <span className="text-zinc-500 font-normal leading-none">
                          /10
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                    <div className="grow w-[209px] shrink basis-0  text-lg font-normal leading-7 .break-words ">
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
