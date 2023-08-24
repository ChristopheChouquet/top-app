import './styles/output.css';
import './styles/globalCSS.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginCreate from './Pages/loginCreate';
import Login from './Pages/login';
import TopCreate from './Pages/topCreate';
import Home from './Pages/home'; 
import Recherche from './Pages/recherche';
import Profil from './Pages/profil';
import UsersAdmin from './Pages/admin/users';
import FavDayAdmin from './Pages/admin/favDay';
import Loader from './Pages/loader';
import FavDay from './Pages/favDay';
import { UserProvider } from './UserContext';
import FormTopCreateFavDay from './Pages/admin/FormTopCreateFavDay';
import AffichageTops from './Components/AffichageTops';
import AffichageTop from './Components/AffichageTop';
import Top from './Pages/top';
import ProfilEdit from './Pages/profilEdit';

function App() {
  return (
    <div className="App mx-auto max-w-xl bg-tertiary-100 h-auto min-h-screen">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/topcreate' element={<TopCreate/>}/>
            <Route path='/recherche' element={<Recherche/>}/>
            <Route path='/loader' element={<Loader/>}/>
            <Route path='/favday' element={<FavDay/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profil/:tagName' element={<Profil/>}/>
            <Route path='/profiledit' element={<ProfilEdit/>}/>
            <Route path='/admin/users' element={<UsersAdmin/>}/>
            <Route path='/admin/favday' element={<FavDayAdmin/>}/>
            <Route path='/admin/topcreatefavday' element={<FormTopCreateFavDay/>}/>
            <Route path='/logincreate' element={<LoginCreate/>}/>
            <Route path='/affichagetops' element={<AffichageTops/>}/>
            <Route path='/affichagetop' element={<AffichageTop/>}/>
            <Route path='/top/:topId' element={<Top/>}/>
            <Route path='/' element={<Home />}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
