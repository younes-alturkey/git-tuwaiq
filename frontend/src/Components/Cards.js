import React from "react";
import { Card ,Col} from "react-bootstrap";
import { useHistory } from "react-router-dom";
const Cards = (props) => {
  let history = useHistory();
  const handleRepo = () => {
    let i = props.all.split("\\")
    history.push('/repo/'+i[i.length -1])
  }
  return (
    
    <Col>
      <Card onClick={()=> handleRepo()}>
        <Card.Body>
          <Card.Title>{props.all}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
    
  );
};

export default Cards;
