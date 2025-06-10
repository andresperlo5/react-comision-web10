import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import clientAxios, { configHeaders, configHeadersImagen } from '../../helpers/axios.config.helpers';

const FormAdmin = () => {
  const navigate = useNavigate()
  const idParams = new URLSearchParams(location.search).get('id')
  const [formProduct, setFormProduct] = useState({
    title: '',
    description: '',
    price: 0,
    image: ""
  })

  const obtenerProducto = () => {
    const productosLs = JSON.parse(localStorage.getItem('productos'))
    const producto = productosLs.find((prod) => prod.id === Number(idParams))
    setFormProduct(producto)
  }

  const handleChangeProduct = (ev) => {
    if (ev.target.type === "file") {
      setFormProduct({ ...formProduct, [ev.target.name]: ev.target.files[0] })
    } else {
      setFormProduct({ ...formProduct, [ev.target.name]: ev.target.value })
    }
  }

  const handleClickFormProduct = async (ev) => {
    ev.preventDefault()

    const { title, description, price, image } = formProduct

    if (title && description && price && image) {

      const res = await clientAxios.post("/productos", {
        nombre: title,
        descripcion: description,
        precio: price,
      }, configHeaders)

      if (res.status === 201) {
        const formData = new FormData()
        formData.append("imagen", formProduct.image)

        const agregarImagen = await clientAxios.put(`/productos/addImage/${res.data.idProducto}`,
          formData
          ,
          configHeadersImagen
        )

        if (agregarImagen.status === 200) {
          Swal.fire({
            title: "Producto creado con exito!",
            text: "En breve lo veras en tu lista!",
            icon: "success"
          });


          setTimeout(() => {
            navigate('/admin/products')
          }, 500);
        }
      }


      /*  productosLs.push(nuevoProducto)
       localStorage.setItem('productos', JSON.stringify(productosLs)) */


    }
  }

  const handleChangeEditProduct = (ev) => {
    ev.preventDefault()
    const productosLs = JSON.parse(localStorage.getItem('productos'))
    const productoIndex = productosLs.findIndex((prod) => prod.id === Number(idParams))
    productosLs[productoIndex] = formProduct
    localStorage.setItem('productos', JSON.stringify(productosLs))
    Swal.fire({
      title: "Producto editado con exito!",
      text: "En breve lo veras en tu lista!",
      icon: "success"
    });


    setTimeout(() => {
      navigate('/admin/products')
    }, 500);

  }

  useEffect(() => {
    if (idParams) {
      obtenerProducto()
    }
  }, [])

  return (
    <>

      <Form className='w-25'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name='title' value={formProduct.title} onChange={handleChangeProduct} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control type="text" name='description' value={formProduct.description} onChange={handleChangeProduct} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" name='price' value={formProduct.price} onChange={handleChangeProduct} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" name='image' onChange={handleChangeProduct} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={idParams ? handleChangeEditProduct : handleClickFormProduct}>
          {
            idParams ?
              'Guardar Cambios'
              :
              'Agregar Producto'
          }
        </Button>
      </Form>
    </>
  )
}

export default FormAdmin
