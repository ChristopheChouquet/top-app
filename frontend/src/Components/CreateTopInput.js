import '../styles/CreateTop.css';

import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

 


function CreateTop() {

  const { register, handleSubmit, formState: {errors} } = useForm();
  const [ tops, setTops ] = useState([]);
  
  function SaveTop(data) {

    const newTop = {
      titre: data.titre,
      motCle: data.motCle,
      choix: {
        choix1: data.choix1,
        choix2: data.choix2,
        choix3: data.choix3,
        choix4: data.choix4,
        choix5: data.choix5,
        choix6: data.choix6,
        choix7: data.choix7,
        choix8: data.choix8,
        choix9: data.choix9,
        choix10: data.choix10,
      }
    };

    const copyTop = [...tops];
    copyTop.push(newTop)
    setTops(copyTop);
    console.log(copyTop);
  }



  return (
    <div id='createTop'>

        <Form onSubmit={handleSubmit(SaveTop)}>

          <TextField id="standard-basic" label="Titre du top" variant="standard" {...register('titre', {required: "Il faut choisir un titre !"})}  />
          <p className="error">{errors.titre && errors.titre.message}</p>
          <TextField id="standard-basic" label="Mot clés" variant="standard" {...register('motCle', {required: "Il faut choisir un mot-clé !"})}  />
          <p className="error">{errors.motCle && errors.motCle.message}</p> 

          <h2>Classement (possible de 1 à 10)</h2>

          <h1>1</h1><TextField id="standard-basic" label="Inscrire le choix" variant="standard" {...register('choix1')}  /><br/>
          <TextField id="standard-basic" label="Inscrire le choix" variant="standard" {...register('choix2')}  /><br/>
          <TextField id="standard-basic" label="Inscrire le choix" variant="standard" {...register('choix3')}  /><br/>
          <TextField id="standard-basic" label="Inscrire le choix" variant="standard" {...register('choix4')}  /><br/>
          <TextField id="standard-basic" label="Inscrire le choix" variant="standard" {...register('choix5')}  /><br/>
          <TextField id="standard-basic" label="Inscrire le choix" variant="standard" {...register('choix6')}  /><br/>
          <TextField id="standard-basic" label="Inscrire le choix" variant="standard" {...register('choix7')}  /><br/>
          <TextField id="standard-basic" label="Inscrire le choix" variant="standard" {...register('choix8')}  /><br/>
          <TextField id="standard-basic" label="Inscrire le choix" variant="standard" {...register('choix9')}  /><br/>
          <TextField id="standard-basic" label="Inscrire le choix" variant="standard" {...register('choix10')}  /><br/>

          <Stack direction="row">
              <Button color='secondary' variant="contained" type="submit" >
              Valider
              </Button>
          </Stack>

        </Form> 

    </div>
  );
}

export default CreateTop;