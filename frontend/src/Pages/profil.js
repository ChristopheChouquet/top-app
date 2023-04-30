import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import UserInfos from "../Components/UserInfosWall";

function Profil() {

    // Stockage des users
    const [ user, setUser ] = useState([]);
    // Stockage des tops
    const [top, setTop] = useState([]);

    const userId = JSON.parse(localStorage.getItem("userData")).userId;

    const cookie = document.cookie;

    // Recherche du token d'authentification dans le cookie
    const token = cookie.split(';').find(c => c.trim().startsWith(`auth`));

    // Extrait la valeur du token d'authentification
    const tokenValue = token ? token.split('=')[1] : null;

    useEffect(() => {

        

        axios({
            method: 'get',
            url: 'http://localhost:5000/profil',
            headers: {
              Authorization: 'Bearer ' + tokenValue
            }
        }).then((response) => {
            
            setUser(response.data);

            const date = new Date(response.data.date);
            const jour = ('0' + date.getDate()).slice(-2);
            const moisEnLettres = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
            const mois = moisEnLettres[date.getMonth()];
            const annee = date.getFullYear().toString();  
            const dateFormatee = `${jour} ${mois} ${annee}`;

            setUser(prevState => ({ ...prevState, date: dateFormatee }));


        }).catch((error) => {  
            console.error(error);
        }); 


        axios({
            method: 'get',
            url: 'http://localhost:5000/tops'
        }).then((response) => {
    
            // Supprimer l'utilisateur connecté de la liste 
            const filteredTops = response.data.filter(top => top.userId === userId);
    
            const newTop = filteredTops.map((item) => {
                const date = new Date(item.date);
                const jour = ('0' + date.getDate()).slice(-2);
                const mois = ('0' + (date.getMonth() + 1)).slice(-2);
                const annee = date.getFullYear().toString().substr(-2);  
                const dateFormatee = `${jour}/${mois}/${annee}`;
                return {
                  ...item,
                  date: dateFormatee,
                };
            });
            setTop(newTop);
    
        }).catch((error) => { 
            console.error(error);
        });

    }, []);




    return(
        <>
            <Header/>
                <div id="profil" className="pt-20 w-full">
                    
                    {/* Gestion de l'avatar et de la banniere */}
                    <div className="flex relative mb-10">
                        <div className="w-full text-center relative flex flex-col justify-center">
                            <img src={user.banniere} alt="banniere" className="max-h-28"/>
                        </div>
                        <div className="absolute z-10 left-0 bg-white h-full width-custom-mask-profil"></div>
                        <div className="w-1/5 absolute z-10 left-0">
                            <img src={user.avatar} alt="avatar" className="rounded-full border-8 border-tertiary-100"/>
                        </div>
                    </div>  

                    <div className='m-10'>

                        {/* Gestion des infos de l'utilisateur */}
                        <div className="flex justify-between items-start">
                            <div className="my-2 leading-5">
                                <h2 className='text-left font-bold text-3xl font-secondary'>{user.pseudo}</h2> 
                                <h3 className='text-left font-normal text-2xl mb-6'>@{user.tagName}</h3> 
                                <p className='text-left font-normal text-tertiary-300'>Depuis le {user.date}</p> 
                            </div>

                            <div>
                                <button type="submit" id="buttonSubmit" className="bg-primary text-tertiary-100 rounded-full px-6 py-2 mb-5 w-full">
                                Modifier
                                </button>
                            </div>
                        </div>                     
                        
                        {/* On affiche tous les centres d'inétrets */}
                        {Array(10).fill(null).map((_, i) => user.motCles && user.motCles[`chip${i+1}`] && (
                            <div key={`chip${i+1}`} className="rounded-full bg-secondary px-6 py-2 inline-flex justify-between mt-2">
                                <span className="text-primary font-bold inline">{user.motCles[`chip${i+1}`]}</span>
                            </div>
                        ))}

                        <hr className="border-1 my-5"/>

                        <div id="recherchePostPersonne" className="grid grid-cols-3 px-16 text-center">
                            <div 
                                id="prersonnes" 
                                className="cursor-pointer"
                                //onClick={FilterUsers}
                            >
                                <h1 className="text-secondary font-normal">TOPS</h1>
                            </div> 
                            <div 
                                id="posts"
                                className="cursor-pointer"
                                //onClick={FilterTops}
                            >
                                <h1 className="text-tertiary-300 font-normal">WALL</h1>
                            </div>
                            <div 
                                id="posts"
                                className="cursor-pointer"
                                //onClick={FilterLikes}
                            >
                                <h1 className="text-tertiary-300 font-normal">LIKES</h1>
                            </div>
                            <div>
                                <hr id="slider" className="slide-in border-2 border-secondary"></hr>
                            </div>
                            
                        </div>
                        
                        <div className="flex flex-col items-center">
                            {top.map(top => (
                            
                                <div key={top._id} className="w-4/5 border-2 border-secondary flex flex-wrap p-2.5 my-2 rounded-lg text-left justify-start">
                                    <div>
                                        <UserInfos userId={top.userId} motCle={top.motCle} titre={top.titre}/>

                                        <div className="flex justify-start">
                                            <button type="submit" className="bg-primary text-tertiary-100 rounded-3xl px-6 py-2 m-3 ml-0 font-nunito font-bold">Top détaillé</button>
                                        </div>

                                        {/* Liste des choix */}
                                        {Array(10).fill(null).map((_, i) => top.choix[`choix${i+1}`] && (
                                            <p className="text-md font-medium" key={i}>
                                                <span className="font-nunito font-black text-primary">{i+1}&#x2802;</span>{top.choix[`choix${i+1}`]}
                                            </p>
                                        ))}
                                    </div>
                                    <div className='p-2.5 flex w-5/6 justify-around'>
                                        <div>
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 35.9 35.9" fill="none" strokeWidth={1.5} stroke="#1D1D1B">
                                                <g>
                                                    <ellipse transform="matrix(0.5257 -0.8507 0.8507 0.5257 8.7697 28.1674)" cx="29.6" cy="6.2" rx="5.5" ry="5.5"/>
                                                    <ellipse transform="matrix(0.5257 -0.8507 0.8507 0.5257 -11.176 39.2879)" cx="29.6" cy="29.7" rx="5.5" ry="5.5"/>
                                                    <circle cx="6.2" cy="18" r="5.5"/>
                                                    <line x1="15.4" y1="13" x2="19.9" y2="10.7"/>
                                                    <line x1="15.4" y1="22.8" x2="19.9" y2="25.1"/>
                                                </g>
                                            </svg>
                                        </div>
                                        

                                        <div className="flex">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40.5 35.8" fill="none" strokeWidth={1.5} className="w-6 h-6">
                                                <path stroke="#1D1D1B" d="M20.2,35l15.9-16.3c2.2-1.9,3.6-4.7,3.6-7.8c0-5.6-4.4-10.1-9.9-10.1c-4.7,0-8.6,3.4-9.6,7.9
                                                c-1-4.5-4.9-7.8-9.6-7.8c-5.4,0-9.9,4.5-9.9,10.1c0,3.1,1.3,5.8,3.5,7.7l10.9,11.2"/>
                                            </svg>&nbsp;<span className="text-sm">1</span>
                                        </div>
                                        
                                        <div className="flex">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 36.1 36.6" fill="none" strokeWidth={1.5}  className="w-6 h-6">
                                                <path stroke="#1D1D1B" d="M4,28.1l-2.5,7.8l7.7-2.9c2.6,1.5,5.6,2.4,8.8,2.4c9.6,0,17.3-7.8,17.3-17.3c0-9.6-7.8-17.3-17.3-17.3
                                                C8.5,0.8,0.8,8.5,0.8,18.1c0,0.8,0.1,1.7,0.2,2.5"/>
                                            </svg>&nbsp;<span className="text-sm">1</span>
                                        </div>
                                        
                                        <div className="flex">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 36.7 36.7" className="w-6 h-6">
                                                <g>
                                                    <path fill="#1D1D1B" d="M36.7,18.3c0,10.1-8.2,18.3-18.3,18.3C8.2,36.7,0,28.5,0,18.3C0,8.2,8.2,0,18.3,0C28.5,0,36.7,8.2,36.7,18.3"
                                                        />
                                                    <path fill="#FFFFFF" d="M0.6,22.9C0.8,24,1.2,25,1.7,26H35c0.5-1,0.8-2,1.1-3.1H0.6z"/>
                                                    <path fill="#FFFFFF" d="M15,12.3h6.7c0.5,0,0.9-0.1,1.2-0.4c0.3-0.3,0.4-0.6,0.4-1.1c0-0.5-0.1-0.9-0.4-1.2c-0.3-0.3-0.7-0.4-1.2-0.4
                                                        H15c-0.5,0-0.9,0.1-1.2,0.4c-0.3,0.3-0.4,0.7-0.4,1.2c0,0.5,0.1,0.9,0.4,1.1C14,12.2,14.4,12.3,15,12.3"/>
                                                    <path fill="#FFFFFF" d="M29,16H7.6c-0.5,0-0.9,0.1-1.2,0.4C6.1,16.7,6,17.1,6,17.6c0,0.5,0.1,0.9,0.4,1.1c0.3,0.3,0.7,0.4,1.2,0.4H29
                                                        c0.5,0,0.9-0.1,1.2-0.4c0.3-0.3,0.4-0.6,0.4-1.1c0-0.5-0.1-0.9-0.4-1.2C30,16.2,29.6,16,29,16"/>
                                                </g>
                                            </svg>&nbsp;<span className="text-sm">1</span>
                                        </div>


                                    </div> 
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            <Footer SelectedIcon={null}/>
        </>
    )
}

export default Profil;