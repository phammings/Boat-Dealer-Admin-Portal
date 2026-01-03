import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoatsPage from "./pages/BoatsPage";
import BoatViewPage from "./pages/BoatViewPage";
import DeletedBoatPage from "./pages/DeletedBoatsPage";
import BoatCreatePage from "./pages/BoatCreatePage";
import BoatPhotoUploadPage from "./pages/BoatPhotoUploadPage";
import BoatVideoUploadPage from "./pages/BoatVideoUploadPage";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<BoatsPage />} />
        <Route path="boats/deleted" element={<DeletedBoatPage />} />
        <Route path="/view/:id" element={<BoatViewPage />} />
        <Route path="/create/details" element={<BoatCreatePage />} />
        <Route path="/create/photos/:id" element={<BoatPhotoUploadPage />} />
        <Route path="/create/videos/:id" element={<BoatVideoUploadPage />} />
        <Route path="/edit/details/:id" element={<BoatCreatePage />} />
        <Route path="/edit/photos/:id" element={<BoatPhotoUploadPage />} />
        <Route path="/edit/videos/:id" element={<BoatVideoUploadPage />} />
      </Routes>
    </BrowserRouter>
  );
}
