import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SportPage from "./pages/SportPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header/Header";
import CreateSport from "./pages/CreateSport";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sports/:sportId" element={<SportPage />} />
        <Route path="create-sport" element={<CreateSport />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <footer> footer </footer>
    </BrowserRouter>
  );
}

export default App;
