import axios from "axios";
import { useEffect, useState } from "react";

function GestionLike({ currentTopId, currentUserId }) {

    // Stockage tops
    const [likes, setLikes] = useState({ compteur: 0, users: [] });
    const [liked, setLiked] = useState(false);

    useEffect(() => {

        axios({ 
            method: 'get',
            url: `http://localhost:5000/tops/${currentTopId}` 
        }).then((response) => {

            // cloner l'objet "data" pour éviter de modifier le state directement
            const newData = {...response.data[0].like};
            setLikes(newData);

            // Chercher l'utilisateur
            const index = newData.users.indexOf(currentUserId);

            //on initialise la couleur du like
            if (index !== -1) { 
                setLiked(true);
            } else { 
                setLiked(false);
            }
 
        }).catch((error) => { 
            console.error(error);
        });


    },[]);


    function gestionLike(){

        

        // cloner l'objet "likes" pour éviter de modifier le state directement        
        const updatedLikes = { ...likes }; 
    
        // Chercher l'utilisateur
        const index = updatedLikes.users.indexOf(currentUserId);
        
        if (index !== -1) { // L'utilisateur est présent dans le tableau, le supprimer
            updatedLikes.users.splice(index, 1);
            updatedLikes.compteur--;
            setLiked(false);
        } else { // L'utilisateur n'est pas présent dans le tableau, l'ajouter
            updatedLikes.compteur++;
            updatedLikes.users.push(currentUserId);
            setLiked(true);
        }
        
        // Mettre à jour le state de "likes"
        setLikes(updatedLikes);

        // Et on enregistre en BDD
        axios({ 
            method: 'post',
            url: `http://localhost:5000/topsupdatedlikes/${currentTopId}`,
            data: updatedLikes 
        }).then((response) => {

            console.log('Like updated');

        }).catch((error) => { 
            console.error(error);
        });   
        

    }


    


    return( 
        <>
            <div className="flex" onClick={gestionLike}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40.5 35.8" fill="none" strokeWidth={1.5}  className={liked ? "cursor-pointer w-6 h-6 stroke-primary" : "cursor-pointer w-6 h-6 stroke-tertiary-400"}>
                    <path d="M20.2,35l15.9-16.3c2.2-1.9,3.6-4.7,3.6-7.8c0-5.6-4.4-10.1-9.9-10.1c-4.7,0-8.6,3.4-9.6,7.9
                    c-1-4.5-4.9-7.8-9.6-7.8c-5.4,0-9.9,4.5-9.9,10.1c0,3.1,1.3,5.8,3.5,7.7l10.9,11.2"/>
                </svg>&nbsp;<span className={liked ? "cursor-pointer text-sm text-primary" : "cursor-pointer text-sm text-tertiary-400"}>{ likes.compteur }</span>
            </div>
        </>
    )
    
}

export default GestionLike;