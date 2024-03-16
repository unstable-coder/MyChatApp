import React, { useState } from "react";
import "./join.css";
import { Link } from "react-router-dom";
let user;
const Join = () => {
  const [name, setname] = useState("");
  const send = () => {
    user = document.getElementById("joininput").value;
    document.getElementById("joininput").value = "";
  };
  return (
    <div className="joinPage">
      <div className="joincontainer">
        <h1>MYCHAT</h1>

        <input
          onChange={(e) => setname(e.target.value)}
          type="text"
          placeholder="enter username"
          id="joininput"
        ></input>

        <Link onClick={(e) => (!name ? e.preventDefault() : null)} to="/chat">
          {" "}
          <button onClick={send} className="joinbtn">
            LOGIN
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
