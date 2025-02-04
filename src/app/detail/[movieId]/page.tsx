"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  original_title: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  id: number;
  genre_ids: number[];
  release_date: string;
  vote_count: number;
}

interface MovieCredits {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string;
    known_for_department:string;
  }[];
}

export default function Home() {
  const { movieId } = useParams<{ movieId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [movieCredits, setMovieCredits] = useState<MovieCredits>();
  const key = "115ff36ff2575f01537accc67c1e0fa8";

  const fetchMovies = async (category: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${key}&language=en-US&page=1`
      );
      const result = await response.json();
      return result.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en`
      );
      const result = await response.json();
      setGenres(result.genres);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMovieCredits = async (movieId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}&language=en-US`
      );
      const result = await response.json();
      console.log(result);
      setMovieCredits(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!movieId) return;

    const movieIdInt = parseInt(movieId, 10);
    setSelectedMovieId(movieIdInt);

    fetchGenres();

    const fetchData = async () => {
      const popularMovies = await fetchMovies("popular");
      const upcomingMovies = await fetchMovies("upcoming");
      const nowPlayingMovies = await fetchMovies("now_playing");
      const topRatedMovies = await fetchMovies("top_rated");

      setMovies([
        ...popularMovies,
        ...upcomingMovies,
        ...nowPlayingMovies,
        ...topRatedMovies,
      ]);
      setLoading(false);
    };

    fetchData();
    fetchMovieCredits(movieIdInt);
  }, [movieId]);

  const selectedMovie = movies.find((m) => m.id === selectedMovieId);
  const allWritingDepartment = movieCredits?.cast.filter((m) => 
    m.known_for_department?.toLowerCase().includes('writing')
  );
  


console.log(allWritingDepartment)
  const movieGenres = selectedMovie
    ? genres.filter((g) => selectedMovie.genre_ids.includes(g.id))
    : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedMovie) {
    return;
  }

  return (
    <div className="w-full h-full p-8 bg-white rounded-lg shadow-lg">
      <div className="h-[72px] w-full pr-3 justify-between items-center inline-flex">
        <div className="w-[211px] flex-col justify-start items-start gap-1 inline-flex">
          <div className="self-stretch text-zinc-950 text-4xl font-bold leading-10">
            {selectedMovie.original_title}
          </div>
          <div className="self-stretch text-zinc-950 text-lg font-normal leading-7">
            {selectedMovie.release_date}
          </div>
        </div>
        <div className="flex-col justify-start items-start inline-flex">
          <div className="self-stretch text-zinc-950 text-xs font-medium leading-none">
            Rating
          </div>
          <div className="self-stretch h-12 justify-start items-center gap-1 inline-flex">
            <div className="self-stretch pt-2 justify-start items-start gap-2.5 flex">
              <div className="w-7 h-7 relative overflow-hidden"></div>
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="flex">
                <span>
                  <img src="star.png" alt="" />
                </span>
                <span className="text-zinc-950 text-lg font-semibold leading-7">
                  {selectedMovie.vote_average.toString().slice(0, 3)}
                </span>
                <span className="text-zinc-500 text-base font-normal leading-normal">
                  /10
                </span>
              </div>
              <div className="flex-col justify-center items-center gap-2.5 flex">
                <div className="text-zinc-500 text-xs font-normal leading-none">
                  {selectedMovie.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="w-[300px] h-[450px] object-cover mb-4"
        src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
        alt={selectedMovie.title}
      />
      <div className="w-[1080px] h-[271px] flex-col justify-start items-start gap-5 inline-flex">
        <div className="flex gap-5">
          {movieGenres.map((g, index) => (
            <Link
              href={`/detail/${g.id}`}
              key={index}
              className="h-5 justify-start items-start inline-flex"
            >
              <div className="px-2.5 py-0.5 rounded-full border border-[#e3e3e7] justify-start items-start flex">
                <div className="text-zinc-950 text-xs font-semibold leading-none">
                  {g.name}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="justify-start items-center gap-3 inline-flex"></div>
        <div className="self-stretch text-zinc-950 text-base font-normal leading-normal">
          {selectedMovie.overview}
        </div>

        <div className="self-stretch h-[163px] flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch h-[41px] flex-col justify-start items-start gap-1 flex">
            <div className="self-stretch justify-start items-center gap-[53px] inline-flex">
              <div className="text-zinc-950 text-base font-bold leading-7">
                Director
              </div>
              {movieCredits?.cast.slice(0, 3).map((name, index) => (
                <div
                  key={index}
                  className="text-zinc-950 text-base font-normal leading-normal"
                >
                  {name?.name}
                </div>
              ))}
            </div>
            <div className="self-stretch h-[9px] py-1 flex-col justify-start items-start gap-2.5 flex">
              <div className="self-stretch h-px border border-[#e3e3e7]"></div>
            </div>
          </div>
          <div className="self-stretch h-[41px] flex-col justify-start items-start gap-1 flex">
            <div className="self-stretch justify-start items-center gap-[53px] inline-flex">
              <div className="w-16 text-zinc-950 text-base font-bold leading-7">
                Writers
              </div>
              <div className="text-zinc-950 text-base font-normal leading-normal">
                Winnie Holzman · Dana Fox · Gregory Maguire
              </div>
            </div>
            <div className="self-stretch h-[9px] py-1 flex-col justify-start items-start gap-2.5 flex">
              <div className="self-stretch h-px border border-[#e3e3e7]"></div>
            </div>
          </div>
          <div className="self-stretch h-[41px] flex-col justify-start items-start gap-1 flex">
            <div className="self-stretch justify-start items-center gap-[53px] inline-flex">
              <div className="w-16 text-zinc-950 text-base font-bold leading-7">
                Stars
              </div>
              <div className="text-zinc-950 text-base font-normal flex leading-normal">
                {movieCredits?.cast.slice(0, 3).map((name, index) => (
                  <div
                    key={index}
                    className="text-zinc-950 text-base font-normal leading-normal"
                  >
                    {name?.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="self-stretch h-[9px] py-1 flex-col justify-start items-start gap-2.5 flex">
              <div className="self-stretch h-px border border-[#e3e3e7]"></div>
            </div>
          </div>
        </div>
      </div>
      <Link href={`/`} className="mt-4 bg-red-500 text-white">
        Close Details
      </Link>
    </div>
  );
}
