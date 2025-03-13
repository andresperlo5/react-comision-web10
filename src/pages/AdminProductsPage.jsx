import { Container } from "react-bootstrap"
import TableC from "../components/table/TableC"
import { useEffect, useState } from "react"
import { Link } from "react-router"


const AdminProductsPage = () => {
  const [productos, setProductos] = useState([])

  const obtenerProductos = () => {
    const productosLs = JSON.parse(localStorage.getItem('productos'))
    setProductos(productosLs)
  }

  useEffect(() => {
    obtenerProductos()
  }, [])

  return (
    <>
      <Container className="my-5">
        <div className="d-flex justify-content-end mb-3">
          <Link className="btn btn-primary" to={'/admin/products/createUpdate'}>Agregar Producto</Link>
        </div>
        <TableC array={productos} idPage='products' funcionReseteador={obtenerProductos} />
      </Container>
    </>
  )
}

export default AdminProductsPage
