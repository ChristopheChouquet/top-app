import Form from 'react-bootstrap/Form';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FormChips from './Formchips';
  
function FormTopCreate({ datas }) {
        //Gestion du Hook form
        const { register, handleSubmit, formState: {errors} } = useForm();

        //Usetate des chips (mot clés)
        const [chipData, setChipData] = useState([]);

        //Usetate des choix
        const [ Choix, setChoix ] = useState([
            {id: "choix01", name: "choix01", value: ""}
        ].slice(0, 10));

        //Fonction appelée lors de la validation du formulaire
        const onSubmit = function (data) {   

            //On créé l'obet qui va etre envoyé au serveur
            const newTop = {
                titre: data.titre,
                motCle: {},
                choix: {}
              };
              //Si aucun mot clé n'est tapé, on place le titre en unique mot clé
              if (chipData.length === 0) {
                newTop.motCle[`chip1`] = data.titre;
              }
              //On parcours tous les mot clés et on récupére leur valeur
              for (let i = 0; i < chipData.length; i++) {
                newTop.motCle[`chip${i+1}`] = chipData[i].label;
              }
              //On parcours tous les choix et on récupére leur valeur
              for (let i = 0; i < Choix.length; i++) {
                newTop.choix[`choix${i+1}`] = Choix[i].value;
              }
            //On envoie le nouveau top au serveur
            datas(newTop);
        }

        //Met à jour le state Choix a chque fois que la valeur d'un champ de texte change
        function handleInputChange(event) {
            //On récupere la valeur et le name du champ de texte modifé
            const { name, value } = event.target;
            //On créé une copie du state Choix
            const newChoix = [...Choix];
            //On récupere l'index du choix a modifier en fonction du name name ciblé plus haut
            const choixIndex = newChoix.findIndex(choix => choix.name === name);
            //On remplace la value du choix trouvé par la nouvelle valeur qui a été modifiée
            newChoix[choixIndex].value = value;
            //On met à jour le state
            setChoix(newChoix);
        }
     
        //Gestion du drag and drop
        function handleOnDragEnd(result) {
            if(!result.destination) return;
            
            const newBox = Array.from(Choix);
            const [draggedItem] = newBox.splice(result.source.index, 1);
            newBox.splice(result.destination.index, 0, draggedItem);
            setChoix(newBox);
        }

        //Supprimer un choix de la liste
        function deleteChoix(id) {
            const lengthChoix = Choix.length+1;
            if (lengthChoix > 2) {
                const delChoix = [...Choix];
                const choixIndex = delChoix.findIndex(choix => choix.id === id);
                delChoix.splice(choixIndex, 1);
                setChoix(delChoix);
            } 
        }

        //Ajouter un choix
        function addChoix() {
            const lengthChoix = Choix.length+1;
            if (lengthChoix <= 10) {
                const newChoix = {
                    id: `choix${Choix.length + 1}`,
                    name: `choix${Choix.length + 1}`,
                    value: "",
                };
                const addChoix = [...Choix, newChoix];
                setChoix(addChoix);
            }

        }

   return(
        <div id="createTop" className='p-10'>

            <h1 className="text-3xl font-bold w-full text-center mt-4">Créer son top</h1>
            <label htmlFor="Toggle3" className="flex justify-center items-center p-2 rounded-md cursor-pointer dark:text-gray-800 ">
                <div className='bg-tertiary-300 rounded-3xl px-0 py-2'>
                <input id="Toggle3" type="checkbox" className="hidden peer" />
                <span className="px-4 py-2 rounded-3xl dark:bg-primary peer-checked:dark:bg-tertiary-300 text-tertiary-100" >Top simple</span>
                <span className="px-4 py-2 rounded-3xl dark:bg-tertiary-300 peer-checked:dark:bg-primary text-tertiary-100">Top détaillé</span>
                </div>
            </label>

  
            <div className='mt-4'>
                <label htmlFor="titre" className="block text-sm text-tertiary-300 font-bold text-left">
                Titre
                </label>
                <input
                type="text"
                name="titre"
                id="titre"
                className="text-primary border-b border-tertiary-300 w-full focus:outline-none font-bold"
                {...register('titre', {required: "Il faut choisir un titre !"})} 
                />
                <p className="error">{errors.titre && errors.titre.message}</p>
            </div>

            <FormChips chipData={chipData} setChipData={setChipData}/>

            <p className='block text-sm text-tertiary-300 font-bold text-left mt-4 mb-6'>Classement (possible de 1 à 10)</p>


            <Form onSubmit={handleSubmit(onSubmit)}>

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="boxes">
                        {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps}>
                            {Choix.map(({id, name}, index) => 
                            <Draggable key={id} draggableId={id.toString()} index={index}>
                                {(provided) => (
                                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                    <div className={`box ${name} flex items-center justify-between mb-4`}>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="stroke-tertiary-300 w-6 h-6" onClick={() => deleteChoix(id)}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <p className='font-bold text-3xl text-primary'>{index+1}</p>
                                        <div className=''>
                                            <input
                                            type="text"
                                            name="name"
                                            id={id}
                                            placeholder="Inscrire le choix"
                                            className="text-tertiary-400 w-full focus:outline-none font-semibold"
                                            {...register(name, {required: "Il faut choisir !"})} 
                                            onChange={handleInputChange} 
                                            />
                                            <p className="error">{errors[name] && errors[name]?.message}</p>
                                        </div>
                                        
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 21.7 26.6" className="stroke-primary w-6 h-6">
                                        <g>
                                            <polygon fill="none" points="10.8,1 1,10.8 20.7,10.8 	"/>
                                            <polygon fill="none" points="10.8,25.6 20.7,15.9 1,15.9 	"/>
                                        </g>
                                        </svg>

                                    </div>
                                </div>
                                )}
                            </Draggable>
                            )}
                            {provided.placeholder}
                        </ul>
                        )}
                    </Droppable>
                </DragDropContext>

                <div className='flex justify-end'>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 48.7 48.7" className="stroke-primary w-8 h-8" onClick={addChoix}>
                        <g>
                            <path className="fill-primary stroke-primary" d="M10.7,22.2H38c1.2,0,2.1,1,2.1,2.1c0,1.2-1,2.1-2.1,2.1H10.7c-1.2,0-2.1-1-2.1-2.1
                                C8.5,23.2,9.5,22.2,10.7,22.2"/>
                            <path className="fill-primary stroke-primary" d="M22.2,38V10.7c0-1.2,1-2.1,2.1-2.1c1.2,0,2.1,1,2.1,2.1V38c0,1.2-1,2.1-2.1,2.1C23.2,40.2,22.2,39.2,22.2,38"
                                />
                            <path className="stroke-primary fill-none" d="M24.4,0.5c13.2,0,23.9,10.7,23.9,23.9c0,13.2-10.7,23.9-23.9,23.9c-13.2,0-23.9-10.7-23.9-23.9
                                C0.5,11.2,11.2,0.5,24.4,0.5z"/>
                        </g>
                    </svg>
                </div>
                <div className="flex justify-end">
                    <button type='submit' className='bg-primary text-tertiary-100 rounded-3xl px-6 py-2 mt-5'>Poster</button> 
                </div>
                        
                


            </Form>

        </div>
    )
    
}

export default FormTopCreate;