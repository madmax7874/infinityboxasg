import React, { Fragment } from "react";
import { Col,Card } from "react-bootstrap";

function Item(props) {
  return (
    <Fragment>
      <Col key={props.index} sm="6">
        <Card>
          <Card.Body>
            {props.data.name}
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  );
}

export default Item;
