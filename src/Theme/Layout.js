import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import Context from "./Context";

const Layout = ({ children }) => {
  const { theme } = useContext(Context);
  const bg =
    theme === "dark"
      ? "body {background-color: rgb(33, 46, 55)} .loading {color: white} .card{background: rgb(43, 55, 67)} .card * {color: hsl(0, 0%, 98%)} .drop-down * {background: rgb(43, 55, 67);} Input{background: rgb(43, 55, 67)}   * { color: white} .details * {color: white} .back-button  { background: rgb(43, 55, 67)} .border-elements button {color: white; background: rgb(43, 55, 67)} .back-button{fill: white} nav{background: rgb(43, 55, 67)} svg  {fill: white} .Dropdown-option{color: white}"
      : "body  {background-color: hsl(0, 0%, 98%); color: #000;} nav{background: white} .back-button * {fill: black}  ";
  return (
    <>
      <Helmet>
        <style>{bg}</style>
      </Helmet>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
