// UserContext.js
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userDonne, setUserDonne] = useState(null);

  useEffect(() => {



    // Vérifie si les données sont stockées en cache
    const cachedData = localStorage.getItem('userData');
    if (cachedData) {
      setUserDonne(JSON.parse(cachedData));
    } else {
      console.log('test');
      const userId = localStorage.getItem('userId');
      // Récupère les données depuis le serveur et les stocke en cache
      axios({
        method: 'get',
        url: `http://localhost:5000/user/${userId}`
    }).then((response) => {
        setUserDonne(response.data);
    }).catch((error) => { 
        console.error(error);
    }); 
    }
  }, []);



  return (
    <UserContext.Provider value={{ userDonne, setUserDonne }}>
      {children}
    </UserContext.Provider>
  );
};