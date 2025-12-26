import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Boat } from "../types/Boat"
import { getBoats, deleteBoat } from "../api/boats.api"
import BoatTable from "../components/BoatTable"
import { Button } from "@/components/ui/button"
import { IconPlus } from "@tabler/icons-react"

export default function BoatsPage() {
  const [boats, setBoats] = useState<Boat[] | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const didFetchRef = useRef(false)

  useEffect(() => {
    if (didFetchRef.current) return
    didFetchRef.current = true

    loadBoats()
  }, [])

  const loadBoats = async () => {
    setLoading(true)
    try {
      const data = await getBoats()
      setBoats(data)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    await deleteBoat(id)
    setBoats((prev) => prev?.filter((b) => b.boatID !== id) ?? null)
  }

  return (
<div className="w-full">
  <div className="px-6">
    <div className="mx-auto w-full max-w-[95vw] px-6 py-8">
      {/* Header + Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold leading-none">
          Boats
        </h1>
        <Button
          variant="default"
          className="bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 py-2 px-4"
          onClick={() => navigate("/create/details")}
        >
          <span>Create Boat</span>
          <IconPlus size={18} />
        </Button>
      </div>

      {/* Table */}
      <BoatTable
        boats={boats}
        loading={loading}
        onView={(id) => navigate(`/view/${id}`)}
        onEdit={(id) => navigate(`/edit/${id}`)}
        onDelete={handleDelete}
      />
    </div>
  </div>
</div>

  )
}
