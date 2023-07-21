import { useState } from "react";
import ImageCropDialog from "../Components/cropV2/ImageCropDialog";


function TestCropperParent() {

  const InitData = [
    {
      id : 1,
      imageUrl : "img/avatar_old.png",
      croppedImageUrl : null,
    },
    {
      id : 2,
      imageUrl : "img/IMG_20220927_235417.jpg",
      croppedImageUrl : null,
    },
    {
      id : 3,
      imageUrl : "img/IMG_20220928_162127.jpg",
      croppedImageUrl : null,
    },
  ];

  const [imgs, setImgs] = useState(InitData);
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

export default TestCropperParent;
