import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, NavLink } from "react-router-dom";

function FormloginCreate({ datas, isExistAccount, MsgCompte }) {

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









    //Usetate des chips (mot clés)
    const [chipDataCreate, setChipDataCreate] = useState([]);
    const [inputValueChip, setInputValueChip] = useState('');

    const addChiptest = function () {
        const newChip = {
            key : `chip${chipDataCreate.length+1}`,
            valeur : inputValueChip
        }
        
        const copyDataChip = [...chipDataCreate, newChip ];
        setChipDataCreate(copyDataChip);
        setInputValueChip('');
        console.log('chipDataCreate', copyDataChip);
        
    }

    //Suppression des chips
    const handleDelete = (chipToDelete) => () => {
        setChipDataCreate((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };


    const onSubmit = function(data) {
        console.log('datas', data);
        console.log('chipDataCreate', chipDataCreate);

        const newUserAccount = {
            pseudo: data.pseudo,
            tagName : data.tagName,
            email: data.email,
            password: data.password,
            motCles: {}
        };

        
        //On parcours tous les mot clés et on récupére leur valeur
        for (let i = 0; i < chipDataCreate.length; i++) {
            newUserAccount.motCles[`chip${i+1}`] = chipDataCreate[i].valeur;
        }
        console.log(newUserAccount);
        //On envoie le nouveau top au serveur
        datas(newUserAccount);
        
    }





    
    return(
        <>

            <h2 className='text-left font-bold text-2xl leading-5 m-10'>S'inscrire</h2>
            <div className='flex flex-col items-center justify-center p-10'>
            

                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>  

                    <div className='mt-5'>
                        <label htmlFor="pseudo" className="block text-sm text-tertiary-300 font-bold text-left">
                            Pseudo
                        </label>
                        <input
                            type="text"
                            name="pseudo"
                            id="pseudo"
                            autoComplete='off'
                            className="text-primary border-b border-tertiary-300 w-full focus:outline-none font-bold"
                            {...register("pseudo", { required: "Il faut remplir le pseudo" })} 
                        />
                        <p className="text-red-500">{errors.pseudo && errors.pseudo.message}</p>
                    </div>

                    <div className='mt-5'>
                        <label htmlFor="tagName" className="block text-sm text-tertiary-300 font-bold text-left">
                            @
                        </label>
                        <input
                            type="text"
                            name="tagName"
                            id="tagName"
                            autoComplete='off'
                            className="text-primary border-b border-tertiary-300 w-full focus:outline-none font-bold"
                            {...register("tagName", {required: "Il faut remplir le tag"})} 
                        />
                        <p className="text-red-500">{errors.tagName && errors.tagName.message}</p>
                    </div>


                    <div className='mt-5'>
                        <label htmlFor="motCles" className="block text-sm text-tertiary-300 font-bold text-left">Centre d'intérêt</label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input 
                                type="text"
                                name="motCles" 
                                id="motCles"
                                value={inputValueChip}
                                onChange={(e) => setInputValueChip(e.target.value)}
                                autoComplete='off' 
                                className="text-primary border-b border-tertiary-300 w-full focus:outline-none font-bold"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <button 
                                type='button'
                                    onClick={addChiptest}
                                >+
                                </button>
                            </div>
                        </div>
                    </div>
                    {chipDataCreate.map(chip => (
                        <p key={chip.key}>
                            {chip.valeur}
                            <button type="button" className='bg-primary' onClick={chip.valeur && handleDelete(chip)}>delete</button>
                        </p>
                    ))}

                    <div className='mt-5'>
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
                        <p className="text-red-500">{errors.email && errors.email.message}</p>
                    </div>

                    <div className='mt-5'>
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
                        <p className="text-red-500">{errors.password && errors.password.message}</p>
                        {isExistAccount ? <p className="error">{MsgCompte}</p> : <Navigate to="/login" />}
                    </div>

                    <div className='mt-8 flex flex-col items-center'>
                        <button type="submit" id="buttonSubmit" className="bg-primary text-tertiary-100 rounded-3xl px-6 py-2 mb-5 w-full">
                        ENREGISTRER
                        </button>
                        <p className='text-sm font-bold'><NavLink to='/login'><button type="button" id="buttonRetourSubmit">RETOUR</button></NavLink></p>
                    </div>
        
                </form>
            </div>
        </>                              
    )
}

export default FormloginCreate;