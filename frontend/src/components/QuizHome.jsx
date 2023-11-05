import SideBar from "./SideBar";
import QuizQuestion from "./QuizQuestion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress"


function QuizHome() {
    const [progress, setProgress] = useState(13)

    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }, [])
  
    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }, [])
    const location = useLocation()
    let path = location.pathname; // "/home/C1/pENQyjXkcw4"
    let segments = path.split("/"); // splits the path into an array of segments
    segments.pop(); // retrieves the last element of the array
    let courseID = segments.pop(); // retrieves the last element of the array

    const [quizIndex, setQuizIndex] = useState(0)

    const triggerFn = () => {
      setQuizIndex(quizIndex + 1)
    }

  const [quizData, setQuizData] = useState(null);

  const getQuestionsAnswers = async () => {
    console.log("Cousresid", courseID);
    const query =
      'Based on those notes, generate me 3 quiz questions. Each question should have 4 choices and one correct answer. Return me the response in this format: {"question": "What is the capital of France?", "choices": ["Paris", "London", "Berlin", "Madrid"], "answer": "Paris"}. I know I said respond "I don\'t know" to questions you don\'t know about, but make an exception for this. You must give me the questions.';

    try {
      const contentResponse = await fetch(
        `http://127.0.0.1:5555/chat/get-response`,
        {
          method: "POST",
          headers: {
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseName: courseID, query: query }),
        }
      );

      const responseData = await contentResponse.json();

      
      const responseString = responseData.response;

      // Wrap the string in square brackets to form a JSON array
      const jsonArrayString = `[${responseString}]`;

      // Parse the string into a JSON object
      const jsonArray = JSON.parse(jsonArrayString);
      console.log(jsonArray);

      setQuizData(jsonArray);
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  };

  useEffect(() => {
    getQuestionsAnswers();
  }, []);

  return (
    quizData ? (
      <div className="flex">
          <SideBar/>
          <div className="w-full flex justify-center">
              <QuizQuestion 
              question={quizData[quizIndex].question}
              answerArr={quizData[quizIndex].choices}
              id={1}
              correctAns={quizData[quizIndex].answer}
              nextQnToggle={triggerFn}/>
          </div>
          
      </div>
    ) : (
      <Progress value={progress} className="w-[60%]" />
    )
  )
}
export default QuizHome;

// questionArr[currentQ]
