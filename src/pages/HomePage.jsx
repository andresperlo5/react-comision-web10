import { Col, Container, Row } from 'react-bootstrap'
import CarouselC from '../components/carousel/CarouselC'
import CardC from '../components/card/CardC'
import { useEffect, useState } from 'react'
import { useApiFakeStore } from '../helpers/useApi'
import { useChangeTitle } from '../helpers/useChangeTitlePage'
import clientAxios from '../helpers/axios.config.helpers'
/* import { use - hook = funcion } from 'react' */

const HomePage = () => {
  useChangeTitle('home')
  // const [estado, funcion] = useState([])
  const [productos, setProductos] = useState([])
  /*   const [usuarios, setUsuarios] = useState([])
    const [numeros, setNumeros] = useState([]) */

  const obtenerProductos = async () => {
    try {

      const res = await clientAxios.get("/productos")
      console.log(res)
      setProductos(res.data.productos)

      /*   const productosBD = await fetch("http://localhost:3001/api/productos")
        const res = await productosBD.json()
        setProductos(res.productos)
        console.log(res)
   */
      /*   const productoLs = JSON.parse(localStorage.getItem('productos')) || []
  
        if (!productoLs.length) {
          const data = await useApiFakeStore()
          data.forEach(element => {
            productoLs.push({ ...element, status: 'enable' })
          });
          localStorage.setItem('productos', JSON.stringify(productoLs))
          setProductos(productoLs)
        } else {
          setProductos(productoLs)
        } */

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
