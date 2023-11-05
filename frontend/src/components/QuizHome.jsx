import SideBar from "./SideBar";
import QuizQuestion from "./QuizQuestion";
import { useState } from "react";
function QuizHome() {
    const [currentQ, setcurrentQ] = useState(1);
    return (
        <div className="flex">
            <SideBar/>
            <div className="w-full flex justify-center">
                <QuizQuestion 
                question="What is the powerhouse of the cell?"
                answerArr={["Cytoplasm", "Mitochondria", "Dogs", "Cats"]}
                id={1}
                correctAns={"Mitochondria"}/>
            </div>
            
        </div>
    )
}
export default QuizHome;

// questionArr[currentQ]