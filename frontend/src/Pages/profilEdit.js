import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imageCompression from 'browser-image-compression';

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ImageCropDialog from "../Components/cropV2/ImageCropDialog";

function ProfilEdit({datas}) {

    //Mise en place de la gestion du form avec useForm
    const {register, handleSubmit, formState: {errors}} = useForm();
    //stockat des users
    const [user, setUser] = useState([]);
    //stockage de l'image selectionné dans l'input
    const [imageselect, setImageSelect] = useState(null);
    const [imgs, setImgs] = useState([]);

    useEffect(() => {

        //On récupère l'iD du user connecté
        const currentUserId = JSON.parse(localStorage.getItem("userData")).userId;

        axios({
            method: 'get',
            url:   process.env.REACT_APP_BACKEND_URL + `/user/${currentUserId}`
        }).then(function (response) {
            setUser(response.data[0]);
        }).catch(() => { 
            
        });

    }, []);


    //Preview de l'image slectionnée dans le input
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file); 
            reader.onloadend = () => {
                const base64Image = reader.result;
                setImageSelect(base64Image);
            };

            console.log('imageselect', imageselect);
            console.log('imgs', imgs);

            /* const options = {
                maxSizeMB: 0.03, // Taille maximale de l'image compressée en Mo (30 Ko dans cet exemple)
                maxWidthOrHeight: 1500, // Largeur ou hauteur maximale de l'image
                useWebWorker: true, // Utilisation d'un Web Worker pour la compression
                fileType: 'jpeg', // Format de fichier de sortie (jpeg dans cet exemple)
                maxIteration: 10, // Nombre maximum d'itérations de compression
                initialQuality: 1, // Qualité de compression initiale (entre 0 et 1)
            };
      
            imageCompression(file, options)
            .then((compressedFile) => {
            // Convertir le fichier compressé en base64
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                const compressedBase64Image = reader.result;

                console.log('file base64', compressedBase64Image);
    
                // Récupérer la taille de l'image compressée
                const byteLength = compressedBase64Image.length;
                const kilobytes = Math.ceil(byteLength / 1024);
    
                setImageSelect(compressedBase64Image);
                console.log(kilobytes + ' Ko');
            };
            })
            .catch((error) => {
            console.error('Erreur lors de la compression de l\'image :', error);
            }) */ 
            
        }
    };



    const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
        setImgs(croppedImageUrl);
        setImageSelect(null);
     
    }; 


    const onCancel = () => {
        setImageSelect(null);
    }
      
    const resetImage = (id) => {
        setCroppedImageFor(id);
    };



    //Usetate des chips (mot clés)
    const [inputValueChip, setInputValueChip] = useState('');

    const addChiptest = function () {

        const numElements = user.motCles ? Object.keys(user.motCles).length : 0;
             
        if (inputValueChip[0].valeur !== '' && numElements < 5) {
            const newChip = {
                key: `chip${numElements + 1}`,
                valeur: inputValueChip,
            }
            
            setInputValueChip('');
            setUser((prevUser) => ({
                ...prevUser,
                motCles: {
                  ...prevUser.motCles,
                  [newChip.key]: newChip.valeur,
                },
            }));
        }
    }


    //Suppression des chips
    const handleDelete = (chipToDelete) => () => {
        setUser((prevUser) => ({
            ...prevUser,
            motCles: Object.fromEntries(
                Object.entries(prevUser.motCles).filter(([key, value]) => key !== chipToDelete)
            ),
        }));
    };

    //Validation des modifs
    const onSubmit = function(data) {

        //Si le pseudo n'est pas mis à jour ou vide, c'est l'ancien qui est pris en compte
        const newPseudo = data.pseudo ? data.pseudo : user.pseudo;

        //On récupère l'iD du user connecté
        const currentUserId = JSON.parse(localStorage.getItem("userData")).userId;

        const imageUrl = imgs;
        fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
            const options = {
                maxSizeMB: 0.03, // Taille maximale de l'image compressée en Mo (30 Ko dans cet exemple)
                maxWidthOrHeight: 100, // Largeur ou hauteur maximale de l'image
                useWebWorker: true, // Utilisation d'un Web Worker pour la compression
                fileType: 'jpeg', // Format de fichier de sortie (jpeg dans cet exemple)
                maxIteration: 10, // Nombre maximum d'itérations de compression
                initialQuality: 1, // Qualité de compression initiale (entre 0 et 1)
            };
      
            imageCompression(blob, options)
            .then((compressedFile) => {
            // Convertir le fichier compressé en base64
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                const compressedBase64Image = reader.result;

                // Récupérer la taille de l'image compressée
                const byteLength = compressedBase64Image.length;
                const kilobytes = Math.ceil(byteLength / 1024);
    
                setImgs(compressedBase64Image);
                console.log(kilobytes + ' Ko');


                const updateUserAccount = {
                    IDuser: currentUserId,
                    avatar: compressedBase64Image,
                    pseudo: newPseudo,
                    motCles: user.motCles
                };

                axios({
                    method: 'post',
                    url:   process.env.REACT_APP_BACKEND_URL + '/updateuser',
                    data: updateUserAccount
                }).then((response) => {
                    console.log(response);
                }).catch((error) => { 
                    console.error(error);
                });
            };
            })
            .catch((error) => {
            console.error('Erreur lors de la compression de l\'image :', error);
            }) 
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération du Blob:', error);
        });

        
    }


    return(
        <>
            <Header/>
                <div id="profil" className="pt-20">
                
                    <h2 className='text-left font-bold text-2xl leading-5 m-10'>Profil</h2>
                    <div className='flex flex-col items-center justify-center'>

                        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>  

                        {/* Gestion de l'avatar et de la banniere */}
                        <div className="flex relative mb-10">
                            <div className="w-full text-center relative flex flex-col justify-center">
                                <img 
                                    src={process.env.PUBLIC_URL + '/' + user.banniere} 
                                    alt="banniere" 
                                    className="h-28"
                                />
                            </div>
   
                            <div className="absolute z-10 left-0 bg-white h-full width-custom-mask-profil"></div>
                            <div className="w-1/5 absolute z-10 left-0">
                                <label htmlFor="fileInput" className="fileInputLabel">
                                    <img 
                                        alt="preview" 
                                        src={imgs.length !== 0 ? imgs : process.env.PUBLIC_URL + '/' + user.avatar}
                                        className="rounded-full border-8 border-tertiary-100 h-28 w-28"
                                    />
                                </label>
                                <input 
                                    type="file" 
                                    id="fileInput" 
                                    onChange={onImageChange}
                                    className="fileInput" 
                                />
                            </div>
                            


                        </div> 
      
                            
                            <div className='mt-5 p-10'>
                                <label htmlFor="pseudo" className="block text-sm text-tertiary-300 font-bold text-left">
                                    Pseudo
                                </label>
                                <input
                                    defaultValue={user.pseudo}
                                    onChange={(e) => setUser((prevUser) => ({ ...prevUser, pseudo: e.target.value }))}
                                    type="text" 
                                    name="pseudo"
                                    id="pseudo"
                                    autoComplete='off'
                                    className="text-primary border-b border-tertiary-300 w-full focus:outline-none font-bold"
                                    {...register("pseudo")}
                                />                                
                            </div>

                            <div className='mt-5 p-10'>
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

                                {Array(10).fill(null).map((_, i) => user.motCles && user.motCles[`chip${i+1}`] && (
                                    <div key={`chip${i+1}`} className="rounded-full bg-secondary px-6 py-2 inline-flex justify-between mt-2">
                                        <span className="text-primary font-bold inline">{user.motCles[`chip${i+1}`]}</span>&nbsp;&nbsp;
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}  className="w-6 h-6 stroke-tertiary-300" onClick={handleDelete(`chip${i+1}`)}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                ))}


                            </div>

                            


                            <div className='mt-8 flex flex-col items-center p-10'>
                                <button type="submit" id="buttonSubmit" className="bg-primary text-tertiary-100 rounded-full px-6 py-2 mb-5 w-full">
                                ENREGISTRER LES MODIFICATIONS
                                </button>
                            </div>
                
                        </form>
                        

                    </div>
                </div>
                
            <Footer SelectedIcon={null}/>
            {imageselect ? (
                <div className="fixed z-50 top-0 left-0 h-full w-full">
                    <ImageCropDialog 
                        id={imageselect.id} 
                        imageUrl={imageselect}
                        cropInit={imageselect.crop}
                        zoomInit={imageselect.zoom}
                        aspectInit={imageselect.aspect}
                        onCancel={onCancel}
                        setCroppedImageFor={setCroppedImageFor}
                        resetImage={resetImage}
                    />
                </div>
            ) : null}
                            
        </>
    )
}

export default ProfilEdit;