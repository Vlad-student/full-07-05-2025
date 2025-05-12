import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SportPage from "./pages/SportPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <header> Logo </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sports/:sportId" element={<SportPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <footer> footer </footer>
    </BrowserRouter>
  );
}

export default App;
