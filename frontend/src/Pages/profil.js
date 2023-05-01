import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import AffichageTops from "../Components/AffichageTops";

function Profil() {

    // Stockage des users
    const [ user, setUser ] = useState([]);

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

                        {/* Menu de séléction */}
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
                        
                        <AffichageTops userIdProfil={userId}/>

                    </div>

                </div>
            <Footer SelectedIcon={null}/>
        </>
    )
}

export default Profil;