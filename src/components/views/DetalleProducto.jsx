import { Container, Card, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { consultarProducto } from "../helpers/queries";
import { useState, useEffect } from "react";

const DetalleProducto = () => {
  const [producto, setProducto] = useState({})
  const {id} = useParams()
  const navegacion = useNavigate()

  useEffect(() =>{
    consultarProducto(id).then((respuesta) =>{
      setProducto(respuesta)
    })
  }, [])
  return (
    <Container className="my-3 mainSection">
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img
              variant="top"
              src={producto.imagen}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{producto.nombreProducto}</Card.Title>
              <hr />
              <Card.Text>
              {producto.descripcion}
              <br/>
              <br/>
              <span className="text-danger fw-semibold ">Categoria: </span>{producto.categoria}
              <br />
              <span className="text-danger fw-semibold ">Precio:</span> ${producto.precio}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetalleProducto;
