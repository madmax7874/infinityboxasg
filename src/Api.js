import React, { Fragment, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Item from "./Item";
import SearchBar from "./SearchBar";

const axios = require("axios");

function Api() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchPrivateData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const url = `https://makeup-api.herokuapp.com/api/v1/products.json?brand=clinique`;
        const { data } = await axios.get(url, config);
        setProducts(data)
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPrivateData();
  }, []);
  console.log(products)

//   array sorter
//   items.sort(function (a, b) {
//     return a.value - b.value;
//   });

  const itemarr = products.map((item,index) =>{
    return (<Item key={index} data={item} index={index}/>)
  })

  return (
    <Fragment >
        <Container>
            <SearchBar />
            <Row>
                {itemarr}
            </Row>
        </Container>
    </Fragment>
  );
}

export default Api;
