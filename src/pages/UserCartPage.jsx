
import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import clientAxios, { configHeaders } from '../helpers/axios.config.helpers';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


const UserCartPage = () => {
  const [productos, setProductos] = useState([])
  const [cantidad, setCantidad] = useState(1)
  const [idPreferencia, setIdPrefenrecia] = useState("")

  const obtenerProductos = async () => {
    const res = await clientAxios.get("/carritos", configHeaders)
    console.log(res)
    setProductos(res.data)
  }

  const handleChangeQuantity = (ev) => {
    setCantidad(ev.target.value)
  }

  const eliminarProductoCarrito = (idProducto) => {
    try {
      Swal.fire({
        title: "Estas seguro de que quieres eliminar este producto del carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!",
        cancelButtonText: "NO, no quiero eliminarlo!",
      }).then(async (result) => {
        if (result.isConfirmed) {

          const res = await clientAxios.put(`/carritos/deleteProduct/${idProducto}`, {}, configHeaders)
          console.log(res)
          if (res.status === 200) {
            Swal.fire({
              title: "Producto eliminado con exito del carrito!",
              icon: "success"
            });
          }

          obtenerProductos()


        }
      });
    } catch (error) {
      console.log(error)
    }

  }

  const handleClickPay = async (ev) => {
    ev.preventDefault()
    initMercadoPago(`${import.meta.env.VITE_MP_PUBLIC_KEY}`);

    const res = await clientAxios.post("/servicios/pagoConMercadoPago", {}, configHeaders)
    console.log(res)
    setIdPrefenrecia(res.data.urlRes)
    /* location.href = `${res.data.urlRes}` */



    Swal.fire({
      title: "Gracias por tu compra!",
      text: "Te enviaremos por mail el comprobante de tu compra",
      icon: "success"
    });
  }

  useEffect(() => {
    obtenerProductos()
  }, [])

  return (
    <>
      {
        productos.length
          ?
          <Container className='my-5'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {
                  productos.map((producto, i) =>
                    <tr key={producto._id}>
                      <td>{i + 1}</td>
                      <td className='w-25'>{producto.nombre}</td>
                      <td>${producto.precio}</td>
                      <td className='w-25'>
                        <input type="number" className='w-25' value={cantidad} onChange={handleChangeQuantity} />
                      </td>
                      <td>
                        ${producto.precio * cantidad}
                      </td>
                      <td className='text-center'>
                        <Button variant='danger' onClick={() => eliminarProductoCarrito(producto._id)}>Eliminar</Button>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
            <p>$totalFinal</p>
            <Container className='text-center'>
              <Button className='w-25 py-3' variant='success' onClick={handleClickPay}>Comprar</Button>
              {
                idPreferencia &&
                <Container className='w-25'>
                  <Wallet initialization={{ preferenceId: idPreferencia, redirectMode: "modal" }} />
                </Container>
              }
            </Container>
          </Container>
          :
          <h1 className='text-center'>No hay productos cargados en el carrito todavia</h1>
      }
    </>

  )
}

export default UserCartPage
