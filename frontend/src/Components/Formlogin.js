import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from "react-router-dom";


function Formlogin({ datas, UserAccountisOK, MsgCompte }) {

    //Mise en place de la gestion du form avec useForm
        const {register, handleSubmit, formState: {errors}} = useForm();

    //Gestion du form
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

    return(
        <>
            <div className='flex flex-col items-center justify-center p-10'>

                <div className='mt-16 flex flex-col justify-center items-center'>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 212.5 36.7" className='w-2/5'>
                        <g>
                            <path className="fill-primary" d="M28,0.1c-0.8,0-1.5,0.2-2,0.7c-0.5,0.5-0.7,1.1-0.7,2v13.1H5.3V2.8c0-0.9-0.2-1.5-0.7-2
                                c-0.5-0.5-1.1-0.7-2-0.7s-1.5,0.2-2,0.7C0.2,1.2,0,1.9,0,2.8V34c0,0.8,0.2,1.5,0.7,2c0.5,0.5,1.1,0.7,2,0.7c0.9,0,1.5-0.2,2-0.7
                                c0.4-0.5,0.7-1.1,0.7-2V20.3h20.1V34c0,0.8,0.2,1.5,0.7,2c0.5,0.5,1.1,0.7,2,0.7c0.8,0,1.5-0.2,1.9-0.7c0.4-0.5,0.7-1.1,0.7-2V2.8
                                c0-0.9-0.2-1.5-0.7-2C29.5,0.3,28.9,0.1,28,0.1"/>
                            <path className="fill-primary" d="M41,11.2c-0.8,0-1.4,0.2-1.9,0.7c-0.4,0.5-0.7,1.2-0.7,2v19.8c0,0.9,0.2,1.6,0.7,2.1c0.4,0.5,1.1,0.7,1.9,0.7
                                c0.8,0,1.5-0.2,1.9-0.7c0.4-0.5,0.7-1.2,0.7-2.1V14c0-0.9-0.2-1.6-0.7-2C42.4,11.5,41.8,11.2,41,11.2"/>
                            <path className="fill-primary" d="M78.2,17.3h-8.8c-0.7,0-1.2,0.2-1.6,0.5c-0.4,0.3-0.6,0.8-0.6,1.4c0,0.6,0.2,1.1,0.6,1.5
                                c0.4,0.4,0.9,0.5,1.6,0.5H76v9.6c-1,0.4-2.1,0.6-3.2,0.8c-1.5,0.3-3,0.4-4.5,0.4c-4.2,0-7.4-1.2-9.5-3.5c-2.1-2.3-3.2-5.8-3.2-10.3
                                c0-2.9,0.5-5.4,1.4-7.4c0.9-2,2.3-3.6,4.1-4.7c1.8-1.1,4-1.6,6.7-1.6c1.8,0,3.4,0.2,4.8,0.6c1.5,0.4,2.8,1.1,4.2,2
                                c0.5,0.3,1,0.5,1.5,0.4c0.5-0.1,0.8-0.3,1.2-0.6c0.3-0.3,0.5-0.7,0.7-1.2c0.1-0.5,0.1-0.9,0-1.3c-0.1-0.4-0.4-0.8-0.9-1.2
                                c-1.6-1.2-3.4-2-5.4-2.6c-2-0.5-4-0.8-6-0.8c-2.8,0-5.3,0.4-7.4,1.3c-2.2,0.8-4,2.1-5.5,3.7c-1.5,1.6-2.7,3.5-3.5,5.8
                                c-0.8,2.3-1.2,4.8-1.2,7.6c0,3.8,0.7,7.1,2.1,9.8c1.4,2.7,3.4,4.9,6.1,6.3c2.7,1.5,6,2.2,9.9,2.2c1.9,0,3.8-0.2,5.7-0.5
                                c2-0.4,3.7-0.8,5.1-1.4c0.5-0.2,0.9-0.5,1.1-0.9c0.2-0.4,0.3-0.9,0.3-1.5V19.5c0-0.7-0.2-1.3-0.6-1.6
                                C79.5,17.5,78.9,17.3,78.2,17.3"/>
                            <path className="fill-primary" d="M116.5,0.1c-0.8,0-1.5,0.2-2,0.7c-0.5,0.5-0.7,1.1-0.7,2v13.1H93.8V2.8c0-0.9-0.2-1.5-0.7-2
                                c-0.5-0.5-1.1-0.7-2-0.7c-0.8,0-1.5,0.2-2,0.7c-0.5,0.5-0.7,1.1-0.7,2V34c0,0.8,0.2,1.5,0.7,2c0.5,0.5,1.1,0.7,2,0.7
                                c0.9,0,1.5-0.2,2-0.7c0.4-0.5,0.7-1.1,0.7-2V20.3h20.1V34c0,0.8,0.2,1.5,0.7,2c0.5,0.5,1.1,0.7,2,0.7c0.8,0,1.5-0.2,1.9-0.7
                                c0.4-0.5,0.7-1.1,0.7-2V2.8c0-0.9-0.2-1.5-0.7-2C118,0.3,117.3,0.1,116.5,0.1"/>
                            <path className="fill-primary" d="M148.4,4.7c0.7,0,1.3-0.2,1.7-0.6c0.4-0.4,0.5-0.9,0.5-1.6c0-0.7-0.2-1.2-0.5-1.6c-0.4-0.4-0.9-0.5-1.7-0.5
                                h-18.1c-0.9,0-1.6,0.2-2.1,0.7c-0.5,0.5-0.7,1.2-0.7,2.1v30.5c0,0.9,0.2,1.6,0.7,2.1s1.2,0.7,2.1,0.7c1.7,0,2.5-0.9,2.5-2.8V20.4
                                h14.6c0.7,0,1.2-0.2,1.6-0.6s0.6-0.9,0.6-1.6c0-0.7-0.2-1.2-0.6-1.5s-0.9-0.5-1.6-0.5h-14.6V4.7H148.4z"/>
                            <path className="fill-primary" d="M212.5,1.7c-0.1-0.5-0.3-0.9-0.7-1.2c-0.4-0.3-0.9-0.4-1.5-0.4c-0.7,0-1.3,0.2-1.8,0.5
                                c-0.4,0.3-0.8,0.8-1.1,1.5l-11.8,27.5L183.7,2.1c-0.3-0.7-0.6-1.2-1-1.5c-0.4-0.3-1-0.5-1.8-0.5c-0.6,0-1.1,0.1-1.6,0.4
                                c-0.4,0.3-0.7,0.7-0.8,1.2c-0.1,0.5-0.1,1.1,0.2,1.8l13.7,31c0.3,0.7,0.7,1.2,1.2,1.6c0.5,0.4,1.1,0.5,1.9,0.5
                                c0.8,0,1.4-0.2,1.9-0.5c0.5-0.4,0.9-0.9,1.2-1.6l13.6-31C212.5,2.8,212.6,2.2,212.5,1.7"/>
                            <path className="fill-primary" d="M149.4,35c0.1,0.5,0.3,0.9,0.7,1.2c0.4,0.3,0.9,0.4,1.5,0.4c0.7,0,1.3-0.2,1.8-0.5c0.4-0.3,0.8-0.8,1.1-1.5
                                l11.8-27.5l11.9,27.5c0.3,0.7,0.6,1.2,1,1.5c0.4,0.3,1,0.5,1.8,0.5c0.6,0,1.1-0.1,1.5-0.4c0.4-0.3,0.7-0.7,0.8-1.2
                                c0.1-0.5,0.1-1.1-0.2-1.8l-13.7-31c-0.3-0.7-0.7-1.2-1.2-1.6c-0.5-0.4-1.1-0.5-1.9-0.5c-0.8,0-1.4,0.2-1.9,0.5
                                c-0.5,0.4-0.9,0.9-1.2,1.6l-13.6,31C149.4,33.9,149.3,34.5,149.4,35"/>
                        </g>
                    </svg>
                    <h2 className='text-center font-bold text-lg leading-5 my-6'>Rejoignez HiGHFAV<br/> dès maintenant.</h2>
                </div>

                <form onSubmit={handleSubmit(datas)} className='w-full'>
                    
                    <div className='mt-16'>
                        <label htmlFor="email" className="block text-sm text-tertiary-300 font-bold text-left">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            autoComplete='off'
                            className="text-primary border-b border-tertiary-300 w-full focus:outline-none font-bold"
                            {...register("email", { 
                                required: "Il faut remplir l'Email",
                                pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Mauvais format d'Email"
                                }
                            })} 
                        />
                        <p className="error">{errors.email && errors.email.message}</p>
                    </div>
                    

                    <div className='mt-10'>
                        <label htmlFor="password" className="block text-sm text-tertiary-300 font-bold text-left">Password</label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input 
                                {...register("password", { 
                                    required: "Il faut remplir le password",
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/g,
                                        message: "Mauvais format de mot de pass"
                                    }
                                })} 
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password" 
                                id="password"
                                autoComplete='off' 
                                className="text-primary border-b border-tertiary-300 w-full focus:outline-none font-bold"
                                onChange={handleChange('password')}
                                
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <button 
                                    type='button'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword 
                                    ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-tertiary-300 mb-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    : 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-tertiary-300 mb-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    }
                                </button>
                            </div>
                        </div>
                        <p className="error">{errors.password && errors.password.message}</p>
                        <p className="error">{MsgCompte}</p>
                    </div>
                
                    <div className='mt-8 flex flex-col items-center'>
                        <button type="submit" id="buttonSubmitLogin" className="bg-primary text-tertiary-100 rounded-3xl px-6 py-2 mb-5 w-full">
                            CONNEXION
                        </button>
                        <p className='text-sm font-bold'><NavLink to='/loginCreate'>Vous n'avez pas de compte ?</NavLink></p>
                    </div>

                    
        
                </form>
            </div>
        </>
    )
    
}

export default Formlogin;