import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
// eslint-disable-next-line no-unused-vars

function App() {
  const [toggleTheme, setToggleTheme] = useState(false);
  function handleTheme() {
    setToggleTheme(!toggleTheme);
  }
  return (
    <div className={toggleTheme ? "dark-theme" : ""}>
      <Header handleTheme={handleTheme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
