"use client";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Poster } from "./poster";

import { useTheme } from "next-themes";
import { Slide } from "./backdropMovie";

export const Content = ({ MovieDetail }: ContentProps) => {
  const key = "115ff36ff2575f01537accc67c1e0fa8";
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [movie, setMovie] = useState<allMovie>({
    movieNowPlaying: [],
    movieUpcoming: [],
    moviePopular: [],
    movieTopRated: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [trailer, setTrailer] = useState<string | null>(null);
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
    movieUpcoming();
    moviePopular();
    movieTopRated();
  }, []);
  useEffect(() => {
    MovieDetail(selectedMovieId);
  }, [selectedMovieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="relative h-[610px] xl:h-[600px] flex-col justify-start items-start gap-4 inline-flex">
        <Carousel className={`${isDark ? 'text-white' : 'text-black'} h-full`}>
          <CarouselContent>
            {movie.movieNowPlaying.slice(0, 10).map((m, index) => (
              <CarouselItem key={`path${index}`}>
          <Slide movie={m} ></Slide>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-12 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-12 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>

      <div className="w-full xl:w-[1440px] relative flex-col justify-start items-start gap-4 inline-flex mb-12">
        <Poster
          moviee={movie.movieUpcoming}
          GenreName="Upcoming"
          PageName="Upcoming"
          MovieDetail={setSelectedMovieId}
        />
        <Poster
          moviee={movie.moviePopular}
          GenreName="Popular"
          PageName="Popular"
          MovieDetail={setSelectedMovieId}
        ></Poster>
        <Poster
          moviee={movie.movieTopRated}
          GenreName="Top Rated"
          PageName="topRated"
          MovieDetail={setSelectedMovieId}
        ></Poster>
      </div>
    </>
  );
};
