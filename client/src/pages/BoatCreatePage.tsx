import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBoat } from "../api/boats.api"
import { ListingType, BoatStatus, Condition, DriveType, FuelType } from "../enums/enums"

export default function BoatCreatePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    listingType: ListingType[0],
    status: 1, // numeric for backend
    condition: Condition[0],
    boatType: "",
    classCode: "",
    make: "",
    model: "",
    boatYear: "",
    price: "",
    length: "",
    beamFt: "",
    draftFt: "",
    weight: "",
    engine: "",
    numEngines: "",
    hp: "",
    drive: DriveType[0],
    hours: "",
    fuelType: FuelType[0],
    description: "",
    cityID: "",
  })

  const update = (key: string, value: any) =>
    setForm((p) => ({ ...p, [key]: value }))

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await createBoat({
        status: Number(form.status),
        boatType: form.boatType,
        classCode: form.classCode,
        make: form.make,
        model: form.model,
        boatYear: Number(form.boatYear),
        price: Number(form.price),
        length: Number(form.length),
        beamFt: Number(form.beamFt),
        draftFt: Number(form.draftFt),
        weight: Number(form.weight),
        engine: form.engine,
        numEngines: Number(form.numEngines),
        hp: Number(form.hp),
        drive: form.drive,
        hours: Number(form.hours),
        fuelType: form.fuelType,
        description: form.description,
        cityID: Number(form.cityID),
        sellerID: 734,
      })
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  const selectClass = "w-full h-10 px-3 py-2 text-sm font-normal border border-input rounded focus:outline-none focus:ring-1 focus:ring-ring"

  return (
    <div className="min-h-screen bg-muted/30 p-6 flex justify-center">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle className="text-2xl">Create Boat Listing</CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Boat Details */}
          <section>
            <h3 className="font-semibold mb-4">Boat Details</h3>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10">

              <div>
                <Label>Status</Label>
                <Select
                  value={form.status.toString()}
                  onValueChange={(v) => update("status", Number(v))}
                >
                  <SelectTrigger className={selectClass}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="font-normal">
                    {BoatStatus.map((s, idx) => (
                      <SelectItem key={s} value={(idx + 1).toString()}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Boat Type</Label>
                <Input value={form.boatType} onChange={(e) => update("boatType", e.target.value)} />
              </div>

              <div>
                <Label>Class</Label>
                <Input value={form.classCode} onChange={(e) => update("classCode", e.target.value)} />
              </div>

              <div>
                <Label>Make</Label>
                <Input value={form.make} onChange={(e) => update("make", e.target.value)} />
              </div>

              <div>
                <Label>Model</Label>
                <Input value={form.model} onChange={(e) => update("model", e.target.value)} />
              </div>

              <div>
                <Label>Year</Label>
                <Input type="number" value={form.boatYear} onChange={(e) => update("boatYear", e.target.value)} />
              </div>

              <div>
                <Label>Length (ft)</Label>
                <Input type="number" value={form.length} onChange={(e) => update("length", e.target.value)} />
              </div>

              <div>
                <Label>Beam (ft)</Label>
                <Input type="number" value={form.beamFt} onChange={(e) => update("beamFt", e.target.value)} />
              </div>

              <div>
                <Label>Draft (ft)</Label>
                <Input type="number" value={form.draftFt} onChange={(e) => update("draftFt", e.target.value)} />
              </div>

              <div>
                <Label>Weight (lbs)</Label>
                <Input type="number" value={form.weight} onChange={(e) => update("weight", e.target.value)} />
              </div>

              <div>
                <Label>Price</Label>
                <Input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} />
              </div>
            </div>
          </section>

          {/* Engine Specs */}
          <section>
            <h3 className="font-semibold mb-4">Engine Specs</h3>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
              <div>
                <Label>Engine</Label>
                <Input value={form.engine} onChange={(e) => update("engine", e.target.value)} />
              </div>

              <div>
                <Label># Engines</Label>
                <Input type="number" value={form.numEngines} onChange={(e) => update("numEngines", e.target.value)} />
              </div>

              <div>
                <Label>HP</Label>
                <Input type="number" value={form.hp} onChange={(e) => update("hp", e.target.value)} />
              </div>

              <div>
                <Label>Drive</Label>
                <Select value={form.drive} onValueChange={(v) => update("drive", v)}>
                  <SelectTrigger className={selectClass}>
                    <SelectValue placeholder="Select drive type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DriveType.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Hours</Label>
                <Input type="number" value={form.hours} onChange={(e) => update("hours", e.target.value)} />
              </div>

              <div>
                <Label>Fuel Type</Label>
                <Select value={form.fuelType} onValueChange={(v) => update("fuelType", v)}>
                  <SelectTrigger className={selectClass}>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FuelType.map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Location */}
          <section>
            <h3 className="font-semibold mb-4 pt-4">Location</h3>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
              <div>
                <Label>City ID</Label>
                <Input type="number" value={form.cityID} onChange={(e) => update("cityID", e.target.value)} />
              </div>
            </div>
          </section>

          {/* Description */}
          <section>
            <h3 className="font-semibold mb-4 pt-4">Description</h3>
            <Textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} />
          </section>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button onClick={handleSubmit} className="bg-blue-500" disabled={loading}>{loading ? "Creating..." : "Create Boat"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
