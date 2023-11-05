import SideBar from "./SideBar";
import QuizQuestion from "./QuizQuestion";
import { useState } from "react";
function QuizHome() {
    const [currentQ, setcurrentQ] = useState(1);
    return (
        <div className="flex">
            <SideBar/>
            <QuizQuestion/>
        </div>
    )
}
export default QuizHome;

// questionArr[currentQ]