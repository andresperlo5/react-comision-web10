import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router'

const NavbarC = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <NavLink to="#home">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg0h_3hUDRAZSEEaU3NE5UKfbWfA7-ep99Aw&s" alt="logo" width='150' />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink className='nav-link' to="/">Inicio</NavLink>
              <NavLink className='nav-link' to="/aboutUs">Sobre Nosotros</NavLink>
              <NavLink className='nav-link' to="/contact">Contacto</NavLink>
            </Nav>
            <Nav className="ms-auto">
              <NavLink className='nav-link' to="/login">Iniciar Sesion</NavLink>
              <NavLink className='nav-link' to="/register">Registrarse</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarC
