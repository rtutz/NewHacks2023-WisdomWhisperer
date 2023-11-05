import React, { useState , useRef} from "react";
import { Button } from "@/components/ui/button";
import YouTube from 'react-youtube';
import { useLocation } from 'react-router-dom'
import FAB from './FAB';



function Summary() {
  const location = useLocation()
  let path = location.pathname; // "/home/C1/pENQyjXkcw4"
  let segments = path.split("/"); // splits the path into an array of segments
  let urlID = segments.pop(); // retrieves the last element of the array

  const name= 'test name'
  const summary = 'test summary'
  const windowWidth = useRef(window.innerWidth) * 3 / 4;
  const opts = {
    height: 400,
    width: 1000,
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <>
    
      <div className="flex flex-col m-8 gap-4 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          {urlID}
        </h1>
        <YouTube videoId={urlID} opts={opts}/>

        <p className="text-lg text-gray-700 dark:text-gray-300">{summary}</p>
      </div>
      <FAB/>
    </>
  );
}

export default Summary;
