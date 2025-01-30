"use client";
import { useState } from "react";
import { Content } from "@/components/content";
import { GenreContent } from "@/components/genreContent";


export default function Home() {
  const [step, setStep] = useState<string>('1');
  
  return (
    <div className="w-full justify-center items-center inline-flex flex-col justify-center items-center">
      {step === '1' && <Content setStep={setStep} />}
      {step === '2' && <GenreContent></GenreContent>}
    </div>
  );
}

