import React, { useState , useRef} from "react";
import { Button } from "@/components/ui/button";
import YouTube from 'react-youtube';

function Summary({ name, summary, urlID }) {
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
          {name}
        </h1>
        <YouTube videoId={urlID} opts={opts}/>

        <p className="text-lg text-gray-700 dark:text-gray-300">{summary}</p>
      </div>
    </>
  );
}

export default Summary;
