import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router'

const NavbarC = () => {
  const usuarioLog = JSON.parse(sessionStorage.getItem('token'))
  const usuarioRolLog = JSON.parse(sessionStorage.getItem('rol'))
  const navigate = useNavigate()

  const logoutUser = () => {
    /*  const usuariosLs = JSON.parse(localStorage.getItem('usuarios')) || []
     const usuario = usuariosLs.find((user) => user.id === usuarioLog.id)
     usuario.login = false
     localStorage.setItem('usuarios', JSON.stringify(usuariosLs)) */
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('rol')

    setTimeout(() => {
      navigate('/')
    }, 100);
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <NavLink to={usuarioLog && usuarioRolLog === 'usuario' ? '/user' : usuarioLog && usuarioRolLog === 'admin' ? '/admin' : '/'}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg0h_3hUDRAZSEEaU3NE5UKfbWfA7-ep99Aw&s" alt="logo" width='150' />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {
              usuarioLog && usuarioRolLog === 'usuario' ?
                <Nav className="ms-auto">
                  <NavLink className='nav-link' to="/user">Inicio</NavLink>
                  <NavLink className='nav-link' to="/user/cart">Carrito</NavLink>
                  <NavLink className='nav-link' to="/user/fav">Favoritos</NavLink>
                  <NavLink className='nav-link' to="/user/galery">Galeria</NavLink>
                </Nav>
                :
                usuarioLog && usuarioRolLog === 'admin' ?
                  <Nav className="ms-auto">
                    <NavLink className='nav-link' to="/admin">Inicio</NavLink>
                    <NavLink className='nav-link' to="/admin/users">Panel Usuarios</NavLink>
                    <NavLink className='nav-link' to="/admin/products">Panel Productos</NavLink>
                    <NavLink className='nav-link' to="/user">Vista Usuario</NavLink>
                  </Nav>
                  :
                  <Nav className="ms-auto">
                    <NavLink className='nav-link' to="/">Inicio</NavLink>
                    <NavLink className='nav-link' to="/aboutUs">Sobre Nosotros</NavLink>
                    <NavLink className='nav-link' to="/contact">Contacto</NavLink>
                  </Nav>
            }
            {
              usuarioLog ?
                <Nav className="ms-auto">
                  <NavLink className='nav-link' to="#" onClick={logoutUser}>Cerrar Sesion</NavLink>

                </Nav>
                :
                <Nav className="ms-auto">
                  <NavLink className='nav-link' to="/login">Iniciar Sesion</NavLink>
                  <NavLink className='nav-link' to="/register">Registrarse</NavLink>
                </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarC
