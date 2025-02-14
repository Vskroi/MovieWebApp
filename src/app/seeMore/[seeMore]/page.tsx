"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { useTheme } from "next-themes";
import { DynamicPaginat } from "@/components/DynamicPaginat";
export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { seeMore } = useParams<{ seeMore: string }>();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageName, setPageName] = useState<string>();
  const [totalPage, setTotalPage] = useState<number>(1);
  const key = "115ff36ff2575f01537accc67c1e0fa8";

  const fetchMovies = async (category: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${key}&language=en-US&page=1`
      );
      const result = await response.json();
      setMovies(result.results || []);
      setTotalPage(result.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (seeMore === "Upcoming" && "Popular") {
      fetchMovies(seeMore.toLowerCase());
      setPageName(seeMore);
    } else {
      fetchMovies("top_rated");
      setPageName("Top Rated");
    }
  }, [seeMore]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header></Header>

        <h1 className="text-zinc-950 text-3xl font-semibold leading-9 p-8">
          {pageName}
        </h1>

        <div className="w-full xl:w-[1440px] justify-center items-center relative flex gap-6 xl:block">
          <div className="w-full xl:w-[1440px] block  justify-start items-start relative  xl:justify-between xl:mb-20 mx-[28px] xl:mx-[0px] grid gap-4 grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.slice(0, 20).map((m, index) => (
              <Link
                key={index}
                href={`/detail/${m.id}`}
                className={`h-[439px]  ${
                  isDark ? "bg-black text-white" : "bg-zinc-100 text-zinc-950"
                }  rounded-lg flex-col justify-start items-start gap-1 xl:inline-flex overflow-hidden`}
              >
                <img
                  className="w-full h-[340px] rounded-lg relative"
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
                        <img
                          className="h-[20px]"
                          src="../star.png"
                          alt="star"
                        />
                        <span className="text-xl font-medium leading-tight">
                          {m.vote_average.toString().slice(0, 3)}
                        </span>
                        <span className="text-zinc-500 font-normal leading-none">
                          /10
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch justify-center items-center gap-2.5 inline-flex">
                    <div className="grow shrink basis-0 text-lg font-normal leading-7 .break-words ">
                      {m.original_title}
                      <br />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
     
        </div>
          <DynamicPaginat total_page={totalPage}></DynamicPaginat>
   
   
      <Footer></Footer>
    </>
  );
}
