import Form from 'react-bootstrap/Form';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import AddIcon from '@mui/icons-material/Add';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

  
function FormTopCreate({ datas }) {

        const { register, handleSubmit, formState: {errors} } = useForm();


        const [ Choix, setChoix ] = useState([

            {id: "choix01", name: "choix01", value: ""},
            {id: "choix02", name: "choix02", value: ""},
            {id: "choix03", name: "choix03", value: ""},
            {id: "choix04", name: "choix04", value: ""},
            {id: "choix05", name: "choix05", value: ""},
            {id: "choix06", name: "choix06", value: ""},
            {id: "choix07", name: "choix07", value: ""},
            {id: "choix08", name: "choix08", value: ""},
            {id: "choix09", name: "choix09", value: ""},
            {id: "choix10", name: "choix10", value: ""}
        ]);

       

        const onSubmit = function (data, event) {
            
            //On créé l'obet qui va etre envoyé au serveur
            const newTop = {
                titre: data.titre,
                motCle: data.motCle,
                choix: {
                    choix1: Choix[0].value,
                    choix2: Choix[1].value,
                    choix3: Choix[2].value,
                    choix4: Choix[3].value,
                    choix5: Choix[4].value,
                    choix6: Choix[5].value,
                    choix7: Choix[6].value,
                    choix8: Choix[7].value,
                    choix9: Choix[8].value,
                    choix10: Choix[9].value,
                }
            };
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
        

   return(
            
        <Form onSubmit={handleSubmit(onSubmit)}>

            <TextField id="standard-basic" label="Titre du top" variant="standard" {...register('titre', {required: "Il faut choisir un titre !"})}  />
            <p className="error">{errors.titre && errors.titre.message}</p>
            <TextField id="standard-basic" label="Mot clés" variant="standard" {...register('motCle', {required: "Il faut choisir un mot-clé !"})}  />
            <p className="error">{errors.motCle && errors.motCle.message}</p> 

            <h2>Classement (possible de 1 à 10)</h2>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="boxes">
                    {(provided) => (
                    <ul ref={provided.innerRef} {...provided.droppableProps}>
                        {Choix.map(({id, name}, index) => 
                        <Draggable key={id} draggableId={id.toString()} index={index}>
                            {(provided) => (
                            <h1 ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                <div className={`box ${name}`}>
                                    <Stack
                                        direction="row"
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={2}
                                    >
                                        <ClearIcon/>
                                        <TextField id={id} label="Inscrire le choix" variant="standard" {...register(name)} onChange={handleInputChange}  />
                                        <ClearAllIcon/>
                                    </Stack>
                                </div>
                            </h1>
                            )}
                        </Draggable>
                        )}
                        {provided.placeholder}
                    </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <AddIcon/>
          

            <Stack direction="row">
                <Button color='secondary' variant="contained" type="submit" >
                Valider
                </Button>
            </Stack>


        </Form>

    )
    
}

export default FormTopCreate;