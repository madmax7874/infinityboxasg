import React, { Fragment } from "react";
import { Image } from "react-bootstrap";
import no from '../assets/no-search.svg'

function NoSearch(props) {

  return (
    <Fragment>
        <div style={{textAlign:"center",margin:"2rem"}}>
          <Image src={no} className="img-fluid" ></Image>
        </div>
        <div style={{textAlign:"center"}}>
          <p>
              No results found
          </p>
          <p>
              Sorry, we cant find any matches for '{props.name}'
          </p>
        </div>
    </Fragment>
  );
}

export default NoSearch;
