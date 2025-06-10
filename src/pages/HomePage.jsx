import { Col, Container, Row } from 'react-bootstrap'
import CarouselC from '../components/carousel/CarouselC'
import CardC from '../components/card/CardC'
import { useEffect, useState } from 'react'
import { useChangeTitle } from '../helpers/useChangeTitlePage'
import clientAxios from '../helpers/axios.config.helpers'
/* import { use - hook = funcion } from 'react' */

const HomePage = () => {
  useChangeTitle("home")
  const [productos, setProductos] = useState([])

  const obtenerProductos = async () => {
    try {

      const res = await clientAxios.get("/productos")
      setProductos(res.data.productos)

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
              < Col sm='12' md='6' lg='4' key={producto._id} className='my-3' >
                <CardC urlImage={producto.imagen} alt={producto.descripcion} titulo={producto.nombre} descripcion={producto.description} precio={producto.precio} idProducto={producto._id} />
              </Col>
            )
          }


        </Row>
      </Container >
    </>
  )
}

export default HomePage
