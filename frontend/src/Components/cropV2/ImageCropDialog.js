import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

const aspectRatios = [
    { value: 4/3, text:"4/3" },
    { value: 16/9, text:"16/9" },
    { value: 1/2, text:"1/2" },
    { value: 1/1, text:"1/1" },
];

function ImageCropDialog({ id, imageUrl, cropInit, zoomInit, aspectInit, onCancel, setCroppedImageFor, resetImage }) {

    if (zoomInit == null) {
        zoomInit = 1;
    }
    if (cropInit == null) {
        cropInit = {x:0, y:0}
    }
    if (aspectInit == null) {
        aspectInit = aspectRatios[3];
    }
    const [zoom, setZoom] = useState(zoomInit);
    const [crop, setCrop] = useState(cropInit);
    const [aspect, setAspect] = useState(aspectInit);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop)
    };
    const onZoomChange = (zoom) => {
        setZoom(zoom)
    };
    const onAspectChange = (e) => {
        const value = e.target.value;
        const ratio = aspectRatios.find(ratio => ratio.value == value);
        setAspect(ratio);
    };
    const onCropComplete = ( croppedArea, croppedAreaPixels ) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };
    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
        setCroppedImageFor(id, crop, zoom, aspect, croppedImageUrl);
    };
    const onResetImage = () => {
        resetImage(id);
    };

    return(
        <>
            <div className="backdrop"></div>    
            <div className="crop-container">
                <Cropper 
                    image={imageUrl} 
                    zoom={zoom}
                    crop={crop}
                    aspect={aspect.value}
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
                    {/* <select onChange={onAspectChange}>
                        {aspectRatios.map((ratio) => (
                            <option 
                                key={ratio.text} 
                                value={ratio.value} 
                                selected={ratio.value === aspect.value}
                            >
                                {ratio.text}
                            </option>
                        ))}
                    </select> */}
                </div>
                <div className="buttons-area absolute bottom-0 mb-10 flex">
                    <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={onCancel}
                    >Cancel</button>
                    <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={onResetImage}
                    >Reset</button>
                    <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={onCrop}
                    >Crop</button>
                </div>
            </div>
        </>
    )
    
}

export default ImageCropDialog;