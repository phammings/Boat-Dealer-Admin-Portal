import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Boat } from "../types/Boat"
import { getInactiveBoats } from "../api/boats.api" 
import DeletedBoatTable from "../components/DeletedBoatTable"
import { Button } from "@/components/ui/button"
import { IconArrowLeft } from "@tabler/icons-react"

export default function DeletedBoatsPage() {
  const [boats, setBoats] = useState<Boat[] | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const didFetchRef = useRef(false)

  useEffect(() => {
    if (didFetchRef.current) return
    didFetchRef.current = true

    loadDeletedBoats()
  }, [])

  const loadDeletedBoats = async () => {
    setLoading(true)
    try {
      const data = await getInactiveBoats()
      setBoats(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="px-6">
        <div className="mx-auto w-full max-w-[95vw] px-6 py-8">
          {/* Header + Back Button */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">Deleted Listings</h1>
            <Button
              variant="default"
              className="bg-gray-600 text-white hover:bg-gray-700 flex items-center justify-center gap-2 py-2 px-4"
              onClick={() => navigate("/")}
            >
              <IconArrowLeft size={18} />
              <span>Back to Active Boats</span>
            </Button>
          </div>

          <DeletedBoatTable
            boats={boats}
            loading={loading}
            onView={(id) => navigate(`/view/${id}`)}
          />
        </div>
      </div>
    </div>
  )
}
