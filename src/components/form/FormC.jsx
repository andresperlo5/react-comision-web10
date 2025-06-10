import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './FormC.css'
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import clientAxios, { configHeaders } from '../../helpers/axios.config.helpers';

const FormC = ({ idPage }) => {
  const navigate = useNavigate()
  const [errores, setErrores] = useState({})

  const [registro, setRegistro] = useState({
    usuario: '',
    email: '',
    contrasenia: '',
    repContrasenia: '',
    check: false
  })
  const [inicioSesion, setInicioSesion] = useState({
    usuario: '',
    contrasenia: ''
  })

  const handleChangeFormRegister = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    setRegistro({ ...registro, [ev.target.name]: value })
  }


  const registroUsuario = async (ev) => {
    ev.preventDefault()
    console.log(registro)
    const { usuario, email, contrasenia, repContrasenia, check } = registro
    let nuevoError = {}

    if (!usuario) {
      nuevoError.usuario = 'Error Usuario'
    }


    if (usuario && email && contrasenia && repContrasenia && check) {
      if (contrasenia === repContrasenia) {
        const res = await clientAxios.post("/usuarios/register", {
          nombreUsuario: usuario,
          emailUsuario: email,
          contrasenia
        }, configHeaders)

        if (res.status === 201) {
          Swal.fire({
            title: "Gracias por registrarte!",
            text: `${res.data.msg}`,
            icon: "success"
          });

          setTimeout(() => {
            navigate('/login')
          }, 1000);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Las contraseñas no son iguales!",
        });
      }
    }
    setErrores(nuevoError)
  }

  const handleChangeFormLogin = (ev) => {
    setInicioSesion({ ...inicioSesion, [ev.target.name]: ev.target.value })
  }

  const iniciarSesionUsuario = async (ev) => {
    ev.preventDefault()

    //Crear todas las validaciones necesarias para que el formulario no se envie vacio al back

    const res = await clientAxios.post("/usuarios/login", {
      nombreUsuario: inicioSesion.usuario,
      contrasenia: inicioSesion.contrasenia
    }, configHeaders)

    console.log(res)
    if (res.status === 200) {
      sessionStorage.setItem("token", JSON.stringify(res.data.token))
      sessionStorage.setItem("rol", JSON.stringify(res.data.rolUsuario))
      if (res.data.rol === "admin") {
        navigate("/user")
      } else {
        navigate("/admin")
      }
    }



  }


  return (
    <Container className='d-flex justify-content-center my-5 vh-100'>
      <Form className='w-25'>
        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre del Usuario</Form.Label>
          <Form.Control type="text" placeholder="Ingresa un nombre de usuario. Por ej: usuario123" value={usuario} onChange={(ev) => setUsuario(ev.target.value)} className={errores.usuario ? 'form-control is-invalid' : 'form-control'} />
          {
            errores.usuario &&
            <Form.Text className="text-danger">
              Campo USUARIO vacio
            </Form.Text>
          }
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre del Usuario</Form.Label>
          <Form.Control type="text" placeholder="Ingresa un nombre de usuario. Por ej: usuario123" value={idPage === 'register' ? registro.usuario : inicioSesion.usuario} onChange={idPage === 'register' ? handleChangeFormRegister : handleChangeFormLogin} name='usuario' className={errores.usuario ? 'form-control is-invalid' : 'form-control'} />
          {
            errores.usuario &&
            <Form.Text className="text-danger">
              Campo USUARIO vacio
            </Form.Text>
          }
        </Form.Group>

        {
          idPage === 'register' &&
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email del Usuario</Form.Label>
            <Form.Control type="email" name='email' placeholder="Ingresa tu email. Por ej: usuario@dominio.com" value={registro.email} onChange={handleChangeFormRegister} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>


        }

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Colocar una contraseña" name='contrasenia' value={idPage === 'register' ? registro.contrasenia : inicioSesion.contrasenia} onChange={idPage === 'register' ? handleChangeFormRegister : handleChangeFormLogin} />
          {
            idPage === 'register' &&
            <ul className='lista-contrasenia'>
              <li>Que tenga una mayuscula</li>
              <li>Que tenga una minuscula</li>
              <li>Que tenga numeros</li>
              <li>Que tenga un caracter especial (@, $, +)</li>
            </ul>
          }
        </Form.Group>

        {
          idPage === 'register' &&
          <>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Colocar una contraseña" name='repContrasenia' value={registro.repContrasenia} onChange={handleChangeFormRegister} />
            </Form.Group>

            {/*  <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Aceptar terminos y condiciones" checked={check} onChange={(ev) => setCheck(ev.target.checked)} />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Aceptar terminos y condiciones" name='check' value={registro.check} onChange={handleChangeFormRegister} />
            </Form.Group>
          </>
        }
        <p>Si olvidaste tu contraseña. <Link to={"/recoveryPass"}> Haz click aqui </Link></p>
        <Container className='text-center'>
          <Button className="py-3 px-5" variant="primary" type="submit" onClick={idPage === 'register' ? registroUsuario : iniciarSesionUsuario}>
            {idPage === 'register' ? 'Enviar Datos' : 'Ingresar'}
          </Button>
        </Container>
      </Form>
    </Container>
  )
}

export default FormC
