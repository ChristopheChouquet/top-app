import axios from "axios";
import { useEffect, useState } from "react";
import GestionLike from "./GestionLike";

function AffichageTops({ searchValue, userIdProfil }) {

    // Stockage all infos
        const [allInfos, setAllInfos] = useState([]);
    //Chargement des datas
        const [loading, setLoading] = useState(true);
    //On récupère l'iD du user connecté
        const currentUserId = JSON.parse(localStorage.getItem("userData")).userId;

    useEffect(() => {

        

        axios({
            method: 'get',
            url: 'http://localhost:5000/tops'
        }).then((response) => {
            // eslint-disable-next-line
            response.data.map((item) => {

                axios({
                    method: 'get',
                    url: `http://localhost:5000/user/${item.userId}`
                }).then((response) => {
                    
                    if (item.userId === response.data[0]._id) {

                        const date = new Date(item.date);
                        const jour = ('0' + date.getDate()).slice(-2);
                        const mois = ('0' + (date.getMonth() + 1)).slice(-2);
                        const annee = date.getFullYear().toString();  
                        const dateFormatee = `${jour}/${mois}/${annee}`;
                        
                        const RecupAllInfos = {
                            userId: item.userId, 
                            topId: item._id,
                            avatar: response.data[0].avatar,
                            pseudo: response.data[0].pseudo,
                            tagName: response.data[0].tagName,
                            date: dateFormatee,
                            keywords: item.motCle,
                            titre: item.titre,
                            choix: item.choix,
                            like: item.like   
                        }
                        
                        setAllInfos(allInfos => [...allInfos, RecupAllInfos]);
                        
                         
                    }
                }).catch((error) => { 
                    console.error(error);
                });
                
            });
            
            setLoading(false); // fin du chargement des données après 5 secondes         
        }).catch((error) => { 
            console.error(error);
        }); 

        
            
    }, []);


    // Utilisez la méthode filter() pour filtrer les tops en fonction de la recherche
    if (searchValue) {
        var filteredTops = allInfos.filter((top) => {
            const searchValueLowerCase = searchValue.toLowerCase();
            const pseudoLowerCase = top.pseudo.toLowerCase();
            const titreLowerCase = top.titre.toLowerCase();
            const motCleLowerCase = Object.values(top.keywords).flat().map(keyword => keyword.toLowerCase());

            const pseudoMatches = pseudoLowerCase.includes(searchValueLowerCase);
            const titreMatches = titreLowerCase.includes(searchValueLowerCase);
            const motCleMatches = motCleLowerCase.some(keyword => keyword.includes(searchValueLowerCase));
            return titreMatches || motCleMatches || pseudoMatches;
        });
    }else if(userIdProfil){
        filteredTops = allInfos.filter((top) => {
            const searchValueLowerCase = userIdProfil.toLowerCase();
            const userIdLowerCase = top.userId.toLowerCase();

            const userIdoMatches = userIdLowerCase.includes(searchValueLowerCase);
            return userIdoMatches;
        });
    }else{
        filteredTops = [...allInfos];
    }
        
 

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
                <div>
                    <div id="home" className="flex flex-wrap justify-center mb-16 pt-20">
                    {filteredTops.map(top => (
                        
                        <div key={top.topId} className="w-4/5 border-2 border-secondary flex flex-wrap p-2.5 my-2 rounded-lg text-left justify-start">
                            <div>

                                <div className="flex">
                                    <div>
                                        <img 
                                            className="inline-block h-12 w-12 mr-2 rounded-full ring-2 ring-white"
                                            src={top.avatar}
                                            alt={`Avatar de ${top.pseudo}`}
                                        />
                                    </div>
                                    
                                    <div>
                                        <p className="font-semi">{top.pseudo}<span className="font-normal text-tertiary-300"> @{top.tagName} / {top.date}</span></p>
                                        <p className="text-primary font-bold font-myriad">{top.titre}</p>
                                        <div className="flex flex-wrap">
                                            {Array(10).fill(null).map((_, i) => top.keywords[`chip${i+1}`] && (
                                                <p className="text-tertiary-300 text-sm " key={i}>#{top.keywords[`chip${i+1}`]}&nbsp;</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                    
                                
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
                                <GestionLike currentTopId={top.topId} currentUserId={currentUserId}/>
                                
                                {/* commentaires */}
                                <div className="flex">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 36.1 36.6" fill="none" strokeWidth={1.5}  className="w-6 h-6">
                                        <path stroke="#1D1D1B" d="M4,28.1l-2.5,7.8l7.7-2.9c2.6,1.5,5.6,2.4,8.8,2.4c9.6,0,17.3-7.8,17.3-17.3c0-9.6-7.8-17.3-17.3-17.3
                                        C8.5,0.8,0.8,8.5,0.8,18.1c0,0.8,0.1,1.7,0.2,2.5"/>
                                    </svg>&nbsp;<span className="text-sm">1</span>
                                </div>

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
                    ))}
                    </div>
                </div>
                )}
            </div>      
        </>

        
        
    )
}

export default AffichageTops;