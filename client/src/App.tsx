import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoatsPage from "./pages/BoatsPage";
import BoatViewPage from "./pages/BoatViewPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoatsPage />} />
        <Route path="/view/:id" element={<BoatViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}
