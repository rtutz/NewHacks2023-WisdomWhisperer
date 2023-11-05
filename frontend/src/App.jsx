import Banner from './components/Banner'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import CoursePage from './components/CoursePage';
import Chat from './components/Chat';
import Test from './components/test';

function App() {
  return (
    <>
      {/* <div className='flex flex-col justify-center items-center gap-4'>
        <QuizQuestion question={"Prove this transformation is linear"} answerArr={["Answer 1", "Answer 3"]} id={1} correctAns={"Answer 2"}/>
      </div> */}
      <Router>
    <Routes>
      <Route exact path='/' element={<Banner/>}/>
      <Route exact path='/home' element={<Home/>}/>
      <Route path='/home/:id' element={<CoursePage/>}/>
      <Route path='/home/:id/:id2' element={<Test/>}/>
      <Route exact path='/home/:id/chat' element={<Chat/>}/>
    </Routes>
</Router>
    </>
  );
}

export default App;
