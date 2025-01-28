import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import * as React from "react"

interface HeaderData {
  darkLightMode: string; 
  darkLigtTest: boolean
}



export const Header = () => {
  const [headerData, setHeaderData] = useState<HeaderData>({ darkLightMode: "moon.svg", darkLigtTest:false});

 




  const darkLightMode = () => {
  
    if(headerData.darkLigtTest === false){
    setHeaderData((prev) => ({
      ...prev,
      darkLightMode:  "whitemoon.svg" ,darkLigtTest:true
    }));
  
 
 }else{
  setHeaderData((prev) => ({
    ...prev,
    darkLightMode:  "moon.svg" ,darkLigtTest:false
  }));

 }
  };
  return (
    <div className={`${headerData.darkLigtTest === false ?  "bg-white" : "bg-black"} w-[1440px] h-[59px] px-4  justify-between inline-flex flex-col justify-center items-center sticky top-[0px]`}>
      <div className="justify-start items-center gap-2 flex">
        <div className="h-5 justify-start items-center gap-2 inline-flex">
          <img src="film.svg" />
          <p className="text-indigo-700 text-base font-bold  leading-tight tracking-tight">
            Movie Z
          </p>
        </div>
        <Button className="w-[97px] h-9 px-4 py-2 bg-white rounded-md shadow-sm border border-[#e3e3e7] justify-center items-center gap-2 inline-flex text-black">
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
    </div>
  );
};
