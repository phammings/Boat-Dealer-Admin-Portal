import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Boat } from "../types/Boat";
import { getBoatById } from "../api/boats.api";
import { Button } from "@/components/ui/button";

export default function BoatViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [boat, setBoat] = useState<Boat | null>(null);

  useEffect(() => {
    if (!id) return;
    const loadBoat = async () => {
      try {
        const data = await getBoatById(parseInt(id));
        setBoat(data);
      } catch {}
    };
    loadBoat();
  }, [id]);

  if (!boat) return <p className="p-6 animate-pulse">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">{boat.make} {boat.model}</h1>
      <div className="space-y-2">
        <p><strong>Year:</strong> {boat.boatYear}</p>
        <p><strong>Status:</strong> {boat.status === false ? "Inactive" : "Active"}</p>
        <p><strong>City:</strong> {boat.city}</p>
        <p><strong>Category:</strong> {boat.category || "-"}</p>
        <p><strong>Class:</strong> {boat.class || "-"}</p>
        <p><strong>Stock Number:</strong> {boat.stockNumber || "-"}</p>
      </div>

      <Button className="mt-6" onClick={() => navigate("/")}>Back to List</Button>
    </div>
  );
}
