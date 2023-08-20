import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import AffichageTops from "../Components/AffichageTops";
import RechercheGestionAbo from "../Components/RechercheGestionAbo";

function Profil() {

    // Stockage des users
    const [ user, setUser ] = useState([]);
    // on vérifie l'était du filtre des tops
    const [filterTops, setFilterTops] = useState(true);
    // on vérifie l'était du filtre du wall
    const [filterWall, setFilterWall] = useState(false);
    // on vérifie l'était du filtre des likes
    const [filterLikes, setFilterLikes] = useState(false);
    // Je récupère le tagName de l'URL
    const { tagName } = useParams();
    // Stockage des abonnements
    const [abo, setAbo] = useState([]); 

    const userId = JSON.parse(localStorage.getItem("userData")).userId;

    useEffect(() => {
    
        setFilterTops(true);
        setFilterWall(false);
        setFilterLikes(false);

        axios({
            method: 'get',
            url:   process.env.REACT_APP_BACKEND_URL + `/profil/${tagName}`
        }).then((response) => {
            
            setUser(response.data);

            const date = new Date(response.data.date);
            const jour = ('0' + date.getDate()).slice(-2);
            const moisEnLettres = [
                'janvier',
                'février',
                'mars',
                'avril',
                'mai', 
                'juin',
                'juillet',
                'août',
                'septembre',
                'octobre',
                'novembre',
                'décembre'
            ];
            const mois = moisEnLettres[date.getMonth()];
            const annee = date.getFullYear().toString();  
            const dateFormatee = `${jour} ${mois} ${annee}`;

            setUser(prevState => ({ ...prevState, date: dateFormatee }));


        }).catch((error) => {  
            console.error(error);
        }); 

        

    }, [tagName]);



    useEffect(() => { 

        axios({
            method: 'get',
            url:   process.env.REACT_APP_BACKEND_URL + '/recherche'
        }).then((response) => {
            
    
            // Récupération des abonnements actifs de l'utilisateur connecté
            const currentUser = response.data.filter(user => user._id === userId)[0];
            const currentUserAbo = currentUser ? currentUser.abonnement : [];
            setAbo(currentUserAbo);
                
    
        }).catch((error) => {  
            console.error(error);
        }); 
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //On initialise l'état de la checkbox 
    useEffect(() => {
        const checkbox = document.getElementById(`abonne_${user._id}`);
        if (checkbox) {
            checkbox.checked = abo.includes(user._id);
        }
    }, [abo, user._id]);




    //Filtrage en fonction du titre du menu select
    function setFilterStates(filter) {
        setFilterTops(filter === 'tops');
        setFilterWall(filter === 'wall');
        setFilterLikes(filter === 'likes');
    }

    function abonnement(etat, userClicked) {
        
        let etatAbo = '';
    
        etatAbo = etat.target.checked ? "add" : "del";
    
        const AboInfos = {
            UserCurrent: userId,
            UserAbo: userClicked
        };

         axios({
            method: 'post',
            url:   process.env.REACT_APP_BACKEND_URL + `/${etatAbo}UserAbo`,
            data: AboInfos
        }).then((response) => {
            setAbo(prevState => {
                return etatAbo === "add" ? [...prevState, userClicked] : prevState.filter(item => item !== userClicked);
            });
        }).catch((error) => {  
            console.error(error);
        });
    }




    return(
        <>
            <Header/>
                <div id="profil" className="pt-20 w-full">
                    
                    {/* Gestion de l'avatar et de la banniere */}
                    <div className="flex relative mb-10">
                        <div className="w-full text-center relative flex flex-col justify-center">
                            <img src={process.env.PUBLIC_URL + '/' + user.banniere} alt="banniere" className="max-h-28"/>
                        </div>
                        <div className="absolute z-10 left-0 bg-white h-full width-custom-mask-profil"></div>
                        <div className="w-1/5 absolute z-10 left-0">
                            <img src={process.env.PUBLIC_URL + '/' + user.avatar} alt="avatar" className="rounded-full border-8 border-tertiary-100  h-28 w-28"/>
                        </div>
                    </div>  

                    <div className='m-10'>

                        {/* Gestion des infos de l'utilisateur */}
                        <div className="flex justify-between items-start">
                            <div className="my-2 leading-5">
                                <h2 className='text-left font-bold text-3xl font-secondary'>{user.pseudo}</h2>
                                <h3 className='text-left font-normal text-2xl mb-6'>@{user.tagName}</h3>
                                    <div className="flex items-center">
                                        <svg version="1.1" id="Calque_1" x="0px" y="0px" viewBox="0 0 19.2 16.4" enableBackground="new 0 0 19.2 16.4" className="stroke-tertiary-300 w-6 h-6">
                                            <line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="0.5" y1="5.4" x2="18.7" y2="5.4"/>
                                            <line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="13.9" y1="3.1" x2="13.9" y2="0.6"/>
                                            <line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="5.3" y1="0.6" x2="5.3" y2="3.1"/>
                                            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M15.6,15.9h0.8
                                                c1.3,0,2.3-1,2.3-2.3V4.2c0-1.3-1-2.3-2.3-2.3H2.8c-1.3,0-2.3,1-2.3,2.3v9.4c0,1.3,1,2.3,2.3,2.3h9"/>
                                        </svg>
                                        <p className='text-left font-normal text-tertiary-300 pl-2'>
                                            Depuis le {user.date}
                                        </p> 
                                    </div> 
                                
                            </div>

                            <div>
                                {user._id === userId 
                                    ? 
                                    <NavLink
                                        to="/profilEdit"
                                        className="bg-primary text-tertiary-100 rounded-full px-6 py-2 mb-5 w-full flex justify-center btnProfilModif"
                                        >
                                        Modifier
                                    </NavLink> 
                                    : 
                                    <label htmlFor={`abonne_${user._id}`} className="flex justify-center items-center rounded-md cursor-pointer">
                                        <input 
                                            id={`abonne_${user._id}`} 
                                            type="checkbox" 
                                            className="hidden peer"
                                            onChange={(event) => abonnement(event, user._id)}
                                        />
                                        <span className="font-bold border border-secondary px-4 py-2 rounded-full dark:bg-tertiary-100 peer-checked:dark:bg-secondary text-primary text-center checkAbo">
                                            { abo.includes(user._id) ? "ABONNÉ(E)" : "S'ABONNER" }
                                        </span> 
                                    </label>   
                                    
                                }


                            </div>
                        </div>                     
                        
                        {/* On affiche tous les centres d'inétrets */}
                        {Array(10).fill(null).map((_, i) => user.motCles && user.motCles[`chip${i+1}`] && (
                            <div key={`chip${i+1}`} className="rounded-full bg-secondary px-6 py-2 inline-flex justify-between mt-2">
                                <span className="text-primary font-bold inline">{user.motCles[`chip${i+1}`]}</span>
                            </div>
                        ))}

                        <hr className="border-1 my-5"/>

                        {/* Menu de séléction */}
                        <div id="recherchePostPersonne" className="grid grid-cols-3 px-16 text-center">
                            <div 
                                id="prersonnes" 
                                className={"cursor-pointer"}
                                onClick={() => setFilterStates('tops') }
                            >
                                <h1 className={filterTops ? "font-bold text-secondary" : " font-bold animate-text text-tertiary-300 "}>TOPS</h1>
                            </div> 
                            <div 
                                id="posts"
                                className={"cursor-pointer"}
                                onClick={() => setFilterStates('wall') }
                            >
                                <h1 className={filterWall ? "font-bold text-secondary" : " font-bold animate-text text-tertiary-300 "}>ABOS</h1>
                            </div>
                            <div 
                                id="likes"
                                className={"cursor-pointer"}
                                onClick={() => setFilterStates('likes') }
                            >
                                <h1 className={filterLikes ? "font-bold text-secondary" : " font-bold animate-text text-tertiary-300 "}>LIKES</h1>
                            </div>
                            <div>
                                <hr
                                    id="slider"
                                    className={
                                        `slide-in border-2 border-secondary 
                                            ${filterTops ? '' : 'active'} 
                                            ${filterWall ? 'active' : ''} 
                                            ${!filterTops && !filterWall ? 'end' : ''}`
                                        }
                                ></hr>
                            </div>

                            
                        </div>
                        
                        { filterTops && <AffichageTops userIdProfil={user._id}/> }
                        { filterWall && <RechercheGestionAbo searchValue={''}  profilID={user._id}/> }
                        { filterLikes && <AffichageTops userIdProfilLike={user._id}/> }

                    </div>

                </div>
            <Footer SelectedIcon={null}/>
        </>
    )
}

export default Profil;