import React, { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import AddCourseBtn from "./AddCourseBtn";
import { Link } from "react-router-dom";

function SideBar() {
  // const coursesDict = {"Intro to Computers":"CS105"};
  const [courseCodes, setCourseCodes] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    getCourseCodes();
  }, []);

  const getCourseCodes = async () => {
    try {
      const contentResponse = await fetch(
        `http://127.0.0.1:5555/v1/getCourseList`,
        {
          method: "POST",
          headers: {
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await contentResponse.json();
      setCourseCodes(responseData.courses);

      console.log("content retrieved.", responseData);
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  };

  // Have a use effect here to get the data later on...
  // Have another logic here such that if the link URL does not exist in the
  // current state, then call the database again.

  return (
    <div className="bg-background flex flex-col h-screen px-2 w-1/6 py-2 border-r">
      <AddCourseBtn />

      <ScrollArea className="mt-4">
        {courseCodes.map((courseCode) => (
          <Button
          variant={selectedButton === courseCode ? 'secondary' : 'outline'}
          key={courseCode} // assuming courseCode is unique
          asChild
          className="mt-2 w-full justify-start"
          onClick={() => setSelectedButton(courseCode)} // Save the selected button's courseCode
        >
          <Link to={"/home/" + courseCode}>{courseCode}</Link>
        </Button>
        ))}
      </ScrollArea>
    </div>
  );
}

export default SideBar;

// className="mt-2 w-full justify-start"
