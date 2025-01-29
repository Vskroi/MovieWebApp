import { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface Movie {
  original_title: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
}
export const Upcoming = () => {
  const key = "115ff36ff2575f01537accc67c1e0fa8";
  const [movie, setMovie] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("a", movie);
  const movieNowPlaying = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`
      );
      const result = await response.json();
      console.log("Now Playing Movies:", result);
      setMovie(result.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    movieNowPlaying();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
   <>
   <div className="w-[1440px] flex-col  relative inline-flex">
   <div className="flex gap-5 ">
        <div className="text-zinc-950 text-2xl font-semibold leading-loose relative left-[0px]">
          Upcoming{" "}
        </div>
        <Button className="bg-white"></Button>
      </div>
   </div>
    <div className="w-[1440px] flex-col justify-center items-center relative inline-flex gap-10">
     
      <div className="flex gap-16 ">
        {movie.slice(0, 5).map((m) => (
          <div className="h-[439px] bg-zinc-100 rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden ">
            <img
              className="w-[229.73px] h-[340px] relative"
              src={`https://image.tmdb.org/t/p/original/${m.poster_path}`}
            />
            <div className="self-stretch h-[95px] p-2 flex-col justify-start items-start flex">
              <div className="self-stretch h-[23px] justify-start items-start gap-1 inline-flex">
                <div className="h-[18px] pt-0.5 justify-start items-center gap-2.5 flex">
                  <div className="h-4 relative  overflow-hidden"></div>
                </div>
                <div className="grow shrink basis-0 self-stretch justify-start items-start flex">
                  <div className="flex">
                    <img className="h-[20px]" src="star.png" alt="" />
                    <span className="text-zinc-950 text-sm font-medium  leading-tight">
                      {m.vote_average.toString().slice(0, 3)}
                    </span>
                    <span className="text-zinc-500  font-normal leading-none">
                      /10
                    </span>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                <div className="grow shrink basis-0 text-zinc-950 text-lg font-normal leading-7">
                  {m.original_title}
                  <br />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-16 ">
        {movie.slice(5, 10).map((m) => (
          <div className="h-[439px] bg-zinc-100 rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden ">
            <img
              className="w-[229.73px] h-[340px] relative"
              src={`https://image.tmdb.org/t/p/original/${m.poster_path}`}
            />
            <div className="self-stretch h-[95px] p-2 flex-col justify-start items-start flex">
              <div className="self-stretch h-[23px] justify-start items-start gap-1 inline-flex">
                <div className="h-[18px] pt-0.5 justify-start items-center gap-2.5 flex">
                  <div className="h-4 relative  overflow-hidden"></div>
                </div>
                <div className="grow shrink basis-0 self-stretch justify-start items-start flex">
                  <div className="flex">
                    <img className="h-[20px]" src="star.png" alt="" />
                    <span className="text-zinc-950 text-sm font-medium  leading-tight">
                      {m.vote_average.toString().slice(0, 3)}
                    </span>
                    <span className="text-zinc-500  font-normal leading-none">
                      /10
                    </span>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                <div className="grow shrink basis-0 text-zinc-950 text-lg font-normal  leading-7">
                  {m.original_title}
                  <br />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      </>
  );
};
