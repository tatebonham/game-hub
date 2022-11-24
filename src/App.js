import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './scss/styles.js';

import NavBar from './components/partials/NavBar'
import DungeonDiver from './components/pages/dungeondiver/index'
import Home from './components/pages/Home'

function App() {

  return (
    <div className='routes'>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/dungeondiver' element={<DungeonDiver />} />
            </Routes>
            {/* <Footer/> */}
          </BrowserRouter>
    </div>
  );
}

export default App;
