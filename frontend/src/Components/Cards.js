import React from "react";
import { CardGroup, Card ,Col} from "react-bootstrap";
import axios from 'axios';
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
          {/* <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text> */}
        </Card.Body>
      </Card>
    </Col>
    
  );
};

export default Cards;
