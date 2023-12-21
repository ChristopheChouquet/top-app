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
import axios from 'axios';
import { useState } from 'react';


export function RecupInfosTop(IDTop) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: process.env.REACT_APP_BACKEND_URL + `/tops/${IDTop}`
    })
      .then((response) => {

        const date = new Date(response.data[0].date);
        const jour = ('0' + date.getDate()).slice(-2);
        const mois = ('0' + (date.getMonth() + 1)).slice(-2);
        const annee = date.getFullYear().toString();  
        const dateFormatee = `${jour}/${mois}/${annee}`;

        const nouvelleInfosTop = { ...response.data[0], date: dateFormatee };
        resolve(nouvelleInfosTop);

      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export function RecupInfosUser(IDUser) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url:   process.env.REACT_APP_BACKEND_URL + `/user/${IDUser}`
    }).then((response) => {

      resolve(response.data[0]);

    }).catch((error) => { 
        console.error(error);
    }); 
  });
}


export function RecupCommsTop(IDTop) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url:   process.env.REACT_APP_BACKEND_URL + `/commentaires/${IDTop}`,
    }).then((response) => {

      resolve(response.data[0].commentaires);

    }).catch((error) => { 
        console.error(error);
    }); 
  });
}




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
            <Route path='/affichagetop' element={<AffichageTop RecupInfosUser={RecupInfosUser}/>}/>
            <Route path='/top/:topId' element={<Top/>}/>
            <Route path='/' element={<Home />}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
