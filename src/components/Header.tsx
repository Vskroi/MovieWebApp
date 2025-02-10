import { GenreContent } from "./genreContent";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useTheme } from "next-themes";
type HeaderData = {
  darkLightMode: string;
  darkLigthTest: boolean;
  ganreSearch: boolean;
  page: string;
  movies: {
    original_title: string;
    poster_path: string;
    title: string;
    overview: string;
    vote_average: number;
  }[];
}

type Genre = {
  id: string;
  name: string;
}

type Movie = {
  original_title: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  release_date: number;
  id: number;
}
import React from "react";
import { DarkModeButton } from "./layout/header/darkModeButton";
import { ChevronDown } from "lucide-react";


type HeaderProps = {
  setStep?: (step: number) => void;
}

export const Header = ({ setStep }: HeaderProps) => {

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const key = "115ff36ff2575f01537accc67c1e0fa8";
  const [movie, setMovie] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [headerData, setHeaderData] = useState<HeaderData>({
    darkLightMode: "moon.svg",
    darkLigthTest: false,
    ganreSearch: false,
    movies: [],
    page: "1",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const darkLightMode = () => {
    setHeaderData((prev) => ({
      ...prev,
      darkLightMode: prev.darkLigthTest ? "moon.svg" : "whitemoon.svg",
      darkLigthTest: !prev.darkLigthTest, 
    }));
  };
  

  const toggleGenreSearch = () => {
    setHeaderData((prev) => ({
      ...prev,
      ganreSearch: !prev.ganreSearch,
    }));
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
    } finally {
      setLoading(false);
    }
  };

  const onSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    handleSearchMovie(event.target.value);
  };

  useEffect(() => {
    fetchGenres();
    handleSearchMovie(searchValue);
 
  }, []);

  const handleGenreSelect = (genreId: string) => {
    const jsonData = JSON.stringify(2);
    localStorage.setItem("genre", jsonData);
    
    const jsonGenreData = JSON.stringify(genreId);
    localStorage.setItem("genreId", jsonGenreData);
    const parsedData = localStorage.getItem("genreId");
    setSelectedGenre(parsedData);
  };

  const moviegenre = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en&with_genres=${selectedGenre}&page=1`
      );
      const result = await response.json();

      setHeaderData((prev) => ({
        ...prev,
        movies: result.results,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchMovie = async (query: string) => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}&language=en-US&page=${headerData.page}`
      );
      const result = await response.json();

      const filteredMovies = result.results
        .filter((search: { original_title: string }) =>
          search.original_title.toLowerCase().startsWith(query.toLowerCase())
        )
        .slice(0, 5);

      setMovie(filteredMovies);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (movie.length === 0) {
      const jsonData = JSON.stringify(1);
      localStorage.setItem("genre", jsonData);
    }
  }, [movie]);
  useEffect(() => {
    if (selectedGenre) {
      moviegenre();
    }
  }, [selectedGenre]);

  return (
    <>
      <div
        className={`text-secondary-foreground ${isDark ? "bg-black" : "bg-white" } w-full h-[59px] px-4 justify-between inline-flex flex-col justify-center items-center sticky top-[0px] z-10`}

      >
  
        <div className="flex w-[1440px] h-full inline-flex justify-between items-center gap-2 ">
          <Link  
          href={`/`}
          className="h-5 justify-start items-center gap-2 inline-flex">
            <img src="../film.svg" alt="Logo" />
            <p className="text-indigo-700 text-base font-bold leading-tight tracking-tight">
              Movie Z
            </p>
          </Link>
          <div className="flex inline-flex justify-between items-center">
          <Button
            className={`w-[97px] mr-[30px] h-9 px-4 py-2 ${isDark ? "bg-black text-white" : "bg-white text-black" } rounded-md shadow-sm border border-[#e3e3e7] justify-center items-center gap-2 inline-flex hover:bg-gray-100`}
            onClick={toggleGenreSearch}
          >

            <ChevronDown></ChevronDown>
            Genre
          </Button>
          <Input
            onChange={onSearchValueChange}
            value={searchValue}
            placeholder="Search..."
            className="w-[379px] h-9 px-3 bg-white rounded-lg border border-[#e3e3e7] justify-start items-center gap-2.5 inline-flex"
          />
          </div>

  <DarkModeButton></DarkModeButton>
        </div>
        {headerData.ganreSearch && (
          <div className="w-[577px] h-[333px] p-5 bg-white rounded-lg border border-[#e3e3e7] flex-col justify-start items-start inline-flex">
            <div className="h-[60px] flex-col justify-start items-start gap-1 flex">
              <div className="self-stretch text-zinc-950 text-2xl font-semibold leading-loose">
                Genres
              </div>
              <div className="self-stretch text-zinc-950 text-base font-normal leading-normal">
                See lists of movies by genre
              </div>
            </div>
            <div className="self-stretch h-[33px] py-4 flex-col justify-start items-start gap-2.5 flex">
              <div className="self-stretch h-px border border-[#e3e3e7]"></div>
            </div>
            <div className="h-[200px] w-[577px] justify-start items-start gap-4 inline-flex flex-wrap">
              {genres.map((genre) => (
                <Link
                href={`/genreIds/${genre.id}`}
                  key={genre.id}
          
                  className="pl-2.5 pr-1 py-0.5 rounded-full border border-[#e3e3e7] justify-center items-center gap-2 flex cursor-pointer hover:bg-gray-100 bg-white"
                >
                  <div className="text-zinc-950 text-xs font-semibold leading-none">
                    {genre.name}
                  </div>
                  <img
                    className="w-4 h-4 relative overflow-hidden"
                    src="../vercelRight.svg"
                  />
                </Link>
              ))}
            </div>
            
          </div>
        )}

        {headerData.movies.length > 0 && (
          <GenreContent genres={genres} movies={headerData.movies} />
        )}
        {searchValue.length !== 0 && (
          <div className="w-full max-w-[577px] h-fit p-3 bg-white rounded-lg border border-[#e3e3e7] flex-col justify-start items-start inline-flex absolute top-[57px] sm:w-full">
            {movie && movie.length > 0 ? (
              <div className="h-fit p-2 rounded-lg justify-start items-start block gap-y-8">
                {movie.map((m, index) => (
                  <Link
                    href={`/detail/${m.id}`}
                    key={index}
                    className="flex gap-8 mb-4"
                  >
                    <img
                      className="w-[67px] h-[100px] relative rounded-md object-cover"
                      src={`https://image.tmdb.org/t/p/original/${m.poster_path}`}
                    />

                    <div className="grow flex-col justify-start items-start gap-3">
                      <div className="self-stretch h-[51px] flex-col justify-start items-start flex gap-2">
                        <div className="text-zinc-950 text-xl font-semibold leading-7 truncate">
                          {m.original_title}
                        </div>
                      </div>

                      <div className="self-stretch h-[23px] flex items-center justify-start gap-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src="../star.png"
                            alt="star icon"
                            className="w-4 h-4 text-yellow-500"
                          />
                          <span className="text-zinc-950 text-sm font-medium leading-tight">
                            {m.vote_average.toString().slice(0, 3)}
                          </span>
                          <span className="text-zinc-500 text-xs font-normal leading-none">
                            /10
                          </span>
                        </div>
                      </div>

                      <div className="self-stretch flex justify-between items-start gap-3">
                        <div className="text-zinc-950 text-sm font-medium leading-tight">
                          {m.release_date}
                        </div>

                        <div className="px-4 py-2 rounded-md flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-100">
                          <div className="text-zinc-950 text-sm font-medium leading-tight">
                            See more
                          </div>
                          <div className="w-4 h-4 relative overflow-hidden"></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 w-full text-center text-zinc-700 inline-flex flex-col justify-center items-center">
                <p>No results found.</p>{" "}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
