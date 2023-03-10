import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

function Profil({datas}) {

    //Mise en place de la gestion du form avec useForm
    const {register, handleSubmit, formState: {errors}} = useForm();

    //Usetate des chips (mot clés)
    const [chipDataCreate, setChipDataCreate] = useState([]);
    const [inputValueChip, setInputValueChip] = useState('');

    const [ user, setUser ] = useState([]);

    useEffect(() => {

        const cookie = document.cookie;

        // Recherche du token d'authentification dans le cookie
        const token = cookie.split(';').find(c => c.trim().startsWith(`auth`));

        // Extrait la valeur du token d'authentification
        const tokenValue = token ? token.split('=')[1] : null;

        axios({
            method: 'get',
            url: 'http://localhost:5000/profil',
            headers: {
              Authorization: 'Bearer ' + tokenValue
            }
        }).then((response) => {
            setUser(response.data);
        }).catch((error) => {  
            console.error(error);
        }); 

    }, []);



    

    const addChiptest = function () {
        if (inputValueChip[0].valeur !== '' && chipDataCreate.length < 5) {

            const newChip = {
                key : `chip${chipDataCreate.length+1}`,
                valeur : inputValueChip
            }
            
            const copyDataChip = [...chipDataCreate, newChip ]; 
            setChipDataCreate(copyDataChip);
            setInputValueChip('');
            console.log('chipDataCreate', copyDataChip);
        }
        
    }

    //Suppression des chips
    const handleDelete = (chipToDelete) => () => {
        console.log(chipToDelete);
        //setChipDataCreate((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));

        /* const updatedUserList = user.motCles.filter((u) => u.id !== chipToDelete);
        console.log(updatedUserList); */
        //setUser(updatedUserList);
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
            <Header/>
                <div id="profil" className="mt-20">
                    <h2 className='text-left font-bold text-2xl leading-5 m-10'>Profil</h2>
                    <div className='flex flex-col items-center justify-center p-10'>

                    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>  

                        <div className='mt-5'>
                            <label htmlFor="pseudo" className="block text-sm text-tertiary-300 font-bold text-left">
                                Pseudo
                            </label>
                            <input
                                defaultValue={user.pseudo}
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
                                disabled
                                defaultValue={user.tagName}
                                autoComplete='off'
                                className="text-primary border-b border-tertiary-300 w-full focus:outline-none font-bold"
                                {...register("tagName")} 
                            />
                        </div>


                        <div className='mt-5'>
                            <label htmlFor="motCles" className="block text-sm text-tertiary-300 font-bold text-left">Centres d'intérêt</label>
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
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 mb-3 stroke-tertiary-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {Array(10).fill(null).map((_, i) => user.motCles && user.motCles[`chip${i+1}`] && (
                            <div key={`chip${i+1}`} className="rounded-full bg-secondary px-6 py-2 inline-flex justify-between mt-2">
                                <span className="text-primary font-bold inline">{user.motCles[`chip${i+1}`]}</span>&nbsp;&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}  className="w-6 h-6 stroke-tertiary-300" onClick={handleDelete(`chip${i+1}`)}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        ))}


                        <div className='mt-8 flex flex-col items-center'>
                            <button type="submit" id="buttonSubmit" className="bg-primary text-tertiary-100 rounded-full px-6 py-2 mb-5 w-full">
                            ENREGISTRER LES MODIFICATIONS
                            </button>
                        </div>
            
                    </form>

                    </div>
                </div>
            <Footer/>
        </>
    )
}

export default Profil;