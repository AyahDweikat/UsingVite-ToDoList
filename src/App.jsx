import 'vite/modulepreload-polyfill'
import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Main from './Components/Main/Main';
// eslint-disable-next-line no-unused-vars

function App() {
  const [theme, setTheme] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  function handleTheme() {
    setTheme(!theme);
  }
  return (
    <div className={theme ? "dark-theme" : ""}>
      <Header handleTheme={handleTheme} theme={theme} searchValue={searchValue} setSearchValue={setSearchValue} />
      <Main searchValue={searchValue} />
    </div>
  );
}

export default App;
