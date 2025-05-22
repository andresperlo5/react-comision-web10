import { Container } from "react-bootstrap"
import TableC from "../components/table/TableC"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import clientAxios from "../helpers/axios.config.helpers"


const AdminProductsPage = () => {
  const [productos, setProductos] = useState([])
  const usuarioLog = JSON.parse(sessionStorage.getItem('token'))

  const obtenerProductos = async () => {
    const res = await clientAxios.get("/productos")
    console.log(res)
    setProductos(res.data.productos)
    /* const productosLs = JSON.parse(localStorage.getItem('productos'))
    setProductos(productosLs) */
  }

  useEffect(() => {
    obtenerProductos()
  }, [])

  return (
    <>
      {
        usuarioLog &&
        <Container className="my-5">
          <div className="d-flex justify-content-end mb-3">
            <Link className="btn btn-primary" to={usuarioLog ? '/admin/products/createUpdate' : '#'}>Agregar Producto</Link>
          </div>
          <TableC array={productos} idPage='products' funcionReseteador={obtenerProductos} />
        </Container>
      }
    </>
  )
}

export default AdminProductsPage
