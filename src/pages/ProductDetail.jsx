import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
import Swal from "sweetalert2"
import { useApiFakeStore } from "../helpers/useApi"

const ProductDetail = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [producto, setProducto] = useState({})
  const productosLs = JSON.parse(localStorage.getItem('productos')) || []

  const buscarProducto = async () => {
    const data = await useApiFakeStore(params.id)
    setProducto(data)
    /* const productoFiltrado = productosLs.find((producto) => producto.id === Number(params.id))
    setProducto(productoFiltrado) */
  }

  const agregarProductoCarrito = () => {
    const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || null
    const carritoLs = JSON.parse(localStorage.getItem('carrito')) || []

    if (!usuarioLogeado) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesion para poder comprar",
        text: "En breve seras redirigido a iniciar tu sesion",
      });

      setTimeout(() => {
        navigate('/login')
      }, 500);
    }

    const productoExisteCarrito = carritoLs.find((prod) => prod.id === Number(params.id))

    if (productoExisteCarrito) {
      Swal.fire({
        icon: "info",
        title: "El producto ya esta cargado en el carrito",
        text: "Para modificar la cantidad debes ir al carrito",
      });
      return
    }

    carritoLs.push(producto)
    localStorage.setItem('carrito', JSON.stringify(carritoLs))
    Swal.fire({
      icon: "success",
      title: "El producto se cargo al carrito con exito",
      text: "Podes modificar la cantidad desde el carrito",
    });


  }

  const comprarProductoMP = () => {
    const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || null

    if (!usuarioLogeado) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesion para poder comprar",
        text: "En breve seras redirigido a iniciar tu sesion",
      });

      setTimeout(() => {
        navigate('/login')
      }, 500);
    }
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

            <Button className="mx-3" variant="warning" onClick={agregarProductoCarrito}>Agregar Carrito</Button>
            <Button variant="success" onClick={comprarProductoMP}>Comprar</Button>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default ProductDetail
