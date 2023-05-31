import "vite/modulepreload-polyfill";
import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Main from "./Components/Main/Main";
import "./responsive.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [searchValue, setSearchValue] = useState("");

  function handleChangeTheme() {
    setTheme(theme === "light" ? "dark":"light");
  }
  return (
    <div className={theme == "dark" ? "dark-theme" : ""}>
      <Header
        onChangeTheme={handleChangeTheme}
        theme={theme}
        searchValue={searchValue}
        onChangeSearchValue={setSearchValue}
      />
      <Main searchValue={searchValue} />
    </div>
  );
}

export default App;
