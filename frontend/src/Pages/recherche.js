import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RechercheGestionAbo from "../Components/RechercheGestionAbo";
import AffichageTops from "../Components/AffichageTops";

function Recherche() {
     
    //Mise en place de la gestion du form avec useForm
    const {register, reset} = useForm();
    // initialisation de l'objet navigate
    const navigate = useNavigate(); 
    // Ajoutez un état local pour stocker la valeur de recherche
    const [searchValue, setSearchValue] = useState("");
    // on vérifie l'était du filtre personnes
    const [filterPersonneState, setfilterPersonneState] = useState(true);
    // on vérifie l'était du filtre top
    const [filterPostsState, setfilterTopsState] = useState(false);


    //On vérifie que l'utilisateur est bien connecté
    useEffect(() => {
        //On récupère le cookie
            const cookie = document.cookie;
        // Recherche du token d'authentification dans le cookie
            const token = cookie.split(';').find(c => c.trim().startsWith(`auth`));
        // Extrait la valeur du token d'authentification
            const tokenValue = token ? token.split('=')[1] : null;
            var verifAuth = typeof tokenValue !== 'undefined' && tokenValue !== null ? true : false;
            !verifAuth && navigate('/login');
            
    }, [navigate]); 
    


    function FilterUsers() {

        document.getElementById('slider').classList.remove('active');

        document.getElementById('prersonnes').classList.add('border-secondary');
        document.getElementById('prersonnes').classList.remove('border-tertiary-300');
      
        document.querySelector('#prersonnes > h1').classList.add('animate-text');
        document.querySelector('#prersonnes > h1').classList.add('text-secondary');
        document.querySelector('#prersonnes > h1').classList.remove('text-tertiary-300');
      
      
        document.querySelector('#posts > h1').classList.add('animate-text');
        document.querySelector('#posts > h1').classList.remove('text-secondary');
        document.querySelector('#posts > h1').classList.add('text-tertiary-300');
      
        setfilterPersonneState(true);
        setfilterTopsState(false);
      }
      function FilterTops() {

        document.getElementById('slider').classList.add('active');
        
      
        document.querySelector('#prersonnes > h1').classList.add('animate-text');
        document.querySelector('#prersonnes > h1').classList.remove('text-secondary');
        document.querySelector('#prersonnes > h1').classList.add('text-tertiary-300');
            
        document.querySelector('#posts > h1').classList.add('animate-text');
        document.querySelector('#posts > h1').classList.add('text-secondary');
        document.querySelector('#posts > h1').classList.remove('text-tertiary-300');
      
        setfilterPersonneState(false);
        setfilterTopsState(true);

      }



    return(
        <>
            <Header/>
            <div id="recherche" className="mb-16 mt-12 pt-2">
              
                
                <form>
                    <div className='mt-5 flex flex-col px-20'>
                        <div className="relative mt-2 rounded-md">
                            <input 
                                {...register('recherche')} 
                                type="text"
                                name="recherche" 
                                id="recherche"
                                placeholder="Recherche..."
                                autoComplete='off' 
                                className="w-full text-tertiary-400 border-2 border-primary rounded-full placeholder:text-sm placeholder:text-tertiary-300 pl-2 focus:outline-none"
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    className="w-5 h-5 stroke-tertiary-300 mr-2"
                                    onClick={(e) => {
                                        setSearchValue("");
                                        reset();
                                    }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </form>

                    
                
            </div>
            <div id="recherchePostPersonne" className="grid grid-cols-2 px-16 text-center">
                <div 
                    id="prersonnes" 
                    className="cursor-pointer"
                    onClick={FilterUsers}
                >
                    <h1 className="text-secondary font-bold">PERSONNES</h1>
                </div> 
                <div 
                    id="posts"
                    className="cursor-pointer"
                    onClick={FilterTops}
                >
                    <h1 className="text-tertiary-300 font-bold">POSTS</h1>
                </div>
                <div>
                    <hr id="slider" className="slide-in border-2 border-secondary"></hr>
                </div>
                
            </div>
            
            {filterPersonneState && <RechercheGestionAbo searchValue={searchValue}/>} 
            {filterPostsState && <AffichageTops searchValue={searchValue}/>}  
            <Footer SelectedIcon={"2"}/>
        </>
    )
}

export default Recherche;