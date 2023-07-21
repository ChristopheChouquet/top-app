import { useEffect, useState } from "react";
import ImageCropDialog from "../Components/cropV2/ImageCropDialog";
import axios from "axios";


function TestCropperParentVrai() {


    const [user, setUser] = useState([]);
    const [imgs, setImgs] = useState([]);
    
    useEffect(() => {
      // On récupère l'iD du user connecté
      const currentUserId = JSON.parse(localStorage.getItem("userData")).userId;
    
      axios({
        method: 'get',
        url:   process.env.REACT_APP_BACKEND_URL + `/user/${currentUserId}`
      })
        .then(function (response) {
          console.log(response);
          setUser(response.data[0]);
        })
        .catch(function (error) {
          console.error('impossible de récupérer l avatar :', error);
        })
    }, []);
    
    useEffect(() => {
        if (user.avatar) {
          setImgs((prevImgs) => [...prevImgs, { id: 1, imageUrl: user.avatar, croppedImageUrl: null }]);
          console.log('imgsTes', imgs);
        }
    }, [user.avatar]);




    const [selectedImg, setSelectedImg] = useState(null);

  const onCancel = () => {
    setSelectedImg(null);
  }

  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
    const newImgList = [...imgs];
    const imgIndex = imgs.findIndex((x) => x.id === id);
    const img = imgs[imgIndex];
    const newImg = {...img, croppedImageUrl, crop, zoom, aspect};
    newImgList[imgIndex] = newImg;
    console.log(newImg);
    setImgs(newImgList);
    console.log(id);
    setSelectedImg(null);




    // Enregistrer l'image cropée dans la base de données
    const currentUserId = JSON.parse(localStorage.getItem("userData")).userId;

    console.log('croppedImageUrl', croppedImageUrl);
    axios({
        method: 'post',
        url:   process.env.REACT_APP_BACKEND_URL + `/updateavataruser/${currentUserId}`, // URL de l'API pour mettre à jour l'utilisateur
        data: {
            avatar: croppedImageUrl,
            IDuser: currentUserId
        }
    })
    .then(function (response) {
        console.log('Image cropée enregistrée avec succès dans la base de données.');
    })
    .catch(function (error) {
        console.error('Erreur lors de l\'enregistrement de l\'image cropée :', error);
    });




  };

  const resetImage = (id) => {
    setCroppedImageFor(id);
  };

  return (
    <>
      {selectedImg ? (
        <ImageCropDialog 
          id={selectedImg.id} 
          imageUrl={selectedImg.imageUrl}
          cropInit={selectedImg.crop}
          zoomInit={selectedImg.zoom}
          aspectInit={selectedImg.aspect}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
          resetImage={resetImage}
          />
        ) : null}
      {imgs.map((img) => (
        <div className="imageCard" key={img.id}>
          <img 
            src={img.croppedImageUrl ? img.croppedImageUrl : img.imageUrl} 
            alt="" 
            onClick={() => {
              console.log('Image sélectionnée', img);
              setSelectedImg(img)
            }
          }/>
        </div>
      ))}
    </>
  )
}

export default TestCropperParentVrai;
