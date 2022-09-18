import React from "react";
import Context from "../Theme/Context";

export default function Navbar() {
  const { theme, setTheme } = React.useContext(Context);

  return (
    <nav bg={theme} variant={theme} className={"box-shadow"}>
      <h2> Where in the world? </h2>
      <button
        className="theme-button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <div>
          <img
            height="30px"
            src={
              theme === "dark"
                ? " https://imgs.search.brave.com/6Yp_MGAt_tfrJKcPMrv_I3EAsBS6uijJDlkY4ajD0q4/rs:fit:512:512:1/g:ce/aHR0cHM6Ly93d3cu/aWNvbnNkYi5jb20v/aWNvbnMvZG93bmxv/YWQvd2hpdGUvbW9v/bi00LTUxMi5wbmc"
                : "https://imgs.search.brave.com/AafmaHEuuZFuH9NA9rJ5aAU-losrwfkROlhJr5psYUE/rs:fit:980:980:1/g:ce/aHR0cHM6Ly9jZG4u/b25saW5ld2ViZm9u/dHMuY29tL3N2Zy9p/bWdfMzQ5NzgucG5n"
            }
            className="theme-icon"
            alt="theme"
          />
          <h1>{theme === "dark" ? "Dark Mode" : "Light Mode"} </h1>
        </div>
      </button>
    </nav>
  );
}
