import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import axios from 'axios';
import { NavLink, useNavigate    } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Header({userDonne}) {

    // initialisation de l'objet navigate
    const navigate = useNavigate(); 

    const [infosUser, setInfosUser] = useState("");


    useEffect(() => {

        //On récupère le cookie
            const cookie = document.cookie;
        // Recherche du token d'authentification dans le cookie
            const token = cookie.split(';').find(c => c.trim().startsWith(`auth`));
        // Extrait la valeur du token d'authentification
            const tokenValue = token ? token.split('=')[1] : null;
            var verifAuth = typeof tokenValue !== 'undefined' && tokenValue !== null ? true : false;
            !verifAuth && navigate('/login');

        //On récupère l'iD du user connecté
        const currentUserId = JSON.parse(localStorage.getItem("userData")).userId;



        axios({
            method: 'get',
            url:   process.env.REACT_APP_BACKEND_URL + `/user/${currentUserId}`
        }).then(function (response) {
            setInfosUser(response.data[0]);
        }).catch(() => { 
            
        });

    },[]);

    //Gestion de la connexion user
    function logout() {  

    // Récupérer tous les cookies
        var cookies = document.cookie.split(";");

    // supprimer les cookies
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        
        axios({
            method: 'post',
            url:   process.env.REACT_APP_BACKEND_URL + '/logout'
        }).then(function (response) {
            navigate('/login');
        }).catch(() => { 
            
        }); 
    }

  return (

    <header className='bg-secondary p-2.5 fixed top-0 w-screen mx-auto max-w-xl z-50'>
            <div className='grid-cols-3 flex justify-between'>
                <div>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button>
                                <img className="inline-block h-8 w-8 rounded-full"
                                    src={process.env.PUBLIC_URL + '/' + infosUser.avatar}
                                    alt="Avatar"
                                />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                {({ active }) => (     
                                       
                                    <NavLink to={`/profil/${infosUser.tagName}`}>
                                        <button
                                            type="button"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900 w-full text-left' : 'text-gray-700',
                                                'block px-4 py-2 text-sm w-full text-left'
                                            )}
                                        >
                                        Profil
                                        </button>
                                    </NavLink>
                                )}
                                </Menu.Item>
                                <Menu.Item>
                                {({ active }) => (
                                    <button 
                                        type="submit" 
                                        onClick={logout}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900 w-full text-left' : 'text-gray-700',
                                            'block px-4 py-2 text-sm w-full text-left'
                                        )}
                                    >
                                        Deconnexion
                                    </button>
                                )}
                                </Menu.Item>
                            </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <div>
                    <NavLink to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 0 53.8 23" className="fill-primary w-8 h-8">
                            <g>
                                <path d="M0,20.9c0,0.7,0.2,1.2,0.6,1.6s1,0.5,1.7,0.5h49.2c0.7,0,1.3-0.2,1.7-0.5c0.4-0.4,0.6-0.9,0.6-1.6
                                    c0-0.7-0.2-1.2-0.6-1.6c-0.4-0.4-1-0.5-1.7-0.5H2.3c-0.7,0-1.3,0.2-1.7,0.6C0.2,19.7,0,20.2,0,20.9"/>
                                <path d="M20,2.1c0,0.7,0.2,1.2,0.6,1.6s1,0.5,1.7,0.5h9.2c0.7,0,1.3-0.2,1.7-0.5c0.4-0.4,0.6-0.9,0.6-1.6
                                    c0-0.7-0.2-1.2-0.6-1.6c-0.4-0.4-1-0.5-1.7-0.5h-9.2c-0.7,0-1.3,0.2-1.7,0.6C20.2,0.9,20,1.5,20,2.1"/>
                                <path d="M10,11.5c0,0.7,0.2,1.2,0.6,1.6s1,0.5,1.7,0.5h29.2c0.7,0,1.3-0.2,1.7-0.5c0.4-0.4,0.6-0.9,0.6-1.6
                                    c0-0.7-0.2-1.2-0.6-1.6c-0.4-0.4-1-0.5-1.7-0.5H12.3c-0.7,0-1.3,0.2-1.7,0.6C10.2,10.3,10,10.8,10,11.5"/>
                            </g>
                        </svg>
                    </NavLink>
                </div>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 28.5 24.6" className="w-6 h-6">
                    <g>
                        <path fill="none" stroke="#6D00FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M3.6,22.4c0.1-0.7-0.4-1.3-1.1-1.4c-0.7-0.1-1.3,0.4-1.4,1.1c-0.1,0.7,0.4,1.4,1.1,1.4
                            C2.8,23.6,3.5,23.1,3.6,22.4z"/>
                        <polyline fill="none" stroke="#6D00FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="2.3,22.3 11.4,10 17,15.2 26.3,2.7 	"/>
                        <polygon fill="none" stroke="#6D00FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="24.5,2.1 27.2,4.2 27.5,1 	"/>
                    </g>
                </svg>
            </div>
        </header>


    
  )
}

export default Header;