import { useState } from 'react'
import QuizQuestion from './components/QuizQuestion'

function App() {

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-4'>
        <QuizQuestion question={"Prove this transformation is linear"} answer={"Answer here"} id={1}/>
      </div>
    </>
  )
}

export default App
