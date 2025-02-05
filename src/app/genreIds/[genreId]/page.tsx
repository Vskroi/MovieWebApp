"use client";
import { useState, useEffect, useReducer } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from 'next/router';
import Link from "next/link";
interface Genre {
  id: string;
  name: string;
}

interface Movie {
  original_title: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  release_date: number;
  id: number;
}

export default function Home() {


  const search = useSearchParams();
 

  const { genreId } = useParams<{ genreId: string }>();
  const key = "115ff36ff2575f01537accc67c1e0fa8";
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const ganers  = search.get("ganers");
  console.log(ganers , 'is search')
  console.log(selectedGenre)
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

  const moviegenre = async (genreId: string | number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en&with_genres=${genreId}&page=${page}`
      );
      const result = await response.json();

      setMovies(result.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    moviegenre(genreId);
  }, [genreId]);

  useEffect(() => {
    if (selectedGenre) {
      localStorage.setItem("genre", selectedGenre);
      moviegenre(selectedGenre);
    }
  }, [selectedGenre, page]);

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div className="h-fit w-full flex justify-start items-start gap-1">
      <div className="w-full justify-start items-start gap-5  flex">
        <div className="w-[387px] h-[352px] flex-col justify-start items-start gap-5 inline-flex">
          <div className="h-[60px] w-fit flex-col justify-start items-start gap-1 flex">
            <div className="self-stretch text-zinc-950 text-2xl font-semibold leading-loose">
              Genres
            </div>
            <div className="self-stretch text-zinc-950 text-base font-normal leading-normal">
              See lists of movies by genre
            </div>
          </div>
          <div className="w-[387px] flex-wrap self-stretch justify-start items-start gap-4 inline-flex">
            {genres.map((genre) => (
              <Button
                key={genre.id}
                className={`pl-2.5 pr-1 py-0.5 rounded-full bg-white border justify-center items-center gap-2 flex cursor-pointer hover:bg-gray-100`}
                onClick={() => setSelectedGenre(genre.id.toString())}
              >
                <div className="text-zinc-950 text-xs font-semibold leading-none">
                  {genre.name}
                </div>
              </Button>
            ))}
          </div>
        </div>
        <div className="w-[26px] h-[826px] py-4 justify-start items-start gap-2.5 inline-flex">
    <div className="self-stretch h-full border border-[#e3e3e7]"></div>
</div>
<div>
        <div className="w-[804px] h-fit flex justify-start items-start relative inline-flex justify-between mb-20">
          {movies.slice(0, 4).map((m, index) => (
            <Link
              key={index}
              href={`/detail/${m.id}`}
              className="h-[331px] w-[165px] bg-zinc-100 rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden"
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
                      <img className="h-[20px]" src="../star.png" alt="star" />
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
            </Link>
          ))}
          
        </div>
        <div className="w-[804px] h-fit flex justify-start items-start relative inline-flex justify-between mb-20">
          {movies.slice(4, 8).map((m, index) => (
            <Link
              key={index}
              href={`/detail/${m.id}`}
              className="h-[331px] w-[165px] bg-zinc-100 rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden"
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
                      <img className="h-[20px]" src="../star.png" alt="star" />
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
            </Link>
          ))}
          
        </div>
        <div className="w-[804px] h-fit flex justify-start items-start relative inline-flex justify-between mb-20">
          {movies.slice(8, 12).map((m, index) => (
            <Link
              key={index}
              href={`/detail/${m.id}`}
              className="h-[331px] w-[165px] bg-zinc-100 rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden"
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
                      <img className="h-[20px]" src="../star.png" alt="star" />
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
            </Link>
          ))}
          
        </div>
        <div className="w-[804px] h-fit flex justify-start items-start relative inline-flex justify-between mb-20">
          {movies.slice(12, 16).map((m, index) => (
            <Link
              key={index}
              href={`/detail/${m.id}`}
              className="h-[331px] w-[165px] bg-zinc-100 rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden"
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
                      <img className="h-[20px]" src="../star.png" alt="star" />
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
            </Link>
          ))}
          
        </div>
        <div className="w-[804px] h-fit flex justify-start items-start relative inline-flex justify-between mb-20">
          {movies.slice(16, 20).map((m, index) => (
            <Link
              key={index}
              href={`/detail/${m.id}`}
              className="h-[331px] w-[165px] bg-zinc-100 rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden"
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
                      <img className="h-[20px]" src="../star.png" alt="star" />
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
            </Link>
          ))}
          
        </div>
        
        </div>
      </div>
    </div>
  );
}
