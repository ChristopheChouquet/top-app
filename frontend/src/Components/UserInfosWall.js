import { useState, useEffect } from 'react';
import axios from 'axios';

function UserInfos({ userId, motCle, titre }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchData() {

        axios({
            method: 'get',
            url: `http://localhost:5000/user/${userId}`
        }).then((response) => {
            const newUser = response.data.map((item) => {
                const date = new Date(item.date);
                const jour = ('0' + date.getDate()).slice(-2);
                const mois = ('0' + (date.getMonth() + 1)).slice(-2);
                const annee = date.getFullYear().toString();  
                const dateFormatee = `${jour}/${mois}/${annee}`;
                return {
                  ...item,
                  date: dateFormatee,
                };
            });
            setUser(newUser);
        }).catch((error) => { 
            console.error(error);
        });
    }

    fetchData();
  }, [userId]);


  return (
    <>
        {user.map(user => (
            <div key={user._id} className='flex items-center'>
                <div>
                    <img className="inline-block h-12 w-12 mr-2 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                </div>
                    <div>
                    <p className="font-semi">{user.pseudo}<span className="font-normal text-tertiary-300"> @{user.tagName} / {user.date}</span></p>
                    <p className="text-primary font-bold font-myriad">{titre}</p>
                    <div className="flex flex-wrap">
                        {Array(10).fill(null).map((_, i) => motCle[`chip${i+1}`] && (
                            <p className="text-tertiary-300 text-sm " key={i}>#{motCle[`chip${i+1}`]}&nbsp;</p>
                        ))}
                    </div>
                </div>
                
            </div>
        ))}
    </>
  );
}

export default UserInfos;
