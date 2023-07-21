import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FooterAdmin from "./footer";
import HeaderAdmin from "./Header";

function UsersAdmin() {

    //Mise en place de la gestion du form avec useForm
    const {register, handleSubmit, reset} = useForm();

    // Stockage des tops
    const [user, setUser] = useState([]); 

    const onSubmit = function (data) {
        console.log(data);
    } 
    
    useEffect(() => {

        axios({
            method: 'get',
            url:   process.env.REACT_APP_BACKEND_URL + '/recherche'
        }).then((response) => {
            setUser(response.data);
        }).catch((error) => {  
            console.error(error);
        }); 

        //Gestion des icons du footer
        const footerIconSelector = document.querySelector('#footer > div > div > a:nth-child(1)');
        const selectAllSVGElement = footerIconSelector.querySelectorAll('*');
        selectAllSVGElement.forEach((element) => {
            element.classList.remove('stroke-tertiary-300');
            element.classList.add('stroke-primary');
        });


    }, []);


    return(
        <>
            <HeaderAdmin/>

            <div className="mt-6 mb-20">

                <form onSubmit={handleSubmit(onSubmit)} className="border-b">
                    <div className='mt-5 flex flex-col px-20'>
                        <div className="relative mb-6 rounded-full">
                            <input 
                                {...register("recherche")} 
                                type="text"
                                name="recherche" 
                                id="recherche"
                                placeholder="Recherche"
                                autoComplete='off' 
                                className="w-full text-tertiary-400 border-2 border-primary rounded-full placeholder:text-sm placeholder:text-tertiary-300 pl-2 focus:outline-none"
                                
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
                    <div key={user._id} className="w-full border-b p-2.5 pb-6 my-2">

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div>
                                    <img className="inline-block h-12 w-12 mr-2 rounded-full ring-2 ring-white"
                                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <p className="text-primary font-bold">ID : {user._id}</p>
                                    <p className="text-tertiary-300 font-semi">@{user.tagName}</p>
                                    <div className="flex flex-wrap">
                                        {user.motCles && (
                                            Array(10).fill(null).map((_, i) => user.motCles[`chip${i+1}`] && (
                                                <p className="text-tertiary-300 text-sm" key={i}>#{user.motCles[`chip${i+1}`]}&nbsp;</p>
                                            ))
                                        )}  
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button type="button"  className="inline-flex items-center rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-5 h-5 mr-2 stroke-tertiary-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                                Envoyer un mail
                            </button>

                            <button type="button" className="inline-flex items-center rounded-full bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-5 h-5 mr-2 stroke-tertiary-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                                Bannir
                            </button>
                        </div>


                    </div>
                ))}

                
            </div>
            <FooterAdmin/>
        </>
        
    )
    
}
export default UsersAdmin;
