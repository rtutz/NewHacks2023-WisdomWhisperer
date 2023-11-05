import Banner from './components/Banner'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import AudioInput from './components/AudioInput';

function App() {
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-4'>
        <AudioInput />
      </div>
      {/* <Router>
        <Routes>
          <Route exact path='/' element={<Banner/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
