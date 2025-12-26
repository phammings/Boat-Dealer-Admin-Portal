import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { useBoatFormStore } from "../store/useBoatFormStore"
import { createBoat } from "../api/boats.api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BoatStatus, DriveType, FuelType } from "../enums/enums"
import { BoatFormStepper } from "@/components/BoatFormStepper"

export default function BoatCreatePage() {
  const navigate = useNavigate()
  const { updateField, ...formState } = useBoatFormStore()
  const [loading, setLoading] = useState(false)

  const {
  handleSubmit,
  control,
  register,
  setValue,
  formState: { errors },
} = useForm({
  defaultValues: {
    ...formState
  },
})


  const onSubmit = async (data: any) => {
  setLoading(true)

  try {
    await createBoat({
      status: Number(data.status),
      boatType: data.boatType,
      classCode: data.classCode,
      make: data.make,
      model: data.model,

      boatYear: Number(data.boatYear),
      price: Number(data.price),
      length: Number(data.length),
      beamFt: Number(data.beamFt),
      draftFt: Number(data.draftFt),
      weight: Number(data.weight),

      engine: data.engine,
      numEngines: Number(data.numEngines),
      hp: Number(data.hp),
      drive: data.drive,
      hours: Number(data.hours),
      fuelType: data.fuelType,

      description: data.description,
      cityID: Number(data.cityID),
    })

    navigate("/")
  } finally {
    setLoading(false)
  }
}


  const selectClass =
  "w-full h-10 px-3 py-2 text-sm font-normal border border-input rounded-md bg-background text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring appearance-none"

  return (
    <div className="min-h-screen bg-muted/30 p-6 flex justify-center">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle className="text-2xl">Create Boat Listing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Stepper UI only */}
          <BoatFormStepper currentStep={1}/>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Boat Details */}
            <section>
              <h3 className="font-semibold mb-4 text-lg">Boat Details</h3>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                <div>
                  <Label>Status</Label>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        >
                        <SelectTrigger className={selectClass}>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                            {BoatStatus.map((s, idx) => (
                            <SelectItem
                                key={s}
                                value={(idx + 1).toString()}
                            >
                                {s}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    )}
                    />

                </div>

                <div>
                  <Label>Boat Type</Label>
                  <Input {...register("boatType")} />
                </div>

                <div>
                  <Label>Class</Label>
                  <Input {...register("classCode")} />
                </div>

                <div>
                  <Label>Make</Label>
                  <Input {...register("make")} />
                </div>

                <div>
                  <Label>Model</Label>
                  <Input {...register("model")} />
                </div>

                <div>
                  <Label>Year</Label>
                  <Input type="number" {...register("boatYear")} />
                </div>

                <div>
                  <Label>Length (ft)</Label>
                  <Input type="number" {...register("length")} />
                </div>

                <div>
                  <Label>Beam (ft)</Label>
                  <Input type="number" {...register("beamFt")} />
                </div>

                <div>
                  <Label>Draft (ft)</Label>
                  <Input type="number" {...register("draftFt")} />
                </div>

                <div>
                  <Label>Weight (lbs)</Label>
                  <Input type="number" {...register("weight")} />
                </div>

                <div>
                  <Label>Price</Label>
                  <Input type="number" {...register("price")} />
                </div>
              </div>
            </section>

            {/* Engine Specs */}
            <section>
              <h3 className="font-semibold mb-4 text-lg">Engine Specs</h3>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                <div>
                  <Label>Engine</Label>
                  <Input {...register("engine")} />
                </div>

                <div>
                  <Label># Engines</Label>
                  <Input type="number" {...register("numEngines")} />
                </div>

                <div>
                  <Label>HP</Label>
                  <Input type="number" {...register("hp")} />
                </div>

                <div>
                  <Label>Drive</Label>
                  <Controller
                    control={control}
                    name="drive"
                    render={({ field }) => (
                        <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        >
                        <SelectTrigger className={selectClass}>
                            <SelectValue placeholder="Select drive type" />
                        </SelectTrigger>
                        <SelectContent>
                            {DriveType.map((d) => (
                            <SelectItem key={d} value={d}>
                                {d}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    )}
                    />
                </div>

                <div>
                  <Label>Hours</Label>
                  <Input type="number" {...register("hours")} />
                </div>

                <div>
                  <Label>Fuel Type</Label>
                  <Controller
                    control={control}
                    name="fuelType"
                    render={({ field }) => (
                        <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        >
                        <SelectTrigger className={selectClass}>
                            <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                            {FuelType.map((f) => (
                            <SelectItem key={f} value={f}>
                                {f}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    )}
                    />
                </div>
              </div>
            </section>

            {/* Location */}
            <section>
              <h3 className="font-semibold mb-4 pt-4 text-lg">Location</h3>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                <div>
                  <Label>City ID</Label>
                  <Input type="number" {...register("cityID")} />
                </div>
              </div>
            </section>

            {/* Description */}
            <section>
              <h3 className="font-semibold mb-4 pt-4">Description</h3>
              <Textarea rows={4} {...register("description")} />
            </section>

            <div className="flex justify-end gap-4">
            <Button
                type="button"
                variant="outline"
                onClick={() => {
                setLoading(false)
                navigate(-1)
                }}
                className="hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
            >
                Cancel
            </Button>

            <Button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Boat"}
            </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}
