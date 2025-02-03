import { useState, useEffect } from "react";
import { Button } from "./ui/button";

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
}

export const MovieDetails = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
console.log(movies ,' qw')
  const key = "115ff36ff2575f01537accc67c1e0fa8"; // API key


  const moviePopular = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
      );
      const result = await response.json();
  

      setMovies(result.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const movieNowPlaying = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
      );
      const result = await response.json();
  

      setMovies(result.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const movieTopRated = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`
      );
      const result = await response.json();
      
      setMovies(result.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    moviePopular();
    movieNowPlaying();
    movieTopRated();
  },[selectedMovieId])
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en`
      );
      const result = await response.json();
      setGenres(result.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
    const storedData = localStorage.getItem("selectedMovieId");

    const parsedData = storedData ? JSON.parse(storedData) : null ;
    console.log(parsedData , 'id')
    setSelectedMovieId(parsedData);
    
  }, []);

  const selectedMovie = movies.find((m) => m.id === selectedMovieId);
  console.log(selectedMovie , 'as')
  const movieGenres = selectedMovie
    ? genres.filter((g) => selectedMovie.genre_ids.includes(g.id))
    : [];

  const onclickCloseDetails = () => {
    setSelectedMovieId(null);
    localStorage.setItem("selectedMovieId", JSON.stringify(null));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedMovie) {
    return;
  }

  return (
    <div className="w-full h-full p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{selectedMovie.original_title}</h2>
      <div className="flex items-center">
        <img className="h-[20px]" src="star.png" alt="star" />
        <span className="text-zinc-950 text-sm font-medium leading-tight">
          {selectedMovie.vote_average.toString().slice(0, 3)}
        </span>
        <span className="text-zinc-500 font-normal leading-none">/10</span>
      </div>
      <img
        className="w-[300px] h-[450px] object-cover mb-4"
        src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
        alt={selectedMovie.title}
      />
      <div className="flex gap-5">
        {movieGenres.map((g, index) => (
          <div key={index} className="h-5 justify-start items-start inline-flex">
            <div className="px-2.5 py-0.5 rounded-full border border-[#e3e3e7] justify-start items-start flex">
              <div className="text-zinc-950 text-xs font-semibold leading-none">
                {g.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-lg mb-4">{selectedMovie.overview}</p>
      <Button onClick={onclickCloseDetails} className="mt-4 bg-red-500 text-white">
        Close Details
      </Button>
    </div>
  );
};
