import React from "react";
import MyForm from "./MyForm";

const Header = ({ handleSubmit, history}) => {

//console.log(history.location.pathname);

if (history.location.pathname === "/home") {
  return (
    <div>
      <h1>Picturesque</h1>
      <h3> Select Picture</h3>
      <MyForm handleSubmit={handleSubmit} history={history}  />
    </div>
  );
} else if ((history.location.pathname === "/checkout")) {
  return (
    <div>
      <h1>Picturesque</h1>
    </div>
  );
} else {
  return (
    <div>
      <h1>Picturesque</h1>
      <h3> Select Picture</h3>
      <MyForm handleSubmit={handleSubmit} history={history}  />
    </div>
  );
}

};

export default Header;
