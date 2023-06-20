import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2"
import { consultarCrearProducto } from "../../helpers/queries";
import { useForm } from "react-hook-form";

const CrearProducto = () => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm()

  const onSubmit = (productoNuevo) =>{
    consultarCrearProducto(productoNuevo).then((respuestaCreated)=>{
      if(respuestaCreated && respuestaCreated.status === 201){
        Swal.fire(`Producto creado`, `El producto ${productoNuevo.nombreProducto} fue creado correctamente`, `success`)
        reset()
      }else{
         Swal.fire(`Ocurrió un error`, `Intente nuevamente más tarde`, `error`)
      }
    })
  }

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">Nuevo producto</h1>
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
                value: 2,
                message: "Cantidad minima de caracteres: 2"
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
          <Form.Select {... register("categoria",{
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

export default CrearProducto;
