"use client";
import { useState , useEffect} from "react";
import { Content } from "@/components/content";
import { Footer } from "@/components/footer";
import { Header } from "@/components/Header";



export default function Home() {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [step, setStep] = useState<number>();
  
  if(typeof window !== 'undefined'){
  useEffect(() => {
    const storedData = localStorage.getItem("genre");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setStep(parsedData);

    }
  }, [step]);  }
useEffect(() => {
  console.log( "asdsadasfasdsdhigfbasiydfi")
},[selectedMovieId])
  return (
    <div className="w-full inline-flex flex-col justify-center items-center">
      <Header setStep={setStep}></Header>
      {selectedMovieId == null  && <Content MovieDetail={setSelectedMovieId}></Content>}

      <Footer></Footer>
    </div>
  );
}

