import axios from "axios";
import { useEffect, useState } from "react";

function GestionCommentaires({ currentTopId, currentUserId }) {

    //stockage local commentaires
    const [comms, setComms] = useState({});
    //stockage local commentaires
    const [commed, setCommed] = useState(false);

    useEffect(() => {
        
        axios({ 
            method: 'get',
            url:   process.env.REACT_APP_BACKEND_URL + `/tops/${currentTopId}` 
        }).then((response) => {
            
            // MAJ du usetate des commmentaires
            setComms(response.data[0].commentaires);

            // Chercher si l'utilisateur est dans les commentaires
            const userFound = response.data[0].commentaires.some(comment => comment.IDUser === currentUserId);
            
            // Mettre à jour l'état selon si l'utilisateur est trouvé ou non
            if (userFound) { 
                setCommed(true);
            } else { 
                setCommed(false);
            }
 
        }).catch((error) => { 
            console.error(error);
        });


    },[]);

    return(

        <div className="flex" >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40.5 35.8" fill="none" strokeWidth={1.5}  className={commed ? "cursor-pointer w-6 h-6 stroke-primary" : "cursor-pointer w-6 h-6 stroke-tertiary-400"}>
            <path d="M4,28.1l-2.5,7.8l7.7-2.9c2.6,1.5,5.6,2.4,8.8,2.4c9.6,0,17.3-7.8,17.3-17.3c0-9.6-7.8-17.3-17.3-17.3
                    C8.5,0.8,0.8,8.5,0.8,18.1c0,0.8,0.1,1.7,0.2,2.5"/>
            </svg>&nbsp;<span className={commed ? "cursor-pointer text-sm text-primary" : "cursor-pointer text-sm text-tertiary-400"}>{ comms.length }</span>
        </div>
    )
}
export default GestionCommentaires;