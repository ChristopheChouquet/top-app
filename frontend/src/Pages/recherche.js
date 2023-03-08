import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

function Recherche() {
    // Stockage des tops
        const [user, setUser] = useState([]); 
    //Mise en place de la gestion du form avec useForm
        const {register, handleSubmit, reset} = useForm();

        const onSubmit = function (data) {
            console.log(data);
        }


    useEffect(() => {

        axios({
            method: 'get',
            url: 'http://localhost:5000/recherche'
        }).then((response) => {
            setUser(response.data);
        }).catch((error) => {  
            console.error(error);
        }); 

        //Gestion des icons du footer
        const footerIconSelector = document.querySelector('#footer > div > div > a:nth-child(2)');
        const selectAllSVGElement = footerIconSelector.querySelectorAll('*');
        selectAllSVGElement.forEach((element) => {
            element.classList.remove('stroke-tertiary-300');
            element.classList.add('stroke-primary');
        });

    }, []);


    return(
        <>
            <Header/>
            <div id="recherche" className="mb-16 mt-16">
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-5 flex flex-col px-20'>
                        <div className="relative mt-2 rounded-md">
                            <input 
                                {...register("recherche")} 
                                type="text"
                                name="recherche" 
                                id="recherche"
                                placeholder="Recherche"
                                autoComplete='off' 
                                className="w-full text-tertiary-400 border-2 border-primary rounded-xl placeholder:text-sm placeholder:text-tertiary-300 pl-2 focus:outline-none"
                                
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    className="w-5 h-5 stroke-tertiary-300 mr-2"
                                    onClick={() => {reset()}}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </form>

                {user.map(user => (
                    <div key={user._id}>
                        <div className="w-full flex flex-wrap p-4 my-2 rounded-lg text-left justify-between items-center">
                            <div>
                                <div className="flex items-center">
                                    <img className="inline-block h-12 w-12 mr-2 rounded-full ring-2 ring-white"
                                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                    <div>
                                        <p className="text-tertiary-400 font-bold">Pseudo</p>
                                        <p className="text-tertiary-400 font-semi">@login</p>
                                        <p className="text-tertiary-300 text-sm font-bold">@mot clés</p>
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="abonne" className="flex justify-center items-center p-2 rounded-md cursor-pointer">
                                <input id="abonne" type="checkbox" className="hidden peer" />
                                <span className="font-bold border border-secondary px-4 py-2 rounded-3xl dark:bg-tertiary-100 peer-checked:dark:bg-secondary text-primary" >
                                    S'ABONNER
                                </span>
                            </label>
                        </div>
                    </div>
                ))}
                
            </div>
            <Footer/>
        </>
    )
}

export default Recherche;