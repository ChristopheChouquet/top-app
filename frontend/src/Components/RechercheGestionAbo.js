import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";



function RechercheGestionAbo({searchValue, profilID}) {

// Stockage des tops
const [user, setUser] = useState([]); 
// Stockage des abonnements
const [abo, setAbo] = useState([]); 

const userId = JSON.parse(localStorage.getItem("userData")).userId;

useEffect(() => {

    axios({
        method: 'get',
        url:   process.env.REACT_APP_BACKEND_URL + '/recherche'
    }).then((response) => {

        //Si l'appel du composant viens du profil
        if (profilID) {

            // Récupération des abonnements actifs de l'utilisateur connecté
            const currentUser = response.data.filter(user => user._id === profilID)[0];
            const currentUserAbo = currentUser ? currentUser.abonnement : [];
            setAbo(currentUserAbo); 

            // Récupération des utilisateurs des abonnements  
            const filteredUsers = response.data.filter(user => currentUserAbo.includes(user._id));
            setUser(filteredUsers);
        //Si l'appel du composant viens de la recherche
        }else{

            // Supprimer l'utilisateur connecté de la liste 
            const filteredUsers = response.data.filter(user => user._id !== userId);
            setUser(filteredUsers);

            // Récupération des abonnements actifs de l'utilisateur connecté
            const currentUser = response.data.filter(user => user._id === userId)[0];
            const currentUserAbo = currentUser ? currentUser.abonnement : [];
            setAbo(currentUserAbo);

        }
        
        
    }).catch((error) => {  
        console.error(error);
    }); 


// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


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

    // Utilisez la méthode filter() pour filtrer les utilisateurs en fonction de la recherche
    const filteredUsers = user.filter((user) => {
        return (
            user.pseudo.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.tagName.toLowerCase().includes(searchValue.toLowerCase())
        );
    })




return(
    <>
    {filteredUsers.map(user => (
        <div key={user._id}>
            <div className="w-full flex flex-wrap p-4 my-2 rounded-lg text-left justify-between items-center">
                <div className="w-96">
                    <NavLink to={`/profil/${user.tagName}`}>
                        <div className="flex items-start"> 
                            <img className="inline-block h-12 w-12 mr-2 rounded-full ring-2 ring-white"
                                src={`/${user.avatar}`}
                                alt="Avatar"
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
                    </NavLink>
                </div>
                {!profilID && (
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
                                { abo.includes(user._id) ? "ABONNÉ(E)" : "S'ABONNER" }
                            </span>
                        </label>
                    </div>
                )}
            </div>
        </div>
    ))}
    </>
)
    

}

export default RechercheGestionAbo;