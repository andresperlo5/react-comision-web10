import Carousel from 'react-bootstrap/Carousel';
import './CarouselC.css'

const CarouselC = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVlmWueUsfk-7eDhFEOyKZAUkQVLj2fpWqSw&s" alt="imagen1" className='w-100' />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://www.lavanguardia.com/files/image_449_253/uploads/2022/05/17/628374a0e3443.jpeg" alt="imagen2" className='w-100' />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://media.istockphoto.com/id/1222129169/es/foto/v%C3%ADa-l%C3%A1ctea-con-%C3%A1rbol-solitario-en-la-noche-oscura.jpg?s=612x612&w=0&k=20&c=u50PccdtXqpNiyOcp8U9vL6LPE4emJemcxZpg9or74U=" alt="imagen3" className='w-100' />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselC
