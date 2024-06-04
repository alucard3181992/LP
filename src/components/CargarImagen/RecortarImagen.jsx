import { useState, useRef } from 'react';

import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { Image } from 'primereact/image';
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";
import { BlockUI } from 'primereact/blockui';
import { InputSwitch } from "primereact/inputswitch";
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { ToggleButton } from 'primereact/togglebutton';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function RecortarImagen() {
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [output, setOutput] = useState(null);

    const [totalSize, setTotalSize] = useState(0);
    const [tamaño, setTamaño] = useState(0);
    const [bloqueo, setBloqueo] = useState(false);
    const [automatico, setAutomatico] = useState(true);

    const imgRef = useRef(null);
    const fileUploadRef = useRef(null);



    function formatSize(bytes) {
        if (bytes >= 1024 * 1024) {
            return (bytes / (1024 * 1024)).toFixed(3) + ' MB';
        } else {
            return (bytes / 1024).toFixed(3) + ' KB';
        }
    }

    const cropImageNow = (accion) => {
        /* const image2 = image.current; */
        const image = imgRef.current;
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        /* ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high'; */

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        // Converting to base64
        if (accion === "Descargar") {
            const link = document.createElement('a');
            link.download = `ImagenRecortada.png`;
            link.href = canvas.toDataURL();
            link.click();
            setBloqueo(false)
        } else {
            const base64Image = canvas.toDataURL('image/jpeg');
            setTamaño(formatSize(base64Image.length))
            setOutput(base64Image);
        }

    }
    function recortarImagen() {
        automatico ? cropImageNow() : ""

    }
    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        setTamaño(0);
        setCrop({ aspect: 16 / 9 })
        setSrc(null)
        setOutput(null)
        callback();
    };


    const handleUpload = async (event) => {
        const file = event.files[0];
        setSrc(URL.createObjectURL(file))
        setBloqueo(true)
        setBloqueo(false)
    };

    const conversion = () => {
        setBloqueo(true)
        cropImageNow("Descargar")
    }

    const cargar = () => {
        return (
            <div> <i className="pi pi-spin pi-cog" style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i> </div>
        );
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column p-5" style={{ cursor: "pointer" }}>
                <i className="pi pi-image p-5 shadow-8 surface-card"
                    style={{ fontSize: '3em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}
                ></i>
                <span className="hover:shadow-8 text-center  m-3  font-bold">
                    Arrastre y suelte la imagen aquí
                </span>
            </div>
        );
    };



    const itemTemplate = (file, props) => {
        return (
            <BlockUI blocked={bloqueo} template={cargar}>

                <div className="grid">
                    <div className="col-12 md:col-6 ">
                        <div className='centro-total gap-4 p-3 h-full' style={{ background: "#12121294" }}>
                            <ToggleButton tooltip={"¿ Recorte Automatico ?"} checked={automatico} onChange={(e) => setAutomatico(e.value)} onIcon="pi pi-check" offIcon="pi pi-times" onLabel="Recorte Automatico" offLabel="Recorte Manual"
                                className={`border-none ${automatico ? '' : 'bg-purple-500'}`}
                            />
                        </div>
                    </div>
                    <div className="col-12 md:col-6 ">
                        <div className='centro-total gap-4 p-3 h-full' style={{ background: "#12121294" }}>
                            {crop.aspect === 16 / 9 ? "" : < Button type="button" icon="pi pi-replay" tooltip='Recotar' tooltipOptions={{ position: "bottom" }} className="p-button-outlined p-button-rounded p-button-warning" onClick={cropImageNow} />}
                            <Button type="button" icon="pi pi-times" tooltip='Remover Imagen' tooltipOptions={{ position: "bottom" }} className="p-button-outlined p-button-rounded p-button-danger" onClick={() => onTemplateRemove(file, props.onRemove)} />
                            {output && <Button type="button" icon="pi pi-download" tooltip='Descargar Imagen' tooltipOptions={{ position: "bottom" }} className="p-button-outlined p-button-rounded" onClick={conversion} />}
                        </div>
                    </div>
                    <div className="col-12 md:col-12 lg:col-6">
                        {src && (
                            <ReactCrop
                                src={src}
                                crop={crop}
                                onChange={setCrop}
                                onComplete={recortarImagen}
                                className='w-full'
                            >
                                <div className='ContenedorImg border-round'>
                                    <img src={src} ref={imgRef} style={{ height: "300px", width: "100%" }} />
                                    <div className='IzquierdaArriba'>
                                        <span className="text-500 font-medium mb-3 IzquierdaArriba">Original</span>
                                    </div>
                                    <div className='IzquierdaAbajo'>
                                        <Tag value={props.formatSize} />
                                    </div>
                                </div>
                            </ReactCrop>
                        )}
                    </div>
                    <div className="col-12 md:col-12 lg:col-6 centro-total">
                        {output &&
                            <div className='ContenedorImg centro-total h-full' style={{ background: "#12121294" }}>
                                <img src={output} /* style={{ height: "300px", width: "100%" }} */ />
                                <div className='IzquierdaArriba'>
                                    <span className="text-500 font-medium mb-3 IzquierdaArriba">Modificada</span>
                                </div>
                                <div className='IzquierdaAbajo'>
                                    <Tag value={tamaño} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </BlockUI>
        );
    };

    const headerTemplate = (options) => {
        const { className, chooseButton } = options;
        const value = totalSize / 1000000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';
        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {totalSize === 0 ? chooseButton : <><i className='pi pi-verified' style={{ fontSize: "2rem", color: "#6ebe71" }}></i></>}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 100 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
                <div className='grid' style={{ width: '100%' }}>

                </div>

            </div>
        );
    };

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });
        if (_totalSize <= 100000000) {
            setTotalSize(_totalSize)
        }

    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };

    return (
        <div className="App">
            <FileUpload
                name="invoice"
                accept="image/*"
                customUpload={true}
                uploadHandler={handleUpload}
                mode="advanced"
                auto={true}
                chooseOptions={chooseOptions}
                invalidFileSizeMessageDetail="Maximo de subida 100Mb"
                invalidFileSizeMessageSummary=" "
                maxFileSize={100000000}
                emptyTemplate={emptyTemplate}
                itemTemplate={itemTemplate}
                headerTemplate={headerTemplate}
                ref={fileUploadRef}
                onSelect={onTemplateSelect}
                onClear={onTemplateClear}
            //onProgress={(e) => setProgress(e.originalEvent.loaded / e.originalEvent.total * 100)}
            />
        </div>
    );
}


