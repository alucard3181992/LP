import React, { useRef, useState, useEffect } from 'react';

import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { Image } from 'primereact/image';
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";
import { BlockUI } from 'primereact/blockui';

import Sobel from 'sobel';

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { ImagenC } from '../Esqueleto/VistaSkeleton';
const Archivo = ({ codigoBase64 }) => {


  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  const [nuevaImg, setImg] = useState("");
  const [tamaño, setTamaño] = useState(0);
  const [archivoImg, setArchivo] = useState();
  const [bloqueo, setBloqueo] = useState(false);

  const [valor, setValor] = useState({
    "Saturacion": 0,
    "Brillo": 20,
    "GrayScale": 80,
    "Opacidad": 90,
    "Invert": 100
  });


  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    setTamaño(0);
    setImg("");
    codigoBase64({ imagen1: null, imagen2: null });
    callback();
  };


  const handleUpload = async (event) => {
    setBloqueo(true)
    const file = event.files[0];
    setArchivo(event.files[0]);
    convertirImagen(file);

  };

  const conversion = () => {
    setBloqueo(true)
    convertirImagen(archivoImg);
  }
  const misNombres = {};
  misNombres.Image = window.Image;


  const convertirImagen = (archivo) => {
    const img = new misNombres.Image();
    const reader = new FileReader();

    reader.readAsDataURL(archivo);
    reader.onload = function (event) {
      img.src = event.target.result;
      img.onload = function () {
        invierteCanvas(img)
          .then(imgResultado1 => {
            return bordesSobel(imgResultado1);
          })
          .then(imgResultado3 => {
            return soloInvertir(imgResultado3)
          })
          .then(imgResultado2 => {
            setTamaño(formatSize(imgResultado2.src.length))
            setImg(imgResultado2.src)
            setBloqueo(false)
            codigoBase64({ imagen1: img.src, imagen2: imgResultado2.src })
            //mejorarCalidad(imgResultado2)
          })
          .catch(error => {
            console.error("Error:", error);
          });

      };
    };
  };

  function formatSize(bytes) {
    if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(3) + ' MB';
    } else {
      return (bytes / 1024).toFixed(3) + ' KB';
    }
  }

  function soloInvertir(img) {
    return new Promise((resolve, reject) => {
      // Crea un canvas para la imagen
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      // Obtiene el contexto 2D para el canvas
      const ctx = canvas.getContext('2d');

      ctx.filter = `invert(${valor.Invert}%)`
      ctx.drawImage(img, 0, 0);

      // Obtiene los datos de píxeles para la imagen
      ctx.getImageData(0, 0, canvas.width, canvas.height);

      const imgResultado = new misNombres.Image();
      imgResultado.src = canvas.toDataURL();
      //
      /* const link = document.createElement('a');
      link.download = `soloInvertir.png`;
      link.href = imgResultado.src;
      link.click(); */
      //
      resolve(imgResultado);
    });
  }

  function bordesSobel(img) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      var sobelData = Sobel(imageData);

      var sobelImageData = sobelData.toImageData();

      ctx.putImageData(sobelImageData, 0, 0);

      const imgResultado = new misNombres.Image();

      imgResultado.src = canvas.toDataURL();
      //
      /* const link = document.createElement('a');
      link.download = `bordesSobel.png`;
      link.href = imgResultado.src;
      link.click(); */
      //
      resolve(imgResultado);
    });
  }

  function invierteCanvas(img) {
    return new Promise((resolve, reject) => {
      // Crea un canvas para la imagen
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      // Obtiene el contexto 2D para el canvas
      const ctx = canvas.getContext('2d');

      ctx.filter = `saturate(${valor.Saturacion}%) brightness(${valor.Brillo}%)  grayscale(${valor.GrayScale}%) opacity(${valor.Opacidad}%) invert(${valor.Invert}%)`
      ctx.drawImage(img, 0, 0);

      // Obtiene los datos de píxeles para la imagen
      ctx.getImageData(0, 0, canvas.width, canvas.height);

      const imgResultado = new misNombres.Image();
      imgResultado.src = canvas.toDataURL();
      //
      /* const link = document.createElement('a');
      link.download = `invierteCanvas.png`;
      link.href = imgResultado.src;
      link.click(); */
      //
      resolve(imgResultado);
    });
  }

  function mejorarCalidad(img) {
    return new Promise((resolve, reject) => {
      // Crea un canvas para la imagen
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      // Obtiene el contexto 2D para el canvas
      const ctx = canvas.getContext('2d');

      // Activa el suavizado
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(img, 0, 0);

      const imgResultado = new misNombres.Image();
      imgResultado.src = canvas.toDataURL();

      // Descargar la imagen
      /* const link = document.createElement('a');
      link.download = `mejorarCalidad.png`;
      link.href = imgResultado.src;
      link.click(); */

      resolve(imgResultado);
    });
  }


  function descargarImagen() {
    setBloqueo(true)
    const link = document.createElement('a');
    link.download = `ImagenNueva.png`;
    link.href = nuevaImg;
    link.click();
    setBloqueo(false)
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
              <ReactCompareSliderImage src={file.objectURL} alt="Original" style={{ objectFit: "fill", height: "400px", width: "100%" }} />
              <div className='IzquierdaArriba'>
                <span className="text-500 font-medium mb-3 IzquierdaArriba">Original</span>
              </div>
              <div className='IzquierdaAbajo'>
                <Tag value={props.formatSize} />
              </div>
            </div>}
          itemTwo={
            <div className='ContenedorImg'>
              <ReactCompareSliderImage src={nuevaImg} alt="Optimizada" style={{ objectFit: "fill", height: "400px", width: "100%" }} />
              <div className='IzquierdaArriba'>
                <span className="text-500 font-medium mb-3 IzquierdaArriba">Modificada</span>
              </div>
              <div className='IzquierdaAbajo'>
                <Tag value={tamaño} />
              </div>
            </div>
          }
          style={{ height: "400px", width: "100%" }}
        />
      </div>}
      {/* <BlockUI blocked={bloqueo} template={cargar} fullScreen>

      </BlockUI> */}
    </React.Fragment>);
  };

  const cambioSlider = (value, campo) => {
    setValor({
      ...valor,
      [campo]: value
    })
  }
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
          {valor && Object.keys(valor).map((valorV, index) => (
            <div className="col-12 md:col-6" key={index}>
              <InputText className='w-full' disabled value={`${valorV}: ${valor[valorV]}%`} />
              <Slider value={valor[valorV]} onChange={(e) => cambioSlider(e.value, [valorV])} step={10} max={100} />
            </div>
          ))}
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
    <>
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
    </>
  );
};

export default Archivo;
