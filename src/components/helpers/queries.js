const URLUsuario = import.meta.env.VITE_API_USUARIO
const URLProducto= import.meta.env.VITE_API_PRODUCTO

export const login =  async (usuario) => {
    try{
        const respuesta = await fetch(URLUsuario,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        const datos = await respuesta.json();
        return {
            status: respuesta.status,
            nombreUsuario: datos.nombreUsuario
        }
       

      //  const listaUsuarios = await respuesta.json();
      //  const usuarioBuscado = listaUsuarios.find((itemUsuario) => itemUsuario.email === usuario.email)
      //  if(usuarioBuscado){
      //      console.log("email encontrado")
      //      if(usuarioBuscado.password === usuario.contrasenia){
      //          return usuarioBuscado
      //      }else{
      //          console.log("contraseña incorrecta")
      //          return null;
       //     }
      //  }else{
      //      console.log("No se encontró el maiil")
      //      return null;
      //  }
    } catch(error){
        console.log(error)
    }
}

/*
GET obtener un elemento o listado de elementos. La unica que puedo probar desde el navegador.
POST crear un elemento nuevo en la base de datos o lo que tenga internamente la API
PUT para editar todo un objeto / PATCH para editar solo una propiedad de un objeto, por ejemplo el precio
DELETE peticion para borrar un elemento de la base de datos de la API
*/

export const consultarListaProductos = async () =>{
    try{
        const respuesta = await fetch(URLProducto);
        const listaProductos = await respuesta.json()
        return listaProductos;
    }catch(error){
        console.log(error)
        return null 
    }
}

export const consultarBorrarProducto = async (id) =>{
    try{
        const respuesta = await fetch(`${URLProducto}/${id}`, {
            method: "DELETE"
        });
        return respuesta
    }catch(error){
        console.log(error)
        return null 
    }
}

export const consultarCrearProducto = async (producto) =>{
    try{
        const respuesta = await fetch(URLProducto, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });
        return respuesta
    }catch(error){
        console.log(error)
        return null 
    }
}

export const consultarProducto = async (id) =>{
    try{
        const respuesta = await fetch(URLProducto+`/${id}`);
        const producto = await respuesta.json()
        return producto;
    }catch(error){
        console.log(error)
        return null 
    }
}

export const consultarEditarProducto = async (producto, id) =>{
    try{
        const respuesta = await fetch(URLProducto+"/"+id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });
        return respuesta
    }catch(error){
        console.log(error)
        return null 
    }
}