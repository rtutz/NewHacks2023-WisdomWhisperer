import SideBar from "./SideBar";
import QuizQuestion from "./QuizQuestion";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import axios from 'axios';
function QuizHome() {
    const location = useLocation()
    let path = location.pathname; // "/home/C1/pENQyjXkcw4"
    let segments = path.split("/"); // splits the path into an array of segments
    segments.pop(); // retrieves the last element of the array
    let courseID = segments.pop(); // retrieves the last element of the array

    const [data, setData] = useState(null);
    const endpoint = "https://www.youtube.com/"
  
    useEffect(() => {
        // Send a POST request 
        axios.post(endpoint, { courseID })
          .then(response => {
            const [question, choices, answer] = response.data;
            
            // If data is retrieved successfully, set it to the state
            setData({ question, choices, answer });
          })
          .catch(error => {
            // Error handling
            console.error('Something went wrong!', error);
          });
      }, [courseID]);

    return (
        <div className="flex">
            <SideBar/>
            <div className="w-full flex justify-center">
                <QuizQuestion 
                question={data.question}
                answerArr={data.choices}
                id={1}
                correctAns={data.answer}/>
            </div>
            
        </div>
    )
}
export default QuizHome;

// questionArr[currentQ]