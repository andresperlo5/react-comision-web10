import Card from 'react-bootstrap/Card';
import { Link } from 'react-router'

const CardC = () => {
  return (
    <>
      <Card>
        <Card.Img variant="top" src="https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div className='text-center'>
            <Link to='/productDetail' className='btn btn-primary'>Ver Mas</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default CardC
