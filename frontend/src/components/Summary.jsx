import React, { useState , useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import YouTube from 'react-youtube';
import { useLocation } from 'react-router-dom'
import FAB from './FAB';



function Summary() {
  const location = useLocation()
  let path = location.pathname; // "/home/C1/pENQyjXkcw4"
  let segments = path.split("/"); // splits the path into an array of segments
  let urlID = segments.pop(); // retrieves the last element of the array
  let courseName = segments.pop(); // retrieves the last element of the array


  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');

  const windowWidth = useRef(window.innerWidth) * 3 / 4;
  const opts = {
    height: 400,
    width: 1000,
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    getContentData();
  }, []);
  
  const getContentData = async () => {
    try {
        const contentResponse = await fetch(`http://127.0.0.1:5555/v1/notes`, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"course": courseName})
        });
    
        const responseData = await contentResponse.json();

        for (let note of responseData.notes) {
          const videoIdKey = Object.keys(note)[0];  // Get the first key of the note object
          console.log("videoIDKEY:", videoIdKey, "urlID:", urlID);

          if (videoIdKey === urlID) {

              setName(note[videoIdKey].title);
              setSummary(note[videoIdKey].summary);

          }
        }
        console.log('content retrieved.', responseData);


    } catch (error) {
        console.error('There was a problem with the delete operation:', error);
    }
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
