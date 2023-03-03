import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import { useEffect } from "react";
import { getAll } from "./BooksAPI";

function App() {
  useEffect(() => {
    (async () => {
      const res = await getAll();
    })();
  });
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
