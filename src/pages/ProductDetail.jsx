import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router"

const ProductDetail = () => {
  const params = useParams()
  const [producto, setProducto] = useState({})
  const productosLs = JSON.parse(localStorage.getItem('productos')) || []

  const buscarProducto = () => {
    const productoFiltrado = productosLs.find((producto) => producto.id === Number(params.id))
    setProducto(productoFiltrado)
  }

  useEffect(() => {
    buscarProducto()
  }, [])


  return (
    <>
      <Container className="my-5">
        <Row>
          <Col sm='12' md='6' className="col-img-detalle-producto text-center">
            <img src={producto.image} alt={producto.description} />
          </Col>
          <Col sm='12' md='6'>
            <h2>{producto.title}</h2>
            <p>${producto.price}</p>
            <p>{producto.description}</p>

            <Button className="mx-3" variant="warning">Agregar Carrito</Button>
            <Button variant="success">Comprar</Button>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default ProductDetail
