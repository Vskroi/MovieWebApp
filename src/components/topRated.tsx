import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Poster } from "./poster";

interface Movie {
  original_title: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  id:number;
  genre_ids: number[];

}
export const TopRated = ({}) => {
  const key = "115ff36ff2575f01537accc67c1e0fa8";
  const [movie, setMovie ] = useState<Movie[]>([]);
  const [loading, setLoading ] = useState<boolean>(true);


  const movieTopRated = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`
      );
      const result = await response.json();
      
      setMovie(result.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    movieTopRated();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
   <>
  <Poster moviee={movie} GenreName="Top Rated" PageName="topRated"></Poster>
      </>
  );
};
