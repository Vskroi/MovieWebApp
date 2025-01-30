import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Poster } from "./poster";
interface HeaderData {
  darkLightMode: string;
  darkLigthTest: boolean;
  ganreSearch: boolean;
}
interface genres {
  id: string;
  name: string;
}
interface Movie {
  original_title: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
}
export const GenreContent = () => {
  const key = "115ff36ff2575f01537accc67c1e0fa8";
  const [genres, setGenres] = useState<genres[]>([]);
  const [headerData, setHeaderData] = useState<HeaderData>({
    darkLightMode: "moon.svg",
    darkLigthTest: false,
    ganreSearch: false,
  });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const genre = () => {
    if (headerData.ganreSearch === false) {
      setHeaderData((prev) => ({
        ...prev,
        ganreSearch: true,
      }));
    } else {
      setHeaderData((prev) => ({
        ...prev,

        ganreSearch: false,
      }));
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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenre(genreId);
    setHeaderData((prev) => ({
      ...prev,
      ganreSearch: true,
    }));

    console.log(genreId);
  };

  const genreIds = selectedGenre ? selectedGenre : "";

  const moviegenre = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en&with_genres=${genreIds}&page=1`
      );
      const result = await response.json();
      console.log(result);
      setMovies(result.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    moviegenre();
  }, [genres]);
  return (
    <>
      <div className="h-fit w-fit justify-start items-start gap-1">
        <div className="w-[387px] h-[352px] flex-col justify-start items-start gap-5 inline-flex">
          <div className="h-[60px] flex-col justify-start items-start gap-1 flex">
            <div className="self-stretch text-zinc-950 text-2xl font-semibold leading-loose">
              Genres
            </div>
            <div className="self-stretch text-zinc-950 text-base font-normal fleading-normal">
              See lists of movies by genre
            </div>
          </div>
          <div className="w-[387px] inline-flex flex-wrap self-stretch justify-start items-start gap-4 inline-flex">
            {genres.map((nameId, index) => (
              <Button
                key={index}
                onClick={() => handleGenreSelect(nameId.id)}
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
        <Poster moviee={movies} GenreName="" />
      </div>
    </>
  );
};
