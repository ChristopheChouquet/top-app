import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, NavLink } from "react-router-dom";
import axios from "axios";

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




function Login() {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const onSubmit = (data) => loginConnect(data);

  const [UserAccountisOK, setUserAccountisOK] = useState(false);
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

  function loginConnect(data) {

    const InfoUser = {email: data.email, password: data.password};


    // Recuperation des account user
    const form_data = new FormData();
    for ( var key in InfoUser ) {
        form_data.append(key, InfoUser[key]);
    }
    form_data.append('ConnectUSer', 'ConnectUSer');
    axios({
      method: 'post',
      url: 'http://localhost/WISHLIST%20REACT/whishlist_v2/src/Datas/datas_ctrl.php',
      data: form_data
    }).then(function (response) {
      if (response.data !== 'NOPE') {
        sessionStorage.setItem('UserAccountisOK', true);
        setUserAccountisOK(true);
        setMsgCompte('');
        
      }else{
        sessionStorage.setItem('UserAccountisOK', false);
        setUserAccountisOK(false);
        setMsgCompte('Aucun compte associé');
      }
    }); 
  }


  return (
    
    <Form onSubmit={handleSubmit(onSubmit)} id="FormLogin">


      <Box>
      <h1>CONNEXION DE COMPTE</h1>
        
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
              required: "Il faut remplir le password",
              pattern: {
                value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/g,
                message: "Mauvais format de mot de pass"
              }
            })} 
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
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

        {UserAccountisOK ? <Navigate to="/home" /> : <p className="error">{MsgCompte}</p>}

        <button type="submit" id="buttonSubmitLogin">CONNEXION</button>
        <p>Pas de compte ?<br></br><NavLink to='/loginCreate'>S'INSCRIRE</NavLink></p>
        

        
      </Box>
        
      
      
    </Form>
  );
}

export default Login;