import { useForm } from "react-hook-form";

function FormRecherche({dataRecherche}) {

    //Mise en place de la gestion du form avec useForm
    const {register, handleSubmit, reset} = useForm();

    /*const onSubmit = function (data) {
        console.log(data);
    } */

    return(
        <form onSubmit={handleSubmit(dataRecherche)}>
            <div className='mt-5 flex flex-col px-20'>
                <div className="relative mt-2 rounded-md">
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
    )
    
}

export default FormRecherche;