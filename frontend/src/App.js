import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginCreate from './Pages/loginCreate';
import Login from './Pages/login';
/* import Header from './Components/Header';
import CreateTopInput from './Components/CreateTopInput';
import Footer from './Components/Footer';
import Home from './Pages/home'; */

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logincreate' element={<LoginCreate/>}/>
          {/* <Route path='/' element={<Home />}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
