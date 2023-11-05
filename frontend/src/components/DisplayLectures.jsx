import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import FAB from "./FAB";
import axios from "axios";

function DisplayLectures() {
  const location = useLocation();
  let path = location.pathname; // "/home/C1/pENQyjXkcw4"
  let segments = path.split("/"); // splits the path into an array of segments
  let courseID = segments.pop(); // retrieves the last element of the array

  const [lectureVideosTuple, setLectureVideosTuple] = useState([]);
  const [existingVideoIds, setExistingVideoIds] = useState(new Set());

  const [title, setTitle] = useState("");
  const [urlID, setUrlID] = useState("");

  useEffect(() => {
    console.log("displayLecture useEffect called");
    console.log("courseID:", courseID);

    // Reset the state
    setLectureVideosTuple([]);
    setExistingVideoIds(new Set());

    getContentData();
  }, [location]);

  const getContentData = async () => {
    try {
      const contentResponse = await fetch(`http://127.0.0.1:5555/v1/notes`, {
        method: "POST",
        headers: {
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course: courseID }),
      });
  
      const responseData = await contentResponse.json();
  
      const newLectureVideos = [];
  
      for (let note of responseData.notes) {
        const videoIdKey = Object.keys(note)[0];
        if (!existingVideoIds.has(videoIdKey)) {
          newLectureVideos.push({ title: note[videoIdKey].title, videoId: videoIdKey });
          setExistingVideoIds(prevState => new Set([...prevState, videoIdKey]));
        } else {
          console.log("video already exists: ", videoIdKey);
        }
      }
  
      // Update the state with the new videos, if any
      if (newLectureVideos.length > 0) {
        setLectureVideosTuple(prevState => [
          ...prevState,
          ...newLectureVideos,
        ]);
      }
  
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  };
  
  return (
    <>
      <div className="mx-auto flex flex-col">
        <p className="text-4xl font-bold my-4">Previously Uploaded</p>
        <Separator />
        <div className="my-5 grid grid-cols-2 gap-8">
          {lectureVideosTuple.map((videoInfo, index) => (
            <div key={index}>
              <iframe
                src={`https://www.youtube.com/embed/${videoInfo.videoId}`}
                allowFullScreen
                style={{ width: "23rem", height: `${(23 / 16) * 9}rem` }}
              ></iframe>
              <Link
                to={{ pathname: videoInfo.videoId, state: { from: videoInfo.videoId } }}
              >
                <h1 className="font-bold text-lg">{videoInfo.title}</h1>
              </Link>
              {/* <p className="text-sm text-gray-400">{videoInfo[2]}</p> */}
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <FAB />
      </div>
    </>
  );
}

export default DisplayLectures;
