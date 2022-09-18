import React from "react";

const Context = React.createContext({
  theme: "light",
  setTheme: () => {}
});

export default Context;
