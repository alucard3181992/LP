import '@/styles/globals.css'
//import "primereact/resources/themes/arya-blue/theme.css";

import "primeflex/primeflex.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import InicioPage from '@/components/Inicio/Inicio';

export default function App({ Component, pageProps }) {
  return (
    <>
      <InicioPage Component={Component} pageProps={pageProps} />
    </>
  )
}
