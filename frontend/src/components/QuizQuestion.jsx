import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

function QuizQuestion({question, answerArr, id, correctAns}) {
  const [correct, setCorrect] = useState(false)

  return (
    <>
      <div className="flex flex-col space-y-2">
          <h2 className="text-xl font-bold text-black dark:text-white">Question {id}</h2>
          <p className="text-base text-gray-600 dark:text-gray-300">{question}</p>
          <Textarea />
          <Input placeholder="Your answer here..." type="text" />
          <Button type="button" variant="outline">
            Check Answer
          </Button>
        </div>
    </>
  )
}

export default QuizQuestion