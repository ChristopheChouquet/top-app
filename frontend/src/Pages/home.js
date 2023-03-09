import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loader from "./loader";

function Home() {

    // Stockage des tops
        const [top, setTop] = useState([]); 
    //Chargement des datas
        const [loading, setLoading] = useState(true);

    useEffect(() => {

            


        axios({
            method: 'get',
            url: 'http://localhost:5000/tops'
        }).then((response) => {
            const newTop = response.data.map((item) => {
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
            setTimeout(() => {
                setLoading(false); // fin du chargement des données après 5 secondes
            }, 2000);
        }).catch((error) => { 
            console.error(error);
        }); 

        //Gestion des icons du footer
            const footerIconSelector = document.querySelector('#footer > div > div > a > *');
            const selectAllSVGElement = footerIconSelector.querySelectorAll('*');
            selectAllSVGElement.forEach((element) => {
                element.classList.remove('stroke-tertiary-300');
                element.classList.add('stroke-primary');
            });
            
    }, []);


    return(
        <>

        {/* SYSTEME DE LAODER ANCIEN */}
        {/* <div>
            {loading ? (
                <Loader/>
            ) : (
            <div>
                <Header/>
            
                    <div id="home" className="flex flex-wrap justify-center mb-16 mt-16">
                    {top.map(top => (
                        <div key={top._id} className="w-4/5 border-2 border-secondary flex flex-wrap p-2.5 my-2 rounded-lg text-left justify-start">
                            <div>
                                <div className="flex items-center">
                                    <img className="inline-block h-12 w-12 mr-2 rounded-full ring-2 ring-white"
                                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                    <div>
                                        <p className="font-semi">Pseudo<span className="font-normal text-tertiary-300">@login / {top.date}</span></p>
                                        <p className="text-primary font-bold">{top.titre}</p>
                                        <div className="flex flex-wrap">
                                            {Array(10).fill(null).map((_, i) => top.motCle[`chip${i+1}`] && (
                                                <p className="text-tertiary-300 text-sm" key={i}>#{top.motCle[`chip${i+1}`]}&nbsp;</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {Array(10).fill(null).map((_, i) => top.choix[`choix${i+1}`] && (
                                    <p className="font-medium" key={i}><span className="font-bold text-primary">{i+1} &#183;</span> {top.choix[`choix${i+1}`]}</p>
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
                <Footer/>
            </div>
            )}
        </div> */}



        <div>
            <Header/>
            {loading ? (
                <Loader/>
            ) : (
            <div>
                <div id="home" className="flex flex-wrap justify-center mb-16 mt-16">
                {top.map(top => (
                    <div key={top._id} className="w-4/5 border-2 border-secondary flex flex-wrap p-2.5 my-2 rounded-lg text-left justify-start">
                        <div>
                            <div className="flex items-center">
                                <img className="inline-block h-12 w-12 mr-2 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <div>
                                    <p className="font-semi">Pseudo<span className="font-normal text-tertiary-300">@login / {top.date}</span></p>
                                    <p className="text-primary font-bold">{top.titre}</p>
                                    <div className="flex flex-wrap">
                                        {Array(10).fill(null).map((_, i) => top.motCle[`chip${i+1}`] && (
                                            <p className="text-tertiary-300 text-sm" key={i}>#{top.motCle[`chip${i+1}`]}&nbsp;</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {Array(10).fill(null).map((_, i) => top.choix[`choix${i+1}`] && (
                                <p className="font-medium" key={i}>
                                    {top.choix[`choix${i+1}`]}
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
            )}
            <Footer/>
        </div>
            
        </>

        
        
    )
}

export default Home;