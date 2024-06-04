import React, { useRef, useState } from 'react';

import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { Image } from 'primereact/image';
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";
import { BlockUI } from 'primereact/blockui';

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { ImagenC } from '../Esqueleto/VistaSkeleton';

export default function ArchivoImagen({ codigoBase64, campo }) {

  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  const [nuevaImg, setImg] = useState("");
  const [tamaño, setTamaño] = useState(0);
  const [valor, setValor] = useState(20);
  const [archivoImg, setArchivo] = useState();
  const [bloqueo, setBloqueo] = useState(false);

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    setTamaño(0);
    setImg("");
    codigoBase64(campo, null);
    callback();
  };

  function descargarImagen() {
    setBloqueo(true)
    const link = document.createElement('a');
    link.download = `ImagenNueva.png`;
    link.href = nuevaImg;
    link.click();
    setBloqueo(false)
  }

  const handleUpload = async (event) => {
    setBloqueo(true)
    const file = event.files[0];
    setArchivo(event.files[0]);
    convertirImagen(file, valor / 100);
  };

  const conversion = () => {
    setBloqueo(true)
    convertirImagen(archivoImg, valor / 100);
  }

  const misNombres = {};
  misNombres.Image = window.Image;


  const convertirImagen = (archivo, calidad) => {
    const img = new misNombres.Image();
    const reader = new FileReader();

    reader.readAsDataURL(archivo);
    reader.onload = function (event) {
      img.src = event.target.result;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(function (blob) {
          const newImgFile = new File([blob], "newImage.jpg", {
            type: "image/jpeg",
          });

          const reader2 = new FileReader();
          reader2.readAsDataURL(newImgFile);
          var kilobytes = newImgFile.size / 1024;
          var formattedSize = kilobytes.toFixed(3) + ' KB';
          setTamaño(formattedSize)
          reader2.onload = function () {
            //const base64Img = window.btoa(reader2.result);
            codigoBase64(campo, reader2.result);
            setImg(reader2.result);
            setBloqueo(false)
          };
        }, "image/jpeg", calidad);
      };
    };
  };

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

  const itemTemplate2 = (file, props) => {
    return (<React.Fragment>
      {bloqueo ? <ImagenC animacion={"P"} mensaje={"Cargando Imagen"} todo={true} /> : <div>
        <div className='centro-total gap-4 p-3' style={{ background: "#12121294" }}>
          <Button type="button" icon="pi pi-replay" tooltip='Volver a Optimizar' tooltipOptions={{ position: "bottom" }} className="p-button-outlined p-button-rounded p-button-warning" onClick={conversion} />
          <Button type="button" icon="pi pi-times" tooltip='Remover Imagen' tooltipOptions={{ position: "bottom" }} className="p-button-outlined p-button-rounded p-button-danger" onClick={() => onTemplateRemove(file, props.onRemove)} />
          <Button type="button" icon="pi pi-download" tooltip='Descargar Imagen' tooltipOptions={{ position: "bottom" }} className="p-button-outlined p-button-rounded" onClick={descargarImagen} />
        </div>
        <ReactCompareSlider
          itemOne={
            <div className='ContenedorImg'>
              <ReactCompareSliderImage src={file.objectURL} alt="Original" style={{ objectFit: "fill", height: "300px", width: "100%" }} />
              <div className='IzquierdaArriba'>
                <span className="text-500 font-medium mb-3 IzquierdaArriba">Original</span>
              </div>
              <div className='IzquierdaAbajo'>
                <Tag value={props.formatSize} />
              </div>
            </div>}
          itemTwo={
            <div className='ContenedorImg'>
              <ReactCompareSliderImage src={nuevaImg} alt="Optimizada" style={{ objectFit: "fill", height: "300px", width: "100%" }} />
              <div className='DerechaArriba'>
                <span className="text-500 font-medium mb-3 DerechaArriba">Optimizada</span>
              </div>
              <div className='DerechaAbajo'>
                <Tag value={tamaño} />
              </div>
            </div>
          }
          style={{ height: "300px", width: "100%" }}
        />
      </div>}
    </React.Fragment>);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton } = options;
    const value = totalSize / 10000;
    const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';
    return (
      <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
        {totalSize === 0 ? chooseButton : <><i className='pi pi-verified' style={{ fontSize: "2rem", color: "#6ebe71" }}></i></>}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
        </div>
        <div style={{ width: '100%' }}>
          <InputText disabled value={"Calidad de conversion: " + valor + "%"} onChange={(e) => setValor(e.target.value)} />
          <Slider value={valor} onChange={(e) => setValor(e.value)} step={10} max={90} />
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
    if (_totalSize <= 1000000) {
      setTotalSize(_totalSize)
    }

  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };

  return (
    <>
      <FileUpload
        name="invoice"
        accept="image/*"
        customUpload={true}
        uploadHandler={handleUpload}
        mode="advanced"
        auto={true}
        chooseOptions={chooseOptions}
        invalidFileSizeMessageDetail="Maximo de subida 1Mb"
        invalidFileSizeMessageSummary=" "
        maxFileSize={1000000}
        emptyTemplate={emptyTemplate}
        itemTemplate={itemTemplate2}
        headerTemplate={headerTemplate}
        ref={fileUploadRef}
        onSelect={onTemplateSelect}
        onClear={onTemplateClear}
      //onProgress={(e) => setProgress(e.originalEvent.loaded / e.originalEvent.total * 100)}
      />
    </>
  );
};

