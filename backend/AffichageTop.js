import axios from "axios";
import { useEffect, useState } from "react";
import GestionLike from "./GestionLike";
import { NavLink } from "react-router-dom";
import GestionCommentaires from "./GestionCommentaires";

function AffichageTop({ IDTop }) {

    // Stockage des infos du top  
        const [infosTop, setInfosTop] = useState([]);
    // Stockage des infos du createur du top  
        const [infosTopMaker, setInfosTopMaker] = useState([]);
    //Chargement des datas
        const [loading, setLoading] = useState(true);
    //On récupère l'iD du user connecté
        const currentUserId = JSON.parse(localStorage.getItem("userData")).userId;

    useEffect(() => {

        // Récuperation infos top  
        axios({
            method: 'get',
            url:   process.env.REACT_APP_BACKEND_URL + `/tops/${IDTop}`
        }).then((response) => {

            const date = new Date(response.data[0].date);
            const jour = ('0' + date.getDate()).slice(-2);
            const mois = ('0' + (date.getMonth() + 1)).slice(-2);
            const annee = date.getFullYear().toString();  
            const dateFormatee = `${jour}/${mois}/${annee}`;

            const nouvelleInfosTop = { ...response.data[0], date: dateFormatee };
            setInfosTop(nouvelleInfosTop);

            // Récuperation infos créateur du top 
            axios({
                method: 'get',
                url:   process.env.REACT_APP_BACKEND_URL + `/user/${response.data[0].userId}`
            }).then((response) => {
    
                setInfosTopMaker(response.data[0]);
                setLoading(false); // fin du chargement des données après 5 secondes 
    
            }).catch((error) => { 
                console.error(error);
            }); 

        }).catch((error) => { 
            console.error(error);
        }); 

      
    }, []);

        
 

    return(
        <>
            <div>
               
                
                {loading ? (
                    <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 100 100" className="fill-primary pt-20 mx-auto w-20">
                        <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                            <animateTransform 
                            attributeName="transform" 
                            attributeType="XML" 
                            type="rotate"
                            dur="1s" 
                            from="0 50 50"
                            to="360 50 50" 
                            repeatCount="indefinite" />
                        </path>
                    </svg>
                ) : (
                <div id="home" className="flex flex-wrap justify-center mb-16 pt-20">
     
                    <div key={infosTop._id} id={infosTop._id} className="w-4/5 border-2 border-secondary flex flex-wrap p-2.5 my-2 rounded-lg text-left justify-start">
                        <div>

                            <NavLink to={`/profil/${infosTopMaker.tagName}`}>
                                <div className="flex">
                                    <div>
                                        <img 
                                            className="inline-block h-12 w-12 mr-2 rounded-full ring-2 ring-white"
                                            src={process.env.PUBLIC_URL + '/' + infosTopMaker.avatar}
                                            alt={`Avatar de ${infosTopMaker.pseudo}`}
                                        />
                                    </div>
                                    
                                    <div>
                                        <p className="font-semi">{infosTopMaker.pseudo}<span className="font-normal text-tertiary-300"> @{infosTopMaker.tagName} / {infosTop.date}</span></p>
                                        <p className="text-primary font-bold font-myriad">{infosTop.titre}</p>
                                        <div className="flex flex-wrap">
                                            {Array(10).fill(null).map((_, i) => infosTop.motCle[`chip${i+1}`] && (
                                                <p className="text-tertiary-300 text-sm " key={i}>#{infosTop.motCle[`chip${i+1}`]}&nbsp;</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                            
                            <div className="flex justify-start">
                                <button type="submit" className="bg-primary text-tertiary-100 rounded-3xl px-6 py-2 m-3 ml-0 font-nunito font-bold">Top détaillé</button>
                            </div>

                            {/* Liste des choix */}
                            {Array(10).fill(null).map((_, i) => infosTop.choix[`choix${i+1}`] && (
                                <p className="text-md font-medium" key={i}>
                                    <span className="font-nunito font-black text-primary">{i+1}&#x2802;</span>{infosTop.choix[`choix${i+1}`]}
                                </p>
                            ))}
                        </div>

                        <div className='p-2.5 flex w-5/6 justify-around'>
                            {/* Share */}
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
                            
                            {/* like */}
                            <GestionLike currentTopId={infosTop._id} currentUserId={currentUserId}/>
                            
                            {/* commentaires */}
                            <GestionCommentaires currentTopId={infosTop._id} currentUserId={currentUserId}/>

                            {/* Same fav */}
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
                
                </div>
                )}
            </div>      
        </>

        
        
    )
}

export default AffichageTop;