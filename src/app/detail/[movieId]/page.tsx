"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  original_title: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  id: number;
  genre_ids: number[];
  release_date: string;
  vote_count: number;
};

type MovieCredits = {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string;
    known_for_department: string;
  }[];
  crew: {
    name: string;
  };
};

export default function Home() {
  const { movieId } = useParams<{ movieId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [movieCredits, setMovieCredits] = useState<MovieCredits>();
  const [trailer, setTrailer] = useState<string | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
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
      setMovieCredits(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMovieTrailer = async (movieId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=en-US`
      );
      const result = await response.json();
      const trailerId = result.results[0].key;
      setTrailer(trailerId);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMovieSimilar = async (movieId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${key}&language=en-US&page=1`
      );
      const result = await response.json();

      setSimilarMovies(result.results);
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
    fetchMovieTrailer(movieIdInt);
    fetchMovieSimilar(movieIdInt);
  }, [movieId]);

  const selectedMovie = movies.find((m) => m.id === selectedMovieId);

  const [step, setStep] = useState<number>();

  const movieGenres = selectedMovie
    ? genres.filter((g) => selectedMovie.genre_ids.includes(g.id))
    : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedMovie) {
    return null;
  }

  return (
    <>
      <Header setStep={setStep}></Header>
      <div className="w-full h-fit inline-flex flex-col justify-center items-center p-8 bg-white rounded-lg shadow-lg">
        <div className="h-[72px] w-[1080px] pr-3 justify-between items-center inline-flex">
          <div className="w-fit flex-col justify-start items-start gap-1 inline-flex">
            <div className="text-zinc-950 text-4xl font-bold leading-10">
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
        <div className="w-[1080px]  flex justify-between">
          <img
            className="w-[290px] h-[428px] object-cover mb-4"
            src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
          />

          <iframe
            className="w-[760px] h-[428px]"
            src={`https://www.youtube.com/embed/${trailer}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-[1080px] h-[271px] flex-col justify-start items-start gap-5 inline-flex">
          <div className="flex gap-5">
            {movieGenres.map((g, index) => (
              <Link
                href={`/detail/${g.id}`}
                key={`genreMovie${index}`}
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

                <div className="text-zinc-950 text-base font-normal leading-normal">
                  {/*      {movieCredits?.crew[0].name} */}
                </div>
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
                <div className="text-zinc-950 text-base font-normal leading-normal"></div>
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
        <div className="w-[1080px] h-[440.38px] flex-col justify-start items-start gap-8 inline-flex overflow-hidden">
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="w-[198px] text-zinc-950 text-2xl font-semibold leading-loose">
              More like this
            </div>
            <div className="px-4 py-2 bg-white rounded-md justify-center items-center gap-2 flex">
              <div className="text-zinc-950 text-sm font-medium  leading-tight">
                See more
              </div>
              <div className="w-4 h-4 relative  overflow-hidden"></div>
            </div>
          </div>
          <div className="w-[1080px] flex justify-start items-start relative inline-flex justify-between">
            {similarMovies.slice(0, 5).map((m, index) => (
              <Link
                href={`/detail/${m.id}`}
                key={`$similarMovie${index}`}
                className="w-[190px] h-[372.38px] bg-zinc-100 rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden"
              >
                <img
                  className="w-[190px] h-[281.38px] relative"
                  src={`https://image.tmdb.org/t/p/original/${m.poster_path}`}
                  alt={m.title}
                />
                <div className="h-[87px] px-2 py-1 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[23px] justify-start items-start gap-1 inline-flex">
                    <div className="h-[18px] pt-0.5 justify-start items-center gap-2.5 flex">
                      <div className="h-4 relative  overflow-hidden"></div>
                    </div>
                    <div className="grow shrink basis-0 self-stretch justify-start items-start flex">
                      <div className="flex">
                        <img
                          className="h-[20px]"
                          src="../star.png"
                          alt="star"
                        />
                        <span className="text-zinc-950 text-sm font-medium leading-tight">
                          {m.vote_average.toString().slice(0, 3)}
                        </span>
                        <span className="text-zinc-500 text-xs font-normal leading-none">
                          /10
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="justify-center items-center gap-2.5 inline-flex">
                    <div className="text-zinc-950 text-lg font-normal leading-7">
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
      <Footer></Footer>
    </>
  );
}
