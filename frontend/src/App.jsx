import Banner from './components/Banner'
import {BrowserRouter as Router, Route,Link, Routes} from 'react-router-dom';



function App() {

  return (
    <>
      {/* <div className='flex flex-col justify-center items-center gap-4'>
        <QuizQuestion question={"Prove this transformation is linear"} answerArr={["Answer 1", "Answer 3"]} id={1} correctAns={"Answer 2"}/>
      </div> */}
      <Router>
        <Routes>
          <Route exact path='/' element={<Banner/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
