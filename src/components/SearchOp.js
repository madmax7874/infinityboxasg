import React, { Fragment, useEffect, useState } from "react";
import { Accordion, Row } from "react-bootstrap";
import Item from "./Item";
import Loader from "./Loader";

import NoSearch from "./NoSearch";
const axios = require("axios");

function SearchOp(props) {
  const [nyx, setNyx] = useState([]);
  const [clinique, setClinique] = useState([]);
  const [dior, setDior] = useState([]);
  const [loading, setLoading] = useState(false);

  // get data
  useEffect(() => {
    const fetchPrivateData = async () => {
      try {
        let url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=clinique`;
        const { data } = await axios.get(url);
        setClinique(data);
        url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=nyx`;
        const { data: data2 } = await axios.get(url);
        setNyx(data2);
        url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=dior`;
        const { data: data3 } = await axios.get(url);
        setDior(data3);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPrivateData();
  }, []);

  // create filtered display array of products
  const cliniqueArr = clinique
    .filter((item) => {
      return item[`name`].startsWith(props.value.text);
    })
    .map((item, index) => {
      return <Item key={index} data={item} index={index} />;
    });

  const nyxArr = nyx
    .filter((item) => {
      return item[`name`].startsWith(props.value.text);
    })
    .map((item, index) => {
      return <Item key={index} data={item} index={index} />;
    });

  const diorArr = dior
    .filter((item) => {
      return item[`name`].startsWith(props.value.text);
    })
    .map((item, index) => {
      return <Item key={index} data={item} index={index} />;
    });

  //   useEffect(() => {
  //     const filterer = () => {
  //       let arr = [...products];
  //       arr = arr.filter((item) => {
  //         return item[`name`].startsWith(props.value.text);
  //       });
  //       setDisplay(arr);
  //     };
  //     filterer();
  //   }, [props, products]);

  return (
    <Fragment>
      {loading ? (
        cliniqueArr.length > 0 || nyxArr.length > 0 || diorArr.length > 0 ? (
          <Accordion defaultActiveKey={['0','1','2']} style={{padding:"1rem"}}>
            {cliniqueArr.length > 0 ? (
              <Accordion.Item eventKey="0">
                <Accordion.Header>Clinique</Accordion.Header>
                <Accordion.Body>
                  <Row>{cliniqueArr}</Row>
                </Accordion.Body>
              </Accordion.Item>
            ) : null}
            {nyxArr.length > 0 ? (
              <Accordion.Item eventKey="1">
                <Accordion.Header>Nyx</Accordion.Header>
                <Accordion.Body>
                  <Row>{nyxArr}</Row>
                </Accordion.Body>
              </Accordion.Item>
            ) : null}
            {diorArr.length > 0 ? (
              <Accordion.Item eventKey="2">
                <Accordion.Header>Dior</Accordion.Header>
                <Accordion.Body>
                  <Row>{diorArr}</Row>
                </Accordion.Body>
              </Accordion.Item>
            ) : null}
          </Accordion>
        ) : (
          <NoSearch name={props.value.text} />
        )
      ) : (
        <Loader />
      )}
    </Fragment>
  );
}

export default SearchOp;
