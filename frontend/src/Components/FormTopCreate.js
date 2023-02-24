//import '../styles/CreateTop.css';



import Form from 'react-bootstrap/Form';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

  
function FormTopCreate({ datas }) {

        const { register, handleSubmit, formState: {errors} } = useForm();

        const [ Choix, setChoix ] = useState([
            {id: "choix01", name: "choix01"},
            {id: "choix02", name: "choix02"},
            {id: "choix03", name: "choix03"},
            {id: "choix04", name: "choix04"},
            {id: "choix05", name: "choix05"},
            {id: "choix06", name: "choix06"},
            {id: "choix07", name: "choix07"},
            {id: "choix08", name: "choix08"},
            {id: "choix09", name: "choix09"},
            {id: "choix10", name: "choix10"}
        ]);


        function handleOnDragEnd(result) {
            if(!result.destination) return;
            const newBox = Array.from(Choix);
            const [draggedItem] = newBox.splice(result.source.index, 1);
            newBox.splice(result.destination.index, 0, draggedItem);
            setChoix(newBox);
        }
        

   return(
            
        <Form onSubmit={handleSubmit(datas)}>

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
                                    <TextField id={id} label="Inscrire le choix" variant="standard" {...register(name)}  /><br/>
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
          

            <Stack direction="row">
                <Button color='secondary' variant="contained" type="submit" >
                Valider
                </Button>
            </Stack>

        </Form>

    )
    
}

export default FormTopCreate;