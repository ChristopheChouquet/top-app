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

  //Settigs des alertes
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false
  })

  const {register, handleSubmit, formState: {errors}} = useForm();
  
  const [isExistAccount, setisExistAccount] = useState();
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


  function addUserAccount(data) {

    const GeneratingID = new Date().getTime();
    const newUserAccount = {id: GeneratingID, login: data.login, email: data.email, password: data.password};
    let VerifCreateAccount = false;
    
    const form_data = new FormData();
    for ( var key in newUserAccount ) {
        form_data.append(key, newUserAccount[key]);
    }
    form_data.append('AddUserAccount', 'AddUserAccount');

    // Recuperation des account user
      axios({
        method: 'get',
        url: 'http://localhost/WISHLIST%20REACT/whishlist_v2/src/Datas/datas_ctrl.php',
        params: { Recup_UsersAccount: 'Recup_UsersAccount' }
      })
      .then(function (response) { 
        console.log('Reception des users des le début',response.data); 
        
        for ( var key in response.data ) {
          if ( response.data[key].email === newUserAccount.email ) {
            setisExistAccount(true)
            VerifCreateAccount = true;
            setMsgCompte('Le compte existe déja');
          }      
        }

        if ( VerifCreateAccount === false ) {
          // Enregistrement du nouvel user account
            axios({
              method: 'post',
              url: 'http://localhost/WISHLIST%20REACT/whishlist_v2/src/Datas/datas_ctrl.php',
              data: form_data
            }).then(function () {
              setisExistAccount(false);
              Toast.fire({
                icon: 'success',
                title: "Le compte a bien été créé !",         
              })
            }); 
        }
               
        
      }); 

      
    
  }

  return (
    <>
    

    <Form onSubmit={handleSubmit(addUserAccount)} id="FormLoginCreate">


      <Box>
        <h1>CREATION DE COMPTE</h1>

       
        <TextField sx={{ m: 1, width: '25ch' }} 
          id="login" 
          label="login"
          variant="standard" 
          autoComplete="off"
          {...register("login", { 
            required: "Il faut remplir le login", 
            maxLength: {
              value: 20, 
              message: "Maximum 20 caracteres"
            },  
            minLength: {
              value: 3, 
              message: "Minimum 3 caracteres"
            }  
          })}
        />
        <p className="error">{errors.login && errors.login.message}</p>

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

        {isExistAccount !== undefined && (isExistAccount ? <p className="error">{MsgCompte}</p> : <Navigate to="/login" />)}
        {console.log('isExistAccount', isExistAccount)}
        {console.log('MsgCompte', MsgCompte)}


        <button type="submit" id="buttonSubmit">ENREGISTRER</button>
        <NavLink to='/'><button type="button" id="buttonRetourSubmit">RETOUR</button></NavLink>

        
      </Box>
      
      
    </Form>

    
    </>
  );
}

export default LoginCreate;

