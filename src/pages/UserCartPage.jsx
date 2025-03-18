
import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';

const UserCartPage = () => {
  const [productos, setProductos] = useState([])
  const [cantidad, setCantidad] = useState(1)

  const obtenerProductos = () => {
    const productosLs = JSON.parse(localStorage.getItem('carrito')) || []
    setProductos(productosLs)
  }

  const handleChangeQuantity = (ev) => {
    setCantidad(ev.target.value)
  }

  const eliminarProductoCarrito = (idProducto) => {
    Swal.fire({
      title: "Estas seguro de que quieres eliminar este producto del carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "NO, no quiero eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        const productosLs = JSON.parse(localStorage.getItem('carrito')) || []
        const carritoActualizado = productosLs.filter((prod) => prod.id !== idProducto)
        console.log(carritoActualizado)
        localStorage.setItem("carrito", JSON.stringify(carritoActualizado))

        obtenerProductos()

        Swal.fire({
          title: "Producto eliminado con exito del carrito!",
          icon: "success"
        });
      }
    });

  }

  const handleClickPay = (ev) => {
    ev.preventDefault()
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
                    <tr key={producto.id}>
                      <td>{i + 1}</td>
                      <td className='w-25'>{producto.title}</td>
                      <td>${producto.price}</td>
                      <td className='w-25'>
                        <input type="number" className='w-25' value={cantidad} onChange={handleChangeQuantity} />
                      </td>
                      <td>
                        ${producto.price * cantidad}
                      </td>
                      <td className='text-center'>
                        <Button variant='danger' onClick={() => eliminarProductoCarrito(producto.id)}>Eliminar</Button>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
            <p>$totalFinal</p>
            <Button onClick={handleClickPay}>Comprar</Button>
          </Container>

          :
          <h1 className='text-center'>No hay productos cargados en el carrito todavia</h1>
      }
    </>

  )
}

export default UserCartPage
