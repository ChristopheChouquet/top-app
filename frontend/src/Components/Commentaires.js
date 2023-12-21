import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { RecupCommsTop, RecupInfosUser } from '../App';

function GestionCommentaires({ IDTop }) {

    //Mise en place de la gestion du form avec useForm
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    //On récupère l'iD du user connecté
    const currentUserId = JSON.parse(localStorage.getItem("userData")).userId;
    // Stockage des infos du commentaire  
    const [commentaire, setCommentaire] = useState([]);
    // Stockage all infos
    const [allInfos, setAllInfos] = useState([]);
    

    useEffect(() => {


        setAllInfos([]);


        // Récupèration des commentaires 
        RecupCommsTop(IDTop)
        .then((resultComms) => {
            console.log("Résultat de la fonction resultComms :", resultComms); 

            resultComms.map((comm) => {
                console.log("ayalaau", comm.IDUser);

                // Récupèration des infos du user  
                RecupInfosUser(comm.IDUser)
                .then((resultCommUser) => {
                    console.log("resultCommUser._id :", resultCommUser._id);
                    console.log("comm.IDUser :", comm.date);
                    
                    if (comm.IDUser === resultCommUser._id) {
    
                        const date = new Date(comm.date);
                        const jour = ('0' + date.getDate()).slice(-2);
                        const mois = ('0' + (date.getMonth() + 1)).slice(-2);
                        const annee = date.getFullYear().toString();  
                        const dateFormatee = `${jour}/${mois}/${annee}`;
                        
                        const RecupAllInfos = {
                            userId: comm.IDUser, 
                            commId: comm._id,
                            avatar: resultCommUser.avatar,
                            pseudo: resultCommUser.pseudo,
                            tagName: resultCommUser.tagName,
                            date: dateFormatee,
                            comm: comm.commentaire 
                        }
                        
                        setAllInfos(allInfos => [...allInfos, RecupAllInfos]);

                        console.log('RecupAllInfos', RecupAllInfos);
                                                        
                    }

                })    
                .catch((error) => {
                    console.error("Erreur lors de l'appel à RecupInfosTop :", error);
                });

            });         
    
        })    
        .catch((error) => {
            console.error("Erreur lors de l'appel à RecupInfosTop :", error);
        });


    
     
    }, [commentaire, IDTop]);
    

    const onSubmit = function(data) {
        const NewComment = {
            commentaire: data.commentaire,
            IDTop: IDTop,
            IDUser: currentUserId
        };
    
        setCommentaire(prevComments => [...prevComments, NewComment]);

        axios({
            method: 'post',
            url:   process.env.REACT_APP_BACKEND_URL + `/commentaires/${IDTop}`, 
            data: NewComment
          }).then((response) => {
            console.log('succes', response);
            window.location.reload();
            reset();
          }).catch(({ response }) => { 
            console.log('erreur', response);
          })
          
    };
    
    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='w-4/5 flex flex-wrap flex-col m-auto rounded-lg text-left justify-start'>  

                <div className='mt-5'>
                    <label htmlFor="chip" className="block text-sm text-tertiary-300 font-bold text-left">
                    Ajoute ton commentaire
                    </label>
                    <input
                        type="text"
                        name="commentaire"
                        id="commentaire"
                        autoComplete='off'
                        className="text-primary border-b border-tertiary-300 w-full focus:outline-none font-bold"
                        {...register("commentaire", { required: "Il faut remplir le commentaire" })} 
                    />
                    <p className="text-red-500">{errors.commentaire && errors.commentaire.message}</p>
                </div>

                <div className='mt-8 flex flex-col items-center'>
                    <button type="submit" id="buttonSubmit" className="bg-primary text-tertiary-100 rounded-full px-6 py-2 mb-5 w-full">
                    ENREGISTRER
                    </button>
                </div>

            </form>

            <div className='flex flex-wrap justify-center mb-16 pt-20'>
                
                {allInfos.map((commentaire, index) => (

                    <div key={`${commentaire.targetTop}-${index}`} className="w-4/5 border-2 border-secondary flex flex-wrap p-2.5 my-2 rounded-lg text-left justify-start">
                        <div>
                            <NavLink to={`/profil/${commentaire.tagName}`}>
                                <div className="flex">
                                    <div>
                                        <img className="inline-block h-12 w-12 mr-2 rounded-full ring-2 ring-white" src={`/${commentaire.avatar}`} alt={`/${commentaire.pseudo}`}/>
                                    </div>
                                    <div>
                                        <p className="font-semi">{commentaire.pseudo}
                                            <span className="font-normal text-tertiary-300"> @{commentaire.tagName} / {commentaire.date}</span>
                                        </p>
                                    </div>
                                </div>
                                <p>{commentaire.comm}</p>
                            </NavLink>
                        </div>
                        <div className="p-2.5 flex w-5/6 justify-around">
                            <div>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 35.9 35.9" fill="none" strokeWidth="1.5" stroke="#1D1D1B">
                                    <g>
                                        <ellipse transform="matrix(0.5257 -0.8507 0.8507 0.5257 8.7697 28.1674)" cx="29.6" cy="6.2" rx="5.5" ry="5.5"></ellipse>
                                        <ellipse transform="matrix(0.5257 -0.8507 0.8507 0.5257 -11.176 39.2879)" cx="29.6" cy="29.7" rx="5.5" ry="5.5"></ellipse>
                                        <circle cx="6.2" cy="18" r="5.5"></circle>
                                        <line x1="15.4" y1="13" x2="19.9" y2="10.7"></line>
                                        <line x1="15.4" y1="22.8" x2="19.9" y2="25.1"></line>
                                    </g>
                                </svg>
                            </div>
                            <div className="flex">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40.5 35.8" fill="none" strokeWidth="1.5" className="cursor-pointer w-6 h-6 stroke-primary">
                                    <path d="M20.2,35l15.9-16.3c2.2-1.9,3.6-4.7,3.6-7.8c0-5.6-4.4-10.1-9.9-10.1c-4.7,0-8.6,3.4-9.6,7.9 c-1-4.5-4.9-7.8-9.6-7.8c-5.4,0-9.9,4.5-9.9,10.1c0,3.1,1.3,5.8,3.5,7.7l10.9,11.2"></path>
                                </svg>&nbsp;<span className="cursor-pointer text-sm text-primary">0</span>
                            </div>
                            <div className="flex">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40.5 35.8" fill="none" strokeWidth="1.5" className="cursor-pointer w-6 h-6 stroke-primary">
                                    <path d="M4,28.1l-2.5,7.8l7.7-2.9c2.6,1.5,5.6,2.4,8.8,2.4c9.6,0,17.3-7.8,17.3-17.3c0-9.6-7.8-17.3-17.3-17.3 C8.5,0.8,0.8,8.5,0.8,18.1c0,0.8,0.1,1.7,0.2,2.5"></path>
                                </svg>&nbsp;<span className="cursor-pointer text-sm text-primary">0</span>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </>
    )
}
export default GestionCommentaires;