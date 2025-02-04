"use client";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Header } from "./Header";
import { Poster } from "./poster";

interface Movie {
  moviePopular
  :{
    original_title: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  id:number;
  genre_ids: number[];
  }[],
  movieUpcoming:{
    original_title: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  id:number;
  genre_ids: number[];
  }[],
  movieNowPlaying:{
    original_title: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  id:number;
  genre_ids: number[];
  backdrop_path:string;
  }[],
  movieTopRated:{
    original_title: string;
    poster_path: string;
    title: string;
    overview: string;
    vote_average: number;
    id:number;
    genre_ids: number[];
  }[],
}
interface ContentProps{
  MovieDetail: (MovieDetail: number | null) => void; 
}
export const Content:React.FC<ContentProps> = ({MovieDetail}) => {
  const key = "115ff36ff2575f01537accc67c1e0fa8";
  const [movie, setMovie] = useState<Movie>({
    movieNowPlaying:[],
    movieUpcoming:[],
    moviePopular:[],
    movieTopRated:[],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const movieNowPlayingContent = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`
      );
      const result = await response.json();
     
      setMovie((prev) => ({
        ...prev,
        movieNowPlaying: result.results,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const movieUpcoming = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`
      );

      const result = await response.json();
      setMovie((prev) => ({
        ...prev,
        movieUpcoming: result.results,
      }));

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const moviePopular = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
      );
      const result = await response.json();
  
      setMovie((prev) => ({
        ...prev,
        moviePopular: result.results,
      }));
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
      
      setMovie((prev) => ({
        ...prev,
        movieTopRated: result.results,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("selectedMovieId");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSelectedMovieId(parsedData);
    }
  }, []);

  useEffect(() => {
    movieNowPlayingContent();
    movieUpcoming()
    moviePopular()
    movieTopRated()
  }, []);
useEffect(()=> {
  MovieDetail(selectedMovieId)
},[selectedMovieId])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="relative h-[600px] flex-col justify-start items-start gap-4 inline-flex">
        <Carousel className="">
          <CarouselContent>
            {movie.movieNowPlaying.slice(0, 10).map((m, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[600px] overflow-hidden cursor-pointer">
                  <img
                    className="relative"
                    src={`https://image.tmdb.org/t/p/original/${m.backdrop_path}`}
                    alt={m.title}
                    loading="lazy"
                    sizes="100vw"
                  />
                  <div className="h-[264px] w-[404px] absolute top-[202px] left-[140px] text-white flex-col justify-start items-start gap-4 inline-flex">
                    <div className="w-[404px] text-white text-base font-normal leading-normal">
                      Now Playing:
                    </div>
                    <div className="flex-col justify-start items-start flex">
                      <p className="w-[404px] text-white text-4xl font-bold font-['Inter'] leading-10">
                        {m.original_title}
                      </p>
                      <p className="flex text-neutral-50 text-lg font-semibold leading-7">
                        <img src="star.png" alt="" />
                        {m.vote_average.toString().slice(0, 3)}
                        <span className="text-zinc-500 text-base font-normal leading-normal">
                          /10
                        </span>
                      </p>
                    </div>
                    <p className="w-[302px] text-neutral-50 text-[16px] font-normal leading-none">
                      {m.overview}
                    </p>
                    <Button className="h-10 px-4 py-4 bg-zinc-100 rounded-md justify-center items-center gap-2 inline-flex text-zinc-900 text-sm font-medium leading-tigh hover:bg-gray-100">
                      <img src="play.svg" /> Watch Trailer
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="relative left-[30px]" />
          <CarouselNext className="relative right-[30px]" />
        </Carousel>
      </div>

      <div className="w-[1440px] relative flex-col justify-start items-start gap-4 inline-flex">
      <Poster moviee={movie.movieUpcoming} GenreName="Upcoming" PageName="Upcoming"MovieDetail={setSelectedMovieId}/> 
      <Poster moviee={movie.moviePopular} GenreName="Popular" PageName="Popular"MovieDetail={setSelectedMovieId}></Poster>
      <Poster moviee={movie.movieTopRated} GenreName="Top Rated" PageName="topRated" MovieDetail={setSelectedMovieId}></Poster>
      </div>
    </>
  );
};
