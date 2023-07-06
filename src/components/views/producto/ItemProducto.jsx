import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { consultarBorrarProducto, consultarListaProductos } from "../../helpers/queries";
import { Link } from "react-router-dom";

const ItemProducto = ({producto, setProductos}) => {
  const borrarProducto = () =>{
    Swal.fire({
      title: `¿Estás seguro de borrar el prodocto ${producto.nombreProducto}?`,
      text: "No se puede revertir esta paso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
      // consultar a la API
      consultarBorrarProducto(producto._id).then((respuesta) =>{
        console.log(respuesta)
        if(respuesta.status === 200){
          Swal.fire(
            'Eliminado',
            `El producto ${producto.nombreProducto} fue eliminado`,
            'success'
          );
          // actualizar la tabla de productos
          consultarListaProductos().then((respuesta)=> 
          setProductos(respuesta)
          )
        }else{
          Swal.fire(
            'Ocurrió un error',
            `El producto ${producto.nombreProducto} no pudo ser eliminado`,
            'success'
          )
        }
      })
      }
    })
  }
   return (
    <tr>
      {/* <td>{props.producto._id}</td> */}
      <td>{producto._id}</td>
      <td>{producto.nombreProducto}</td>
      <td>${producto.precio}</td>
      <td>{producto.imagen}</td>
      <td>{producto.categoria}</td>
      <td>
        <Link className="btn btn-warning" to={`/administrador/editar-producto/${producto._id}`}>Editar</Link>
        <Button variant="danger" onClick={borrarProducto}>
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
