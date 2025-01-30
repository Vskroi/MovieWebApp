import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import * as React from "react";

interface HeaderData {
  darkLightMode: string;
  darkLigthTest: boolean;
  ganreSearch: boolean;
}
interface genres {
  id: string;
  name: string;
}
type SetStepProps = { setStep: (step: string) => void };
export const Header = ({ setStep }: SetStepProps) => {
  const key = "115ff36ff2575f01537accc67c1e0fa8";
  const [genres, setGenres] = useState<genres[]>([]);
  const [headerData, setHeaderData] = useState<HeaderData>({
    darkLightMode: "moon.svg",
    darkLigthTest: false,
    ganreSearch: false,
  });
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const darkLightMode = () => {
    if (headerData.darkLigthTest === false) {
      setHeaderData((prev) => ({
        ...prev,
        darkLightMode: "whitemoon.svg",
        darkLigtTest: true,
      }));
    } else {
      setHeaderData((prev) => ({
        ...prev,
        darkLightMode: "moon.svg",
        darkLigtTest: false,
      }));
    }
  };

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
      console.log( error);
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
    moviegenre();
    console.log(genreId)
    setStep('2')
  };

  const genreIds = selectedGenre ? selectedGenre : "12";

  const moviegenre = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en&with_genres=${genreIds}&page=1`
      );

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div
      className={`${
        headerData.darkLigthTest === false ? "bg-white" : "bg-black"
      } w-full h-[59px] px-4  justify-between inline-flex flex-col justify-center items-center sticky top-[0px] z-10`}
    >
      <div className="justify-start items-center gap-2 flex">
        <div className="h-5 justify-start items-center gap-2 inline-flex">
          <img src="film.svg" />
          <p className="text-indigo-700 text-base font-bold  leading-tight tracking-tight">
            Movie Z
          </p>
        </div>
        <Button
          className="w-[97px] h-9 px-4 py-2 bg-white rounded-md shadow-sm border border-[#e3e3e7] justify-center items-center gap-2 inline-flex text-black hover:bg-gray-100"
          onClick={genre}
        >
          {" "}
          <img src="chevron-down.svg" alt="chevron-down" />
          Genre
        </Button>
        <Input
          placeholder="Search..."
          className="w-[379px] h-9 px-3 bg-white rounded-lg border border-[#e3e3e7] justify-start items-center gap-2.5 inline-flex"
        ></Input>
        <div className="h-9 justify-end items-center gap-3 inline-flex">
          <Button
            onClick={darkLightMode}
            className="w-9 h-9 bg-white p-[0px] rounded-[10px] shadow-sm border border-[#e3e3e7] gap-2 flex
            hover:bg-gray-100
            "
          >
            <img
              className="w-4 h-4 relative overflow-hidden"
              src={headerData.darkLightMode}
              alt=""
            />
          </Button>
        </div>
      </div>
      {!headerData.ganreSearch === false && (
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
      )}
    </div>
  );
};
