"use client";
import { useState , useEffect} from "react";
import { Content } from "@/components/content";
import { GenreContent } from "@/components/genreContent";
import { Footer } from "@/components/footer";
import { Header } from "@/components/Header";
import { MovieDetails } from "@/components/movieDetails";


export default function Home() {

  const [step, setStep] = useState<number>();
  if(typeof window !== 'undefined'){
  useEffect(() => {
    const storedData = localStorage.getItem("genre");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setStep(parsedData);

    }
  }, [step]);  }
  console.log('step'  , step)
  return (
    <div className="w-full justify-center items-center inline-flex flex-col justify-center items-center">
      <Header setStep={setStep}></Header>
      {step === 1 && <Content></Content>}
      <MovieDetails></MovieDetails>
      <Footer></Footer>
    </div>
  );
}

