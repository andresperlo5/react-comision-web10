import { Container } from "react-bootstrap"
import TableC from "../components/table/TableC"
import { useEffect, useState } from "react"
import { Link } from "react-router"


const AdminUsersPage = () => {
  const [usuarios, setUsuarios] = useState([])

  const obtenerUsuarios = () => {
    const usuariosLs = JSON.parse(localStorage.getItem('usuarios'))
    setUsuarios(usuariosLs)
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])


  return (
    <>
      <Container className="my-5">
        <div className="d-flex justify-content-end mb-3">
          <Link className="btn btn-primary">Agregar Usuario</Link>
        </div>
        <TableC array={usuarios} idPage='users' />
      </Container>
    </>
  )
}

export default AdminUsersPage
