import './styles/output.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginCreate from './Pages/loginCreate';
import Login from './Pages/login';
import TopCreate from './Pages/topCreate';
import Home from './Pages/home'; 
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/header' element={<Header/>}/>
          <Route path='/topcreate' element={<TopCreate/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logincreate' element={<LoginCreate/>}/>
          <Route path='/' element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
