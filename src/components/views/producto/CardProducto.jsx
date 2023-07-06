import { Col, Card, Button } from "react-bootstrap";
import {Link} from "react-router-dom"


const CardProducto = ({producto}) => {

  return (
    <Col md={4} ld={3} className="mb-3">
      <Card>
        <Card.Img
          className="imagenCard"
          variant="top"
          src={producto.imagen}
        />
        <Card.Body>
          <Card.Title>{producto.nombreProducto}</Card.Title>
          <Card.Text>{producto.precio}</Card.Text>
          <Button variant="primary" as={Link} to={`/detalle/${producto._id}`}>Ver detalle</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardProducto;
