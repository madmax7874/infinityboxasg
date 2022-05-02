import React, { Fragment } from "react";
import { ClipLoader } from "react-spinners";

function Loader() {

  return (
    <Fragment>
        <div style={{ textAlign: "center", paddingTop: "200px" }}>
          <ClipLoader color="#141850" size={70} />
        </div>
    </Fragment>
  );
}

export default Loader;
