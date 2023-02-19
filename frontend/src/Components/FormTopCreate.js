import '../styles/CreateTop.css';

import Form from 'react-bootstrap/Form';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';

function FormTopCreate({ datas }) {

    const { register, handleSubmit, formState: {errors} } = useForm();

    return(
        <Form onSubmit={handleSubmit(datas)}>

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
    )
    
}

export default FormTopCreate;