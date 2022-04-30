import React, { Fragment } from "react";
import { Col, Card, Row, Image } from "react-bootstrap";

function Item(props) {
  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  return (
    <Fragment>
      <Col key={props.index} sm={6} lg={4} style={{padding:"0.5rem"}}>
        <Card style={{ margin: "1rem" }}>
          <Row>
            <Col md={4} style={{display:"flex", alignItems:"center",justifyContent:'center', padding:"0.5rem"}}>
              <Image src={props.data.image_link} className="img-fluid" style={{borderRadius:"5px", maxHeight:"100px",maxWidth:"95px"}}></Image>
            </Col>
            <Col md={8}>
              <Card.Body style={{padding:"0.5rem"}}>
                <Card.Title style={{fontSize:"1rem",display:"block",whiteSpace:"nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>
                  {props.data.name}
                </Card.Title>
                <span style={{fontSize:"0.8rem",display:"block"}}>
                  {props.data.price_sign}{props.data.price ? props.data.price : "0.0"}{" , "}{props.data.rating ? props.data.rating : "0"}&#9733;
                </span>
                {/* <br/> */}
                <span style={{fontSize:"0.8rem",lineHeight:"0.8"}}>
                  {truncate(props.data.description ? props.data.description : "Don’t feel strain, we will make you good",50)}
                </span>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>
    </Fragment>
  );
}

export default Item;
