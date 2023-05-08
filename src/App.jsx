import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Main from './Components/Main/Main';
// eslint-disable-next-line no-unused-vars

function App() {
  const [toggleTheme, setToggleTheme] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  function handleTheme() {
    setToggleTheme(!toggleTheme);
  }
  return (
    <div className={toggleTheme ? "dark-theme" : ""}>
      <Header handleTheme={handleTheme} toggleTheme={toggleTheme} searchValue={searchValue} setSearchValue={setSearchValue} />
      <Main searchValue={searchValue} />
    </div>
  );
}

export default App;
