import React, { Fragment } from "react";
import { Col, Form,InputGroup, Row } from "react-bootstrap";
function SearchBar(props) {

  return (
    <Fragment>
      <Form style={{margin:"1rem 0.2rem"}}>
        <Row >
          <Col md={6} style={{marginBottom:"0.5rem"}}>
            <InputGroup>
              <Form.Control
                type="text"
                name="text"
                style={{textTransform:"capitalize"}}
                value={props.value.text}
                onChange={(e) => props.handleChange(e)}
                placeholder="Search Here"
              />
            </InputGroup>
          </Col>
          {
            props.value.text ? (null) : (
              <Col md={6} style={{display:"flex", justifyContent:"end" }}>
                <Form.Group>
                  <Form.Label style={{margin:"0rem 1rem"}}>Sort By{" "}</Form.Label>
                  <select
                    label="Sort By "
                    style={{ display: "inline",width: "auto",fontWeight:"500"}}
                    className="form-select"
                    name="sort"
                    required={true}
                    value={props.value.category}
                    onChange={(e) => props.handleChange(e)}
                  >
                    <option style={{color:"#303179", fontWeight:"500"}} value="rating">Rating</option>
                    <option style={{color:"#303179", fontWeight:"500"}} value="price">Price</option>
                  </select>
                </Form.Group>
              </Col>
            )
          }
        </Row>
      </Form>
    </Fragment>
  );
}

export default SearchBar;
