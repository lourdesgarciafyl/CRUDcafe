const URLUsuario = import.meta.env.VITE_API_USUARIO

export const login =  async (usuario) => {
    console.log(URLUsuario);
    try{
        const respuesta = await fetch(URLUsuario);
        const listaUsuarios = await respuesta.json();
        const usuarioBuscado = listaUsuarios.find((itemUsuario) => itemUsuario.email === usuario.email)
        if(usuarioBuscado){
            console.log("email encontrado")
            if(usuarioBuscado.password === usuario.contrasenia){
                return usuarioBuscado
            }else{
                console.log("contraseña incorrecta")
                return null;
            }
        }else{
            console.log("No se encontró el maiil")
            return null;
        }
    } catch(error){
        console.log(eror)
    }
}

