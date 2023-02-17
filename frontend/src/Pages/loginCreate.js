import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, NavLink } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';





function LoginCreate() {

  //Mise en place de la gestion du form avec useForm
    const {register, handleSubmit, formState: {errors}} = useForm();

  //Settigs des alertes
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false
    })

    const [isExistAccount, setisExistAccount] = useState(true);
    const [MsgCompte, setMsgCompte] = useState('');


    const [values, setValues] = useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    });

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };




    function AddUser(data) {

      // Récupération des données du formulaire
      const newUserAccount = {
        email: data.email,
        password: data.password
      };

      // Recuperation des account user
        axios({
          method: 'get',
          url: `http://localhost:5000/users/${newUserAccount.email}`
        })
        .then(function (response) { 
          if ( response.data ) {
            setisExistAccount(true)
            setMsgCompte('Le compte existe déja');
          }else{
            // Enregistrement du nouvel user account
            axios({
              method: 'post',
              url: 'http://localhost:5000/users',
              data: newUserAccount
            }).then(function () {
              setisExistAccount(false)
              Toast.fire({
                icon: 'success',
                title: "Le compte a bien été créé !",         
              })
            }).catch(({ response }) => { 
              console.log(response); 
            })
          }   
        }); 

    }



  return (
    <>
   

    <Form onSubmit={handleSubmit(AddUser)} id="FormLoginCreate">


      <Box>
        <h1>CREATION DE COMPTE</h1>

        <TextField sx={{ m: 1, width: '25ch' }} 
          id="email"
          label="email" 
          variant="standard" 
          autoComplete="off"
          {...register("email", { 
            required: "Il faut remplir l'Email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Mauvais format d'Email"
            }
          })} 
        />
        <p className="error">{errors.email && errors.email.message}</p>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            {...register("password", { 
              required: "Il faut remplir l'Email",
              pattern: {
                value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/g,
                message: "Mauvais format de mot de pass"
              }
            })} 
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            onChange={handleChange('password')}
            autoComplete="off"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            
          />
        </FormControl>
        <p className="error">{errors.password && errors.password.message}</p>

        {isExistAccount ? <p className="error">{MsgCompte}</p> : <Navigate to="/login" />}


        <button type="submit" id="buttonSubmit">ENREGISTRER</button>
        <NavLink to='/login'><button type="button" id="buttonRetourSubmit">RETOUR</button></NavLink>

        
      </Box>
      
      
    </Form>

    
    </>
  );
}

export default LoginCreate;

