import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Error404 from "./components/views/Error404";
import Menu from "./components/common/Menu";
import Footer from "./components/common/Footer";
import Inicio from "./components/views/Inicio";
import DetalleProducto from "./components/views/DetalleProducto";
import CrearProducto from "./components/views/producto/CrearProducto";
import EditarProducto from "./components/views/producto/EditarProducto";
import Administrador from "./components/views/Administrador";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Inicio></Inicio>}> </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
