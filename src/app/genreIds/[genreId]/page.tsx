"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { useTheme } from "next-themes";
type Genre = {
  id: string;
  name: string;
};

type Movie = {
  original_title: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  release_date: number;
  id: number;
};

export default function Home() {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";
  const { genreId } = useParams<{ genreId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const genreIDs = (searchParams.get("genres") || genreId).split(",");
  const key = "115ff36ff2575f01537accc67c1e0fa8";
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selected, setselected] = useState<string[] >([]);
  const [titles, setTitles] = useState<number>()


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
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en&with_genres=${selected}&page=1`
      );
      const result = await response.json();
      setTitles(result.total_results)
      setMovies(result.results);

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
    setSelectedGenre('');
  }, []);
  

if(loading){
  return <p>is louding...</p>
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
                  className={`pl-2.5 pr-1 py-0.5 rounded-full border justify-center items-center gap-2 flex cursor-pointer hover:bg-gray-100 ${selected.includes(genre.id.toString()) ? 'bg-black text-white hover:bg-black' : 'bg-white text-black hover:bg-white'}`}
                  onClick={() => setSelectedGenre(genre.id.toString())}
                >
                  <div className="text-xs font-semibold leading-none">
                    {genre.name}
                  </div>
                  
                  <img
                    className="w-4 h-4 relative overflow-hidden"
                    src={` ${selected.includes(genre.id.toString()) ?  '../_cross-1.svg' : '../vercelRight.svg'}`}
                  />
                </Button>
              ))}
            </div>
          </div>
          <div className="w-[26px] h-[826px] py-4 justify-start items-start gap-2.5 inline-flex">
            <div className="self-stretch h-full border border-[#e3e3e7]"></div>
          </div>
          <div>
      <div className="text-zinc-950 text-xl font-semibold  leading-7">{titles} titles</div>
              <div className="w-[804px] h-fit flex justify-start items-start relative inline-flex justify-between mb-20" >
                {movies.slice(0, 4).map((m, index) => (
                  <Link
                    key={index}
                    href={`/detail/${m.id}`}
                    className={`h-[331px] w-[165px] ${isDark ? "bg-black text-white"  : "bg-zinc-100 text-zinc-950" }  rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden`}
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
                            <span className=" text-sm font-medium leading-tight">
                              {m.vote_average.toString().slice(0, 3)}
                            </span>
                            <span className="text-zinc-500 font-normal leading-none">/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                        <div className="grow shrink basis-0  text-lg font-normal leading-7">
                          {m.original_title}
                          <br />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="w-[804px] h-fit flex justify-start items-start relative inline-flex justify-between mb-20" >
                {movies.slice(4, 8).map((m, index) => (
                  <Link
                    key={index}
                    href={`/detail/${m.id}`}
                    className={`h-[331px] w-[165px] ${isDark ? "bg-black text-white"  : "bg-zinc-100 text-zinc-950" } rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden`}
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
                            <span className=" text-sm font-medium leading-tight">
                              {m.vote_average.toString().slice(0, 3)}
                            </span>
                            <span className="text-zinc-500 font-normal leading-none">/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                        <div className="grow shrink basis-0  text-lg font-normal leading-7">
                          {m.original_title}
                          <br />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="w-[804px] h-fit flex justify-start items-start relative inline-flex justify-between mb-20" >
                {movies.slice(8, 12).map((m, index) => (
                  <Link
                    key={index}
                    href={`/detail/${m.id}`}
                    className={`h-[331px] w-[165px] ${isDark ? "bg-black text-white"  : "bg-zinc-100 text-zinc-950" } rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden`}
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
                            <span className=" text-sm font-medium leading-tight">
                              {m.vote_average.toString().slice(0, 3)}
                            </span>
                            <span className="text-zinc-500 font-normal leading-none">/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                        <div className="grow shrink basis-0 text-lg font-normal leading-7">
                          {m.original_title}
                          <br />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                 
                
              </div>

              <div className="w-[804px] h-fit flex justify-start items-start relative inline-flex justify-between mb-20" >
                {movies.slice(12, 16).map((m, index) => (
                  <Link
                    key={index}
                    href={`/detail/${m.id}`}
                    className={`h-[331px] w-[165px] ${isDark ? "bg-black text-white"  : "bg-zinc-100 text-zinc-950" } rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden`}
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
                            <span className=" text-sm font-medium leading-tight">
                              {m.vote_average.toString().slice(0, 3)}
                            </span>
                            <span className="text-zinc-500 font-normal leading-none">/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                        <div className="grow shrink basis-0  text-lg font-normal leading-7">
                          {m.original_title}
                          <br />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                 
                
              </div>

              <div className="w-[804px] h-fit flex justify-start items-start relative inline-flex justify-between mb-20" >
                {movies.slice(16, 20).map((m, index) => (
                  <Link
                    key={index}
                    href={`/detail/${m.id}`}
                    className={`h-[331px] w-[165px] ${isDark ? "bg-black text-white"  : "bg-zinc-100 text-zinc-950" } rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden`}
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
                            <span className=" text-sm font-medium leading-tight">
                              {m.vote_average.toString().slice(0, 3)}
                            </span>
                            <span className="text-zinc-500 font-normal leading-none">/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                        <div className="grow shrink basis-0  text-lg font-normal leading-7">
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
      <Footer></Footer>
    </>
  );
}
