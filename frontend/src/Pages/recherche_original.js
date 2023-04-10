import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Recherche() {
    // Stockage des tops
    const [user, setUser] = useState([]); 
    // Stockage des abonnements
    const [abo, setAbo] = useState([]); 
    //Mise en place de la gestion du form avec useForm
    const {register, reset} = useForm();
    // initialisation de l'objet navigate
    const navigate = useNavigate(); 

    useEffect(() => {
        //On récupère le cookie
            const cookie = document.cookie;
        // Recherche du token d'authentification dans le cookie
            const token = cookie.split(';').find(c => c.trim().startsWith(`auth`));
        // Extrait la valeur du token d'authentification
            const tokenValue = token ? token.split('=')[1] : null;
            var verifAuth = typeof tokenValue !== 'undefined' && tokenValue !== null ? true : false;
            !verifAuth && navigate('/login');
            
    // eslint-disable-next-line
    }, []); 


    useEffect(() => {

        const userId = JSON.parse(localStorage.getItem("userData")).userId;

        axios({
            method: 'get',
            url: 'http://localhost:5000/recherche'
        }).then((response) => {
            // Supprimer l'utilisateur connecté de la liste 
            const filteredUsers = response.data.filter(user => user._id !== userId);
            setUser(filteredUsers);

            // Récupération des abonnements actifs de l'utilisateur connecté
            const currentUser = response.data.filter(user => user._id === userId)[0];
            const currentUserAbo = currentUser ? currentUser.abonnement : [];
            setAbo(currentUserAbo);


        }).catch((error) => {  
            console.error(error);
        }); 


    }, []);

    function abonnement(etat, userClicked) {
        
        const userId = JSON.parse(localStorage.getItem("userData")).userId;
        let etatAbo = '';

        etatAbo = etat.target.checked ? "add" : "del";

        const AboInfos = {
            UserCurrent: userId,
            UserAbo: userClicked
        };

        axios({
            method: 'post',
            url: `http://localhost:5000/${etatAbo}UserAbo`,
            data: AboInfos
        }).then((response) => {
            setAbo(prevState => {
                return etatAbo === "add" ? [...prevState, userClicked] : prevState.filter(item => item !== userClicked);
            });
        }).catch((error) => {  
            console.error(error);
        });
    }




        // Ajoutez un état local pour stocker la valeur de recherche
        const [searchValue, setSearchValue] = useState("");

        // Utilisez la méthode filter() pour filtrer les utilisateurs en fonction de la recherche
        const filteredUsers = user.filter((user) => {
            return (
                user.pseudo.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.tagName.toLowerCase().includes(searchValue.toLowerCase())
            );
        });



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
                                placeholder="Recherche"
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

                
                
                {/* Affichage d'une donnée extraite du useContext
                <p>Utilisateur connecté : {userDonne && userDonne.pseudo}</p> */}

                {filteredUsers.map(user => (
                    <div key={user._id}>
                        <div className="w-full flex flex-wrap p-4 my-2 rounded-lg text-left justify-between items-center">
                            <div className="w-96">
                                <div className="flex items-start"> 
                                    <img className="inline-block h-12 w-12 mr-2 rounded-full ring-2 ring-white"
                                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                    <div>
                                        <p className="text-tertiary-400 font-bold">{user.pseudo}</p>
                                        <p className="text-tertiary-400 font-semi">@{user.tagName}</p>
                                        <div className="flex flex-wrap">
                                            {/* //Affichage des mot clés s'ils existent */}
                                            {user.motCles && (
                                                Array(10).fill(null).map((_, i) => user.motCles[`chip${i+1}`] && (
                                                    <p className="text-tertiary-300 text-sm" key={i}>#{user.motCles[`chip${i+1}`]}&nbsp;</p>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            <div className="">
                                <label htmlFor={`abonne_${user._id}`} className="flex justify-center items-center p-2 rounded-md cursor-pointer">
                                    <input 
                                        id={`abonne_${user._id}`} 
                                        type="checkbox" 
                                        className="hidden peer"
                                        onChange={(event) => abonnement(event, user._id)}
                                        defaultChecked={abo.includes(user._id)}
                                        />
                                    <span className="font-bold border border-secondary px-4 py-2 rounded-3xl dark:bg-tertiary-100 peer-checked:dark:bg-secondary text-primary text-center checkAbo">
                                        { abo.includes(user._id) ? "ABONNÉ" : "S'ABONNER" }
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
            <Footer SelectedIcon={"2"}/>
        </>
    )
}

export default Recherche;