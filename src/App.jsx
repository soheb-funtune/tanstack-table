import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Table from "./components/TanstackTable/Table";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h3>Tanstack Table</h3>
      <Table />
    </>
  );
}

export default App;
