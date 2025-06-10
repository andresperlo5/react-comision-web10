import Card from 'react-bootstrap/Card';
import { Link } from 'react-router'
import './CardC.css'

const CardC = ({ urlImage, alt, titulo, descripcion, idProducto, precio }) => {
  /*   const { urlImage, alt } = props */
  return (
    <>
      <Card>
        <Card.Img variant="top" src={urlImage.includes("public") ? `${import.meta.env.VITE_URL_BACK_LOCAL}/${urlImage}` : urlImage} alt={alt} />
        <Card.Body>
          <Card.Title className='text-truncate'>{titulo}</Card.Title>
          <Card.Text>
            ${precio}
          </Card.Text>
          <Card.Text className='text-truncate'>
            {descripcion}
          </Card.Text>
          <div className='text-center'>
            <Link to={`/productDetail/${idProducto}`} className='btn btn-primary'>Ver Mas</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default CardC
