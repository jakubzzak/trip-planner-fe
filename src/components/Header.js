import * as React from "react";

const Header = ({ title, subtitle }) => (
  <header>
    <h2>{ title }</h2>
    <span className="about">{ subtitle }</span>
  </header>
);

export default Header