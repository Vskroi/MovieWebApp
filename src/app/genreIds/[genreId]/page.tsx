"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { useTheme } from "next-themes";
import { DynamicPaginat } from "@/components/DynamicPaginat";
import { MovieCard } from "@/components/movieCart";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { genreId } = useParams<{ genreId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const genreIDs = (searchParams.get("genres") || genreId).split(",");
  const key = "115ff36ff2575f01537accc67c1e0fa8";
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selected, setselected] = useState<string[]>([]);
  const [titles, setTitles] = useState<number>();
  const [totalPage, setTotalPage] = useState<number>(1);

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

  const moviegenre = async (selected: string[]) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en&with_genres=${selected}&page=${currentPage}`
      );
      const result = await response.json();
      setTitles(result.total_results);
      setMovies(result.results);
      setTotalPage(result.total_pages)
   

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const setSelectedGenre = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const updatedGenreIDs = [...genreIDs];
    if (updatedGenreIDs.includes(id)) {
      const filteredGenres = updatedGenreIDs.filter(
        (genreId) => genreId !== id
      );
      updatedGenreIDs.length = 0;
      updatedGenreIDs.push(...filteredGenres);
    } else {
      updatedGenreIDs.push(id);
    }
    params.set("genres", updatedGenreIDs.join(","));
    router.push(`?${params.toString()}`);
    setselected(updatedGenreIDs);
  };

  useEffect(() => {
    moviegenre(selected);
    fetchGenres();
  }, [selected]);
  useEffect(() => {
    fetchGenres();
    setSelectedGenre("");
    moviegenre(selected);
  }, []);

  if (loading) {
    return <p>is louding...</p>;
  }
  return (
    <>
      <Header></Header>
      <div className="h-fit w-full flex justify-start items-start gap-1">
        <div className="w-full justify-start items-start gap-5 flex">
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
                  className={`pl-2.5 pr-1 py-0.5 rounded-full border justify-center items-center gap-2 flex cursor-pointer hover:bg-gray-100 ${
                    selected.includes(genre.id.toString())
                      ? "bg-black text-white hover:bg-black"
                      : "bg-white text-black hover:bg-white"
                  }`}
                  onClick={() => setSelectedGenre(genre.id.toString())}
                >
                  <div className="text-xs font-semibold leading-none">
                    {genre.name}
                  </div>

                  <img
                    className="w-4 h-4 relative overflow-hidden"
                    src={` ${
                      selected.includes(genre.id.toString())
                        ? "../_cross-1.svg"
                        : "../vercelRight.svg"
                    }`}
                  />
                </Button>
              ))}
            </div>
          </div>
          <div className="w-[26px] h-[826px] py-4 justify-start items-start gap-2.5 inline-flex">
            <div className="self-stretch h-full border border-[#e3e3e7]"></div>
          </div>
          <div>
            <div className="text-zinc-950 text-xl font-semibold  leading-7">
              {titles} titles
            </div>

            <div className="w-[804px] h-fit  gap-6 relative mb-20">
              <div className="flex gap-6 mb-6">
                {movies.slice(0, 4).map((movie, index) => (
                  <MovieCard
                    key={`movie0-4-${index}`}
                    movie={movie}
                    isDark={isDark}
                  />
                ))}
              </div>
              <div className="flex gap-6 mb-6">
                {movies.slice(4, 8).map((movie, index) => (
                  <MovieCard
                    key={`movie4-8-${index}`}
                    movie={movie}
                    isDark={isDark}
                  />
                ))}
              </div>
              <div className="flex gap-6 mb-6">
                {movies.slice(8, 12).map((movie, index) => (
                  <MovieCard
                    key={`movie8-12-${index}`}
                    movie={movie}
                    isDark={isDark}
                  />
                ))}
              </div>
              <div className="flex gap-6 mb-6">
                {movies.slice(12, 16).map((movie, index) => (
                  <MovieCard
                    key={`movie12-16-${index}`}
                    movie={movie}
                    isDark={isDark}
                  />
                ))}
              </div>
              <div className="flex gap-6 mb-6">
                {movies.slice(16, 20).map((movie, index) => (
                  <MovieCard
                    key={`movie16-20-${index}`}
                    movie={movie}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>
            <DynamicPaginat total_page={totalPage}></DynamicPaginat>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
