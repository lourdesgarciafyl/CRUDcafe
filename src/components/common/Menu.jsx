import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

const Menu = ({usuarioLogueado, setUsuarioLogueado}) => {
  const navegacion = useNavigate()
  
  const logout =() => {
    setUsuarioLogueado({});
    sessionStorage.removeItem("usuario");
    navegacion("/")
  }
  
  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>Rolling Café</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink end className={"nav-item nav-link"} to={"/"}>Inicio</NavLink>
            <NavLink className={"nav-item nav-link"} to={"/registro"}>Registro</NavLink>
            {
              (usuarioLogueado.nombreUsuario)?(
               <>
                 <NavLink className={"nav-item nav-link"} to={"/administrador"}>Administrador</NavLink>   
                <Button variant="dark" onClick={logout}>Logout</Button>
               </>
                ): <NavLink className={"nav-item nav-link"} to={"/login"}>Login</NavLink>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
