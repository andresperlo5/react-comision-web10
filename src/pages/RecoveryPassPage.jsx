import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import clientAxios, { configHeaders } from '../helpers/axios.config.helpers';
import Swal from 'sweetalert2';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const RecoveryPassPage = () => {
  const navigate = useNavigate()
  const [emailUsuario, setEmailUsuario] = useState("")
  const [nuevaContrasenia, setNuevaContrasenia] = useState("")
  const [repContrasenia, setRepContrasenia] = useState("")

  const token = new URLSearchParams(location.search).get("token")

  const handleClickEmailRecoveryPass = async (ev) => {
    ev.preventDefault()
    try {
      const res = await clientAxios.post("/servicios/sendEmailRecoveryPassUser", { emailUsuario }, configHeaders)

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Revisa tu correo",
          text: "Hemos enviado a tu correo los pasos para recuperar tu contraseña",
        });
      }
    } catch (error) {
      if (error.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Problema al intentar enviar el email",
          text: "Intenta mas tarde",
        });
      }
    }


  }


  const handleClickSendNewPass = async (ev) => {
    ev.preventDefault()
    try {
      if (nuevaContrasenia === repContrasenia) {
        const res = await clientAxios.put("/servicios/updateChangePassUser", { nuevaContrasenia }, {
          headers: {
            "Content-Type": "application/json",
            "auth": `${token}`
          }
        })

        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Contaseña cambiada con exito. Inicia sesion para corroborarlo"
          });
        }

        setTimeout(() => {
          navigate("/login")
        }, 1000);

      } else {
        Swal.fire({
          icon: "error",
          title: "Problema al intentar cambiar la contraseña",
          text: "Intenta mas tarde",
        });
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        token ?
          <Container className='d-flex justify-content-center my-5'>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nueva Contraseña</Form.Label>
                <Form.Control type="text" placeholder="Enter email" required onChange={(ev) => setNuevaContrasenia(ev.target.value)} />
                {/*   <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control type="text" placeholder="Enter email" required onChange={(ev) => setRepContrasenia(ev.target.value)} />
                {/*   <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
              </Form.Group>


              <div className='text-center'>
                <Button variant="primary" type="submit" onClick={handleClickSendNewPass}>
                  Enviar Datos
                </Button>
              </div>
            </Form>
          </Container>
          :
          <Container className='d-flex justify-content-center my-5'>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ingresa el email para recuperar el usuario</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required onChange={(ev) => setEmailUsuario(ev.target.value)} />
                {/*   <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
              </Form.Group>


              <div className='text-center'>
                <Button variant="primary" type="submit" onClick={handleClickEmailRecoveryPass}>
                  Enviar Email
                </Button>
              </div>
            </Form>
          </Container>
      }
    </>
  )
}

export default RecoveryPassPage