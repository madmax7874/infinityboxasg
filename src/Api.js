import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Tabs, Tab } from "react-bootstrap";
import Item from "./Item";
import SearchBar from "./SearchBar";
import { ClipLoader } from "react-spinners";

const axios = require("axios");

// aray sorter function
const sorter = (arr,v) => {
  if (v === "rating"){
    const sorted = [...arr].sort((a, b) => {
      return b[v] - a[v];
    });
    return sorted
  }
  else{
    const sorted = [...arr].sort((a, b) => {
      return a[v] - b[v];
    });
    return sorted
  }
}

function Api() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = React.useState({text:"", sort:"rating", type:"brand", subtype:"clinique"});
  const [loading, setLoading] = useState(false);
  
  // get data
  useEffect(() => {
    const fetchPrivateData = async () => {
      setLoading(false)
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const str=`${search.type}=${search.subtype}`
        const url = `http://makeup-api.herokuapp.com/api/v1/products.json?${str}`;
        const { data } = await axios.get(url, config);
        const v= search.sort
        setProducts(sorter(data,v))
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPrivateData();
  }, [search.type,search.subtype]);

  // sort products
  useEffect(() => {
    const v = search.sort;
    setProducts(sorter(products,v))
  }, [search.sort]);

  // search bar handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // type seletor
  const typeSelector = (t) =>{
    if (t==="brand"){
      setSearch((prevState) => (
        {
          ...prevState,
          type: t,
          subtype:"clinique"
        }
      ))
    }else{
      setSearch((prevState) => (
        {
          ...prevState,
          type: t,
          subtype:"lipstick"
        }
      ))
    }
  }

  return (
    <Fragment >
        <Container>
            <SearchBar handleChange={handleChange} value={search}/>
            <Tabs
              activeKey={search.type}
                onSelect={(t) =>  typeSelector(t)}
              className="mb-3"
            >
              <Tab eventKey="brand" title="Brand">
                <Tabs
                  activeKey={search.subtype}
                    onSelect={(s) => setSearch((prevState) => ({...prevState,subtype: s}))}
                  className="mb-3"
                >
                  <Tab eventKey="clinique" title="Clinique"></Tab>
                  <Tab eventKey="nyx" title="Nyx"></Tab>
                  <Tab eventKey="dior" title="Dior"></Tab>
                  <Tab eventKey="l'oreal" title="L'oreal"></Tab>
                  <Tab eventKey="colourpop" title="Colourpop"></Tab>
                  <Tab eventKey="annabelle" title="Annabelle"></Tab>

                </Tabs>
              </Tab>
              <Tab eventKey="product_type" title="Type">
                <Tabs
                  activeKey={search.subtype}
                    onSelect={(s) => setSearch((prevState) => ({...prevState,subtype: s}))}
                  className="mb-3"
                >
                  <Tab eventKey="lipstick" title="Lipstick"></Tab>
                  <Tab eventKey="eyeliner" title="Eyeliner"></Tab>
                  <Tab eventKey="blush" title="Blush"></Tab>
                  <Tab eventKey="foundation" title="Foundation"></Tab>
                  <Tab eventKey="mascara" title="Mascara"></Tab>
                  <Tab eventKey="nail_polish" title="Nail Polish"></Tab>

                </Tabs>
              </Tab>
            </Tabs>
            <Row>
              {loading ? (
                products.map((item,index) =>{
                  return (<Item key={index} data={item} index={index}/>)
                })
              ) : (
              <div style={{ textAlign: "center", paddingTop: "200px" }}>
                <ClipLoader color="#141850" size={70} />
              </div>)}
            </Row>
        </Container>
    </Fragment>
  );
}

export default Api;