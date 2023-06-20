import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useParams} from "react-router-dom"
import Swal from "sweetalert2";
import { consultarProducto } from "../../helpers/queries";
import { consultarEditarProducto } from "../../helpers/queries";
import {useNavigate} from "react-router-dom"

const EditarProducto = () => {
  const {register, setValue, handleSubmit, formState: {errors}, reset} = useForm()

  const {id} = useParams()
  const navegacion = useNavigate()

  useEffect(() =>{
    consultarProducto(id).then((respuesta) =>{
      if(respuesta){
        console.log(`Cargar en el formulario`)
        setValue(`nombreProducto`, respuesta.nombreProducto)
        setValue(`precio`, respuesta.precio)
        setValue(`imagen`, respuesta.imagen)
        setValue(`categoria`, respuesta.categoria)
        setValue(`descripcion`, respuesta.descripcion)
      }else{
        Swal.fire(`Ocurrió un error`, `Intente nuevamente más tarde`, `error`)
      }
    })
  }, [])

  const onSubmit = (productoEditado) =>{
    consultarEditarProducto(productoEditado, id).then((respuesta) => {
      if(respuesa && respuesta.status === 200){
        Swal.fire(`Producto editado`, `El producto ${productoEditado.nombreProducto} fue editado correctamente`, `success`)
       
      }else{
        Swal.fire(`Ocurrió un error`, `Intente nuevamente más tarde`, `error`)
      }
    })
  }

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">Editar producto</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formNombreProdcuto">
          <Form.Label>Producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            {...register("nombreProducto", {
              required: "Campo obligatorio",
              minLength:{
                value: 3,
                message: "Cantidad minima de caracteres: 3"
              },
              maxLength:{
                value: 60,
                message: "Cantidad maxima de caracteres: 50"
              }
            })}
          />
          <Form.Text className="text-danger">{errors.nombreProducto?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            {... register("precio", {
              required: "Campo obligatorio",
              minLength:{
                value: 3,
                message: "Cantidad minima de caracteres: 3"
              },
              maxLength:{
                value: 5,
                message: "Cantidad maxima de caracteres: 50"
              },
              min:{
                value: 10,
                message: "Precio minimo: $10"
              },
              max:{
                value: 10000,
                message: "El precio no debe ser mayor a $10000"
              },
              pattern:{
                value: /^\d{1,5}/,
                message: "Debe ingresar un precio válido"
              }
            })}
          />
            <Form.Text className="text-danger">{errors.precio?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            {... register("imagen",{
              required: "Campo obligatorio",
              pattern:{
                value: /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/,
                message: "Debe ingresar un link terminado en jpg, gif o png"
              }
            })}
          />
            <Form.Text className="text-danger">{errors.imagen?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select 
          {... register("categoria",{
            required: "Campo obligatorio"
          })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="bebida caliente">Bebida caliente</option>
            <option value="bebida fria">Bebida fria</option>
            <option value="dulce">Dulce</option>
            <option value="salado">Salado</option>
          </Form.Select>
          <Form.Text className="text-danger">{errors.categoria?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescripcionProdcuto">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            as="textarea"
            rows={4}
            {...register(`descripcion`,{
              required: "Campo obligatorio",
              minLength:{
                value: 4,
                message: "Cantidad minima de caracteres: 4"
              },
              maxLength:{
                value: 500,
                message: "Cantidad maxima de caracteres: 500"
              }})} 
          />
              <Form.Text className="text-danger">{errors.descripcion?.message}</Form.Text>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default EditarProducto;
