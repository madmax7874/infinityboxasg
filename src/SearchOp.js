import React, { Fragment, useEffect, useState } from "react";
import { Accordion, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import Item from "./Item";
const axios = require("axios");

function SearchOp(props) {
  const [nyx, setNyx] = useState([]);
  const [clinique, setClinique] = useState([]);
  const [dior, setDior] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <Accordion defaultActiveKey="0">
          {cliniqueArr.length >0 ? (
            <Accordion.Item eventKey="0">
                <Accordion.Header>Clinique</Accordion.Header>
                <Accordion.Body>
                <Row>{cliniqueArr}</Row>
                </Accordion.Body>
            </Accordion.Item>
          ):null}
          {nyxArr.length >0 ? (
            <Accordion.Item eventKey="1">
                <Accordion.Header>Nyx</Accordion.Header>
                <Accordion.Body>
                <Row>{nyxArr}</Row>
                </Accordion.Body>
            </Accordion.Item>
          ): null}
          {diorArr.length >0 ? (
            <Accordion.Item eventKey="2">
                <Accordion.Header>Dior</Accordion.Header>
                <Accordion.Body>
                <Row>{diorArr}</Row>
                </Accordion.Body>
            </Accordion.Item>
          ) : null}
        </Accordion>
      ) : (
        <div style={{ textAlign: "center", paddingTop: "200px" }}>
          <ClipLoader color="#141850" size={70} />
        </div>
      )}
    </Fragment>
  );
}

export default SearchOp;
