import Form from 'react-bootstrap/Form';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import Badge from '@mui/material/Badge';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

  
function FormTopCreate({ datas }) {

        const { register, handleSubmit, formState: {errors} } = useForm();

        const [ Choix, setChoix ] = useState([
            {id: "choix01", name: "choix01", value: ""}
        ].slice(0, 10));

        const onSubmit = function (data) {
            
            //On créé l'obet qui va etre envoyé au serveur
            const newTop = {
                titre: data.titre,
                motCle: data.motCle,
                choix: {}
              };
              
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

        function deleteChoix(id) {
            const lengthChoix = Choix.length+1;
            if (lengthChoix > 2) {
                const delChoix = [...Choix];
                const choixIndex = delChoix.findIndex(choix => choix.id === id);
                delChoix.splice(choixIndex, 1);
                setChoix(delChoix);
            }
            
            
        }

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
                            <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                <div className={`box ${name}`}>
                                    <Stack
                                        direction="row"
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={2}
                                    >
                                        <ClearIcon onClick={() => deleteChoix(id)}/>
                                        <Badge color="secondary" badgeContent={index+1} showZero>
                                        <TextField 
                                            id={id}
                                            variant="standard" 
                                            InputProps={{startAdornment: (<InputAdornment position="start">{index+1}</InputAdornment>),}}
                                            {...register(name, {required: "Il faut choisir !"})} 
                                            onChange={handleInputChange}  
                                        />
                                        </Badge>
                                        <ClearAllIcon/>
                                    </Stack>
                                    <p className="error">{errors[name] && errors[name]?.message}</p>
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
            <AddIcon onClick={addChoix}/>
          

            <Stack direction="row">
                <Button color='secondary' variant="contained" type="submit" >
                Valider
                </Button>
            </Stack>


        </Form>

    )
    
}

export default FormTopCreate;