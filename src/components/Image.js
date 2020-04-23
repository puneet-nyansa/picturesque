import React from "react";

const Image = ({url, alt}) => (
  <li>
    <img src={url} alt={alt} />
    <ul className="bottom-right">{alt}</ul>
  </li>
);

export default Image;
