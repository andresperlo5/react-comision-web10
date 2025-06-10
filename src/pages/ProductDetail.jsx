import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
import Swal from "sweetalert2"
import clientAxios, { configHeaders } from "../helpers/axios.config.helpers"

const ProductDetail = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [producto, setProducto] = useState({})

  const buscarProducto = async () => {
    const res = await clientAxios.get(`/productos/${params.id}`)
    console.log(res.data)
    setProducto(res.data.producto)
  }
  
  const agregarProductoCarrito = async (idProducto) => {
    try {
      const usuarioLogeado = JSON.parse(sessionStorage.getItem('token')) || null

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

      const res = await clientAxios.put(`/carritos/add/${idProducto}`, {}, configHeaders)
      console.log(res)

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: `${res.data.msg}`,
          text: "En breve lo veras reflejado en el carrito",
        });
      }
    } catch (error) {
      if (error.status === 409) {
        Swal.fire({
          icon: "error",
          title: `${error.response.data.msg}`,
          text: "Podras modificar la cantidad solo desde la seccion del carrito",
        });

      }
    }

  }

  const comprarProductoMP = () => {
    const usuarioLogeado = JSON.parse(sessionStorage.getItem('token')) || null

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
            <img src={producto.imagen?.includes("public") ? `http://localhost:3001/${producto.imagen}` : producto.imagen} alt={producto.description} />
          </Col>
          <Col sm='12' md='6'>
            <h2>{producto.nombre}</h2>
            <p>${producto.precio}</p>
            <p>{producto.descripcion}</p>

            <Button className="mx-3" variant="warning" onClick={() => agregarProductoCarrito(producto._id)}>Agregar Carrito</Button>
            <Button variant="success" onClick={comprarProductoMP}>Comprar</Button>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default ProductDetail
