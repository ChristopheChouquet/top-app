import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

function ImageCropDialog({ id, imageUrl, cropInit, zoomInit, aspectInit, onCancel, setCroppedImageFor }) {

    if (zoomInit == null) {
        zoomInit = 1;
    }
    if (cropInit == null) {
        cropInit = {x:0, y:0}
    }
    
    const [zoom, setZoom] = useState(zoomInit);
    const [crop, setCrop] = useState(cropInit);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop)
    };
    const onZoomChange = (zoom) => {
        setZoom(zoom)
    };
    const onCropComplete = ( croppedArea, croppedAreaPixels ) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };
    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
        setCroppedImageFor(id, crop, zoom, aspectInit, croppedImageUrl);
    };

    return(
        <>
            <div className="backdrop"></div>    
            <div className="crop-container">
                <Cropper 
                    image={imageUrl} 
                    zoom={zoom}
                    crop={crop}
                    aspect={aspectInit.value}
                    onCropChange={onCropChange}
                    onZoomChange={onZoomChange}
                    onCropComplete={onCropComplete}
                />
            </div>
            <div className="controls flex justify-center">
                <div className="controls-area absolute bottom-0 mb-20 w-80">
                    <input 
                        className="w-full" 
                        type="range" 
                        min={1} 
                        max={3} 
                        step={0.1} 
                        value={zoom} 
                        onInput={(e) => 
                            {onZoomChange(e.target.value);
                        }}
                    />
                </div>
                <div className="buttons-area absolute bottom-0 mb-10 flex">
                    <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={onCancel}
                    >Cancel</button>
                    <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={onCrop}
                    >Crop</button>
                </div>
            </div>
        </>
    )
    
}

export default ImageCropDialog;