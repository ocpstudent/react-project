import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import GorestExamApi from "./Component/GorestExamApi";
import "./App.css";
import Header from "./Component/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <GorestExamApi />
    </>
  );
}

export default App;
