import { useState, useEffect } from "react";

interface MovieData {
  sonicThreeImg: string;
  sonicThreeText: string;
}

export const Content = () => {
  const key = "115ff36ff2575f01537accc67c1e0fa8";
  const [movie, setMovie] = useState<MovieData>({
    sonicThreeImg: "",
    sonicThreeText: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  const movieNowPlaying = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`
      );
      const result = await response.json();
      console.log("Now Playing Movies:", result);

      if (result.results && result.results[0].backdrop_path) {
        setMovie({
          sonicThreeImg: `https://image.tmdb.org/t/p/w500${result.results[0].backdrop_path}`,
          sonicThreeText: result.results[0].overview,
        });
      }
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
    <div className="w-[1440px] relative h-[600px] flex-col justify-start items-start gap-4 inline-flex">
      <img
        className=" w-full h-full"
        src={movie.sonicThreeImg}
        alt="Now Playing Movie"
      />
      <div className="h-[600px]  bg-black/20 overflow-hidden">
        <div className="left-[700px] top-[555px] absolute justify-start items-center gap-2 inline-flex">
          <div className="w-2 h-2 relative bg-white rounded-full" />
          <div className="w-2 h-2 relative bg-white/80 rounded-full" />
          <div className="w-2 h-2 relative bg-white/80 rounded-full" />
        </div>
        <div className="w-10 h-10 left-[1356px] top-[280px] absolute bg-zinc-100 rounded-full justify-center items-center gap-2 inline-flex">
          <img
            className="w-4 h-4 relative overflow-hidden"
            src="chevron-right.svg"
          />
        </div>
        <div className="h-[264px] relative top-[-200px] absolute flex-col justify-start items-start gap-4 inline-flex">
        <div className="w-[302px] text-neutral-50 text-xs font-normal font-['Inter'] leading-none">{movie.sonicThreeText}</div>
      </div>
        </div>
       
    </div>
  );
};
