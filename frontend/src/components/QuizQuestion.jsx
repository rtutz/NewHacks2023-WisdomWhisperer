import { useState } from "react";
import { Button } from "@/components/ui/button";
import FAB from './FAB';

function QuizQuestion({ question, answerArr, id, correctAns, nextQnToggle }) {
  const [correct, setCorrect] = useState(null);
  const [selectionArr, setSelectionArr] = useState(() =>
    Array(answerArr.length).fill(false)
  );

  const handleButtonClick = () => {
    // Add a 1-second delay before calling the function
    setTimeout(() => {
      nextQnToggle();
    }, 1000); // 1000 milliseconds = 1 second
  };

  const handleSelection = (index) => {
    const newSelectionArr = Array(answerArr.length).fill(false);
    newSelectionArr[index] = true;
    setSelectionArr(newSelectionArr);
  };
  const checkAns = () => {
    console.log(selectionArr);
    const trueIndex = selectionArr.findIndex((value) => value === true);
    if (answerArr[trueIndex] == correctAns){
      setCorrect(true);
    }
    else {
      setCorrect(false)
      setTimeout(() => {
        setCorrect(null);
      }, 500);
    }
    handleButtonClick()
  };

  return (
    <div>
      <div className="flex flex-col justify-center space-y-2 min-h-screen">
        <h2 className="text-4xl font-bold text-black dark:text-white">
          Question {id}
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-300">{question}</p>
        {answerArr.map((answer, index) => (
          <button
            className={`flex flex-row rounded-md border items-center p-4 gap-4 ${
              selectionArr[index] ? "border-zinc-800" : "border-gray-300"
            }`}
            key={index}
            onClick={() => handleSelection(index)}
          >
            <label>{answer}</label>
          </button>
        ))}
        <Button
          size="lg"
          type="button"
          variant="secondary"
          onClick={checkAns}
          className={`fixed bottom-8 right-8 ${
            correct === true ? "bg-green-500" : correct === false ? "bg-red-300" : ""
          } ${
            correct === true ? "hover:bg-green-500" : correct === false ? "hover:bg-red-300" : ""
          }`}
        >
          Check Answer
        </Button>
        <FAB/>
      </div>
    </div>
  );
}

export default QuizQuestion;
