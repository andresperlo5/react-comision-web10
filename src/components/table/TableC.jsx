
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const TableC = ({ array, idPage, funcionReseteador }) => {

  const borrarProducto = (idProducto) => {
    Swal.fire({
      title: "Estas seguro de que quieres eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "NO, no quiero eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevoArray = array.filter((producto) => producto.id !== idProducto)
        localStorage.setItem('productos', JSON.stringify(nuevoArray))

        funcionReseteador()

        Swal.fire({
          title: "Producto eliminado con exito!",
          icon: "success"
        });
      }
    });

  }

  const deshabilitarOhabilitarProducto = (idProducto) => {
    const producto = array.find((producto) => producto.id === idProducto)

    Swal.fire({
      title: `Estas seguro de que quieres ${producto.status === 'enable' ? 'deshabilitar' : 'habilitar'} este producto?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "NO, no quiero eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {

        producto.status = producto.status === 'enable' ? 'disabled' : 'enable'
        console.log(producto)
        localStorage.setItem('productos', JSON.stringify(array))

        funcionReseteador()

        Swal.fire({
          title: `Producto ${producto.status === 'enable' ? 'habilitado' : 'deshabilitado'}  con exito!`,
          icon: "success"
        });
      }
    });


  }



  return (
    <Table striped bordered hover>
      <thead>
        {
          idPage === 'products'
            ?
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
            :
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
        }
      </thead>
      <tbody>
        {
          array.map((element, i) =>
            idPage === 'products'
              ?
              <tr key={element.id}>
                <td>{i + 1}</td>
                <td className='w-25'>{element.title}</td>
                <td className='w-25'>{element.description}</td>
                <td className='text-center'>${element.price}</td>
                <td>
                  <img src={element.image} alt={element.description} width={50} />
                </td>
                <td>
                  <Button variant='danger' onClick={() => borrarProducto(element.id)}>Eliminar</Button>
                  <Button className='mx-2' variant={element.status === 'enable' ? 'warning' : 'info'} onClick={() => deshabilitarOhabilitarProducto(element.id)}>{element.status === 'enable' ? 'Deshabilitar' : 'Habilitar'}</Button>
                  <Link to={`/admin/products/createUpdate?id=${element.id}`} className='btn btn-success'>Editar</Link>
                </td>
              </tr>
              :
              <tr key={element.id}>
                <td>{i + 1}</td>
                <td>{element.nombreUsuario}</td>
                <td className='w-25'>{element.emailUsuario}</td>
                <td>{element.rol}</td>
                <td>
                  <Button variant='danger'>Eliminar</Button>
                  <Button className='mx-2' variant='warning'>Deshabilitar</Button>
                  <Button variant='success'>Editar</Button>
                </td>
              </tr>
          )
        }
      </tbody>
    </Table>
  )
}

export default TableC
