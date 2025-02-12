import Link from "next/link";
type a = {
    movie : {
        original_title: string;
        poster_path: string;
        title: string;
        overview: string;
        vote_average: number;
        id: number;
        genre_ids: number[];
        release_date: string;
        vote_count: number;
      };
      isDark:boolean
} 
export const MovieCard = ({ movie  , isDark } : a) => {
    return (
      <Link
        href={`/detail/${movie.id}`}
        className={`h-[331px] w-[165px] ${isDark ? "bg-black text-white" : "bg-zinc-100 text-zinc-950"} rounded-lg flex-col justify-start items-start gap-1 inline-flex overflow-hidden`}
      >
        <img
          className="w-[229.73px] h-[340px] relative"
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="self-stretch h-[95px] p-2 flex-col justify-start items-start flex">
          <div className="self-stretch h-[23px] justify-start items-start gap-1 inline-flex">
            <div className="h-[18px] pt-0.5 justify-start items-center gap-2.5 flex">
              <div className="h-4 relative overflow-hidden"></div>
            </div>
            <div className="grow shrink basis-0 self-stretch justify-start items-start flex">
              <div className="flex">
                <img className="h-[20px]" src="../star.png" alt="star" />
                <span className="text-sm font-medium leading-tight">
                  {movie.vote_average.toString().slice(0, 3)}
                </span>
                <span className="text-zinc-500 font-normal leading-none">/10</span>
              </div>
            </div>
          </div>
          <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
            <div className="grow shrink basis-0 text-lg font-normal leading-7">
              {movie.original_title}
              <br />
            </div>
          </div>
        </div>
      </Link>
    );
  };
  