import { Col, Container, Row } from 'react-bootstrap'
import CarouselC from '../components/carousel/CarouselC'
import CardC from '../components/card/CardC'
import { useEffect, useState } from 'react'
import { useApiFakeStore } from '../helpers/useApi'
import { useChangeTitle } from '../helpers/useChangeTitlePage'
/* import { use - hook = funcion } from 'react' */

const HomePage = () => {
  useChangeTitle('home')
  // const [estado, funcion] = useState([])
  const [productos, setProductos] = useState([])
  /*   const [usuarios, setUsuarios] = useState([])
    const [numeros, setNumeros] = useState([]) */

  const obtenerProductos = async () => {
    try {

      const productoLs = JSON.parse(localStorage.getItem('productos')) || []

      if (!productoLs.length) {
        const data = await useApiFakeStore()
        data.forEach(element => {
          productoLs.push({ ...element, status: 'enable' })
        });
        localStorage.setItem('productos', JSON.stringify(productoLs))
        setProductos(productoLs)
      } else {
        setProductos(productoLs)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtenerProductos()
  }, [])

  return (
    <>
      <CarouselC />
      <Container className='my-5'>
        <Row>
          {
            productos.map((producto) =>
              producto.status !== 'disabled' &&
              < Col sm='12' md='6' lg='4' key={producto.id} className='my-3' >
                <CardC urlImage={producto.image} alt={producto.description} titulo={producto.title} descripcion={producto.description} precio={producto.price} idProducto={producto.id} />
              </Col>
            )
          }

          {/*  <Col sm='12' md='6' lg='4'>
            <CardC urlImage='https://www.lavanguardia.com/files/image_449_253/uploads/2022/05/17/628374a0e3443.jpeg' alt='imagen2' />
          </Col>
          <Col sm='12' md='6' lg='4'>
            <CardC urlImage='https://st2.depositphotos.com/4211709/7708/i/450/depositphotos_77085751-stock-photo-flower.jpg' alt='imagen3' />
          </Col> */}
        </Row>
      </Container >
    </>
  )
}

export default HomePage
