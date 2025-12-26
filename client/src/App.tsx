import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoatsPage from "./pages/BoatsPage";
import BoatViewPage from "./pages/BoatViewPage";
import BoatCreatePage from "./pages/BoatCreatePage";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<BoatsPage />} />
        <Route path="/view/:id" element={<BoatViewPage />} />
        <Route path="/create" element={<BoatCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}
