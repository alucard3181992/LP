import { Button } from "primereact/button"
import Link from 'next/link';

function Error({ statusCode }) {
  return (
    <div className="fondo" style={{ top: 0 }}>
      <div className='loginContenedor loginImagen'>
        <div className="text-center">
          <div className="font-bold text-5xl mb-3">
            {statusCode
              ? <>
                <div>Error {statusCode}</div>
                <div>Pagina No Encontrada</div>
              </>
              : <div>Error General</div>}
          </div>
          <div>
            <Link href={"/"} className='p-button font-bold mr-3 p-button-raised' >
              <i className='pi pi-fw pi-home' />
              <span >Pagina Principal</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error