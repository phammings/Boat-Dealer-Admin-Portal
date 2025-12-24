import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Boat } from "../types/Boat";
import { getBoatById } from "../api/boats.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BoatViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [boat, setBoat] = useState<Boat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadBoat = async () => {
      setLoading(true);
      try {
        const data = await getBoatById(parseInt(id));
        setBoat(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBoat();
  }, [id]);

  const infoRow = (label: string, value?: string | number | boolean) => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b py-3">
      <span className="font-semibold text-muted-foreground">{label}:</span>
      <span className="truncate ml-0 sm:ml-4">{value ?? "-"}</span>
    </div>
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-5xl p-8 space-y-4">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </Card>
      </div>
    );

  if (!boat)
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground bg-gray-50 p-4">
        Boat not found
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-5xl">
        <Card className="w-full h-full p-6">
          <CardHeader>
            <CardTitle className="text-3xl truncate">
              {boat.make} {boat.model}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {infoRow("Year", boat.boatYear)}
            {infoRow("Status", boat.status ? "Active" : "Inactive")}
            {infoRow("City", boat.city)}
            {infoRow("Category", boat.category ?? "-")}
            {infoRow("Class", boat.class ?? "-")}
            {infoRow("Stock Number", boat.stockNumber ?? "-")}
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back to List
          </Button>
        </div>
      </div>
    </div>
  );
}
