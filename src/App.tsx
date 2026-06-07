
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/PageLayout";

import "./styles.css";
function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<PageLayout mode="view"/>} />
        <Route path="/edit" element={<PageLayout mode="edit"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
