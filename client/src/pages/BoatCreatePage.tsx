import { useState, useEffect } from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { createBoat, updateBoat, getBoatById } from "../api/boats.api"
import { getBoatCategories, getClassesByCategory } from "../api/lookup.api"
import type { VehicleCategory, VehicleClass } from "../types/Lookup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "react-toastify"
import { BoatStatus } from "../enums/enums"
import { BoatFormStepper } from "@/components/BoatFormStepper"
// import CityAutocomplete from "@/components/CityAutocomplete"

/* ---------------- helpers ---------------- */

const RequiredLabel = ({ children }: { children: string }) => (
  <Label>
    {children} <span className="text-red-500">*</span>
  </Label>
)

const FieldError = ({ error }: { error?: string }) =>
  error ? <p className="text-sm text-red-500 mt-1">{error}</p> : null

const errorClass = "!border-red-500 !focus:ring-red-500"

/* ---------------- component ---------------- */

export default function BoatCreatePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<VehicleCategory[]>([])
  const [classes, setClasses] = useState<VehicleClass[]>([])

  const location = useLocation();
  const params = useParams<{ id: string }>();

  // Failsafe: first check state, fallback to URL param
  const boatID =
    (location.state as { boatID?: number })?.boatID ?? Number(params.id);

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    mode: "onSubmit"
  })

// Load everything in one place
useEffect(() => {
  async function loadAll() {
    try {
      const categoriesData = await getBoatCategories(1)
      setCategories(categoriesData)

      if (!boatID) return

      const boatData = await getBoatById(boatID)
      const boatType = Number(boatData.boatType)

      const classData = await getClassesByCategory(boatType)
      setClasses(classData)

      reset({
        listingType: boatData.listingType,
        stockNumber: boatData.stockNumber,
        condition: boatData.condition,
        status: boatData.status.toString(),
        boatType: boatData.boatType.toString(),
        classCode: boatData.classCode?.toString(),
        make: boatData.make,
        model: boatData.model,
        boatYear: boatData.boatYear,
        lengthFt: boatData.lengthFt,
        lengthIn: boatData.lengthIn,
        beamFt: boatData.beamFt,
        beamIn: boatData.beamIn,
        draftFt: boatData.draftFt,
        draftIn: boatData.draftIn,
        price: boatData.price,
        currency: boatData.currency || "CAD",
        cityID: boatData.cityID,
        description: boatData.description,
        engine: boatData.engine,
        numEngines: boatData.numEngines?.toString(),
        hp: boatData.hp,
        drive: boatData.drive,
        hours: boatData.hours,
        fuelType: boatData.fuelType,
      })
    } catch (err) {
      toast.error("Failed to load boat data")
      console.error(err)
    }
  }

  loadAll()
}, [boatID, reset])

  const selectClass = "w-full h-10 px-3 py-2 text-sm font-normal border !border-input rounded !bg-background focus:outline-none focus:ring-1 focus:ring-ring"

  /* -------- submit -------- */
  const onSubmit = async (data: any) => {
    setLoading(true)

    try {
        if (boatID) {
        await updateBoat({
          ...data,
          boatID: boatID,
          status: Number(data.status),
          boatType: Number(data.boatType),
          classCode: Number(data.classCode),
          boatYear: Number(data.boatYear),
          price: Number(data.price),
          cityID: Number(data.cityID),
          numEngines: data.numEngines ? Number(data.numEngines) : undefined,
          hp: data.hp ? Number(data.hp) : undefined,
        })
        toast.success("Boat updated successfully")
        navigate(`/boats/${boatID}`)
        } else {
        const createdBoat = await createBoat({
            listingType: data.listingType,
            stockNumber: data.stockNumber,
            condition: data.condition,
            status: Number(data.status),
            boatType: Number(data.boatType),
            classCode: Number(data.classCode),
            make: data.make,
            model: data.model,
            boatYear: Number(data.boatYear),
            lengthFt: data.lengthFt,
            price: Number(data.price),
            currency: data.currency,
            cityID: Number(data.cityID),
            description: data.description,

            // optional
            lengthIn: data.lengthIn || undefined,
            beamFt: data.beamFt || undefined,
            beamIn: data.beamIn || undefined,
            draftFt: data.draftFt || undefined,
            draftIn: data.draftIn || undefined,
            weight: data.weight ? Number(data.weight) : undefined,
            engine: data.engine || undefined,
            numEngines: data.numEngines ? Number(data.numEngines) : undefined,
            hp: data.hp ? Number(data.hp) : undefined,
            drive: data.drive || undefined,
            hours: data.hours ? Number(data.hours) : undefined,
            fuelType: data.fuelType || undefined,
        })

        toast.success("Boat created successfully")
        navigate(`/create/photos/${createdBoat.boatID}`, {
            state: { boatID: createdBoat.boatID },
        })
        }
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- UI ---------------- */

  return (
  <div className="min-h-screen bg-muted/30 p-6 flex justify-center">
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Create Boat Listing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <BoatFormStepper currentStep={1} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Listing Info */}
          <section>
            <h3 className="font-semibold mb-4">Listing Info</h3>
            <Separator />
            <div className="grid md:grid-cols-3 gap-4 pt-6">
              {/* LISTING TYPE */}
              <div>
                <RequiredLabel>Listing Type</RequiredLabel>
                <Controller
                  name="listingType"
                  control={control}
                  rules={{ required: "Listing type required" }}
                  render={({ field }) => (
                    <>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          className={`${selectClass} ${
                            errors.listingType ? errorClass : ""
                          }`}
                        >
                          <SelectValue placeholder="Select Listing Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dealer">Dealer</SelectItem>
                          <SelectItem value="Broker">Broker</SelectItem>
                          <SelectItem value="Concessionnaire">Concessionnaire</SelectItem>
                          <SelectItem value="Private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldError
                        error={errors.listingType?.message as string}
                      />
                    </>
                  )}
                />
              </div>

              {/* STOCK NUMBER */}
              <div>
                <RequiredLabel>Stock Number</RequiredLabel>
                <Input
                  {...register("stockNumber", {
                    required: "Stock number required",
                    maxLength: {
                      value: 50,
                      message: "Max 50 characters",
                    },
                  })}
                  className={errors.stockNumber ? errorClass : ""}
                />
                <FieldError
                  error={errors.stockNumber?.message as string}
                />
              </div>

              {/* CONDITION */}
              <div>
                <RequiredLabel>Condition</RequiredLabel>
                <Controller
                  name="condition"
                  control={control}
                  rules={{ required: "Condition required" }}
                  render={({ field }) => (
                    <>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          className={`${selectClass} ${
                            errors.condition ? errorClass : ""
                          }`}
                        >
                          <SelectValue placeholder="Select Condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Used">Used</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldError
                        error={errors.condition?.message as string}
                      />
                    </>
                  )}
                />
              </div>
            </div>
          </section>

          {/* Boat Details */}
          <section>
            <h3 className="font-semibold mb-4">Boat Details</h3>
            <Separator />
            <div className="grid md:grid-cols-3 gap-4 pt-6">
              {/* STATUS */}
              <div>
                <RequiredLabel>Status</RequiredLabel>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "Status required" }}
                  render={({ field }) => (
                    <>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          className={`${selectClass} ${
                            errors.status ? errorClass : ""
                          }`}
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {BoatStatus.map((s, i) => (
                            <SelectItem key={s} value={(i + 1).toString()}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError error={errors.status?.message as string} />
                    </>
                  )}
                />
              </div>

              {/* BOAT TYPE */}
              <div>
                <RequiredLabel>Boat Type</RequiredLabel>
                <Controller
                  name="boatType"
                  control={control}
                  rules={{ required: "Boat type required" }}
                  render={({ field }) => (
                    <>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          className={`${selectClass} ${
                            errors.boatType ? errorClass : ""
                          }`}
                        >
                          <SelectValue placeholder="Select Boat Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(c => (
                            <SelectItem
                              key={c.vehicleCategoryID}
                              value={c.vehicleCategoryID.toString()}
                            >
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError
                        error={errors.boatType?.message as string}
                      />
                    </>
                  )}
                />
              </div>

              {/* CLASS */}
              <div>
                <RequiredLabel>Class</RequiredLabel>
                <Controller
                  name="classCode"
                  control={control}
                  rules={{ required: "Class required" }}
                  render={({ field }) => (
                    <>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={!classes.length}
                      >
                        <SelectTrigger
                          className={`${selectClass} ${
                            errors.classCode ? errorClass : ""
                          }`}
                        >
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map(c => (
                            <SelectItem
                              key={c.vehicleClassID}
                              value={c.vehicleClassID.toString()}
                            >
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError
                        error={errors.classCode?.message as string}
                      />
                    </>
                  )}
                />
              </div>

              {/* MAKE */}
              <div>
                <RequiredLabel>Make</RequiredLabel>
                <Input
                  {...register("make", { required: "Make required" })}
                  className={errors.make ? errorClass : ""}
                />
                <FieldError error={errors.make?.message as string} />
              </div>

              {/* MODEL */}
              <div>
                <RequiredLabel>Model</RequiredLabel>
                <Input
                  type="string"
                  {...register("model", { required: "Model required" })}
                  className={errors.model ? errorClass : ""}
                />
                <FieldError error={errors.model?.message as string} />
              </div>

              {/* YEAR */}
              <div>
                <RequiredLabel>Year</RequiredLabel>
                <Input
                  type="number"
                  {...register("boatYear", { required: "Year required" })}
                  className={errors.boatYear ? errorClass : ""}
                />
                <FieldError error={errors.boatYear?.message as string} />
              </div>

              {/* LENGTH */}
              <div>
                <RequiredLabel>Length</RequiredLabel>
                <div className="flex gap-2">
                  <Input
                    placeholder="ft"
                    type="number"
                    {...register("lengthFt", { required: "Length required" })}
                    className={errors.lengthFt ? errorClass : ""}
                  />
                  <Input
                    placeholder="in"
                    type="number"
                    className={errors.lengthIn ? errorClass : ""}
                    {...register("lengthIn", {
                        valueAsNumber: true,          // ensures comparison is numeric
                        min: { value: 0, message: "Inches cannot be below 0" },
                        max: { value: 11, message: "Inches cannot be above 11" },
                    })}
                  />
                </div>
                <FieldError error={errors.lengthFt?.message as string} />
                <FieldError error={errors.lengthIn?.message as string} />
              </div>

              {/* BEAM */}
              <div>
                <Label>Beam</Label>
                <div className="flex gap-2">
                  <Input placeholder="ft" type="number" {...register("beamFt")} />
                  <Input
                    placeholder="in"
                    type="number"
                    className={errors.beamIn ? errorClass : ""}
                    {...register("beamIn", {
                        valueAsNumber: true,          // ensures comparison is numeric
                        min: { value: 0, message: "Inches be below 0" },
                        max: { value: 11, message: "Inches be above 11" },
                    })}
                  />
                  <FieldError error={errors.beamIn?.message as string} />
                </div>
              </div>

              {/* DRAFT */}
              <div>
                <Label>Draft</Label>
                <div className="flex gap-2">
                  <Input placeholder="ft" type="number" {...register("draftFt")} />
                  <Input
                    placeholder="in"
                    type="number"
                    className={errors.draftIn ? errorClass : ""}
                    {...register("draftIn", {
                        valueAsNumber: true,          // ensures comparison is numeric
                        min: { value: 0, message: "Inches be below 0" },
                        max: { value: 11, message: "Inches cannot be above 11" },
                    })}
                  />
                  <FieldError error={errors.draftIn?.message as string} />
                </div>
              </div>

              {/* PRICE */}
              <div>
                <RequiredLabel>Price</RequiredLabel>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    {...register("price", { required: "Price required" })}
                    className={errors.price ? errorClass : ""}
                  />
                  <Controller
                    name="currency"
                    control={control}
                    defaultValue={"CAD"}
                    rules={{ required: "Currency required" }}
                    render={({ field }) => (
                      <>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className={`w-24 !border-input rounded !bg-background ${
                              errors.currency ? errorClass : ""
                            }`}
                          >
                            <SelectValue placeholder="CAD" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CAD">CAD</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  />
                </div>
                <FieldError error={errors.price?.message as string} />
                <FieldError error={errors.currency?.message as string} />
              </div>
            </div>
          </section>

          {/* Engine Specs */}
        <section>
        <h3 className="font-semibold mb-4">Engine Specs</h3>
        <Separator />
        <div className="grid md:grid-cols-3 gap-4 pt-6">
            {/* Engine */}
            <div>
            <Label>Engine</Label>
            <Input
                type="text"
                maxLength={50}
                placeholder="Engine type"
                {...register("engine")}
                className={errors.engine ? errorClass : ""}
            />
            <FieldError error={errors.engine?.message as string} />
            </div>

            {/* Number of Engines */}
            <div>
            <Label>Number of Engines</Label>
            <Controller
                name="numEngines"
                control={control}
                render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={selectClass}>
                    <SelectValue placeholder="Select number of engines" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="N/A">N/A</SelectItem>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                        {n}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                )}
            />
            <FieldError error={errors.numEngines?.message as string} />
            </div>

            {/* Horsepower */}
            <div>
            <Label>HP</Label>
            <Input
                type="number"
                step="0.1"
                placeholder="Horsepower"
                {...register("hp")}
                className={errors.hp ? errorClass : ""}
            />
            <FieldError error={errors.hp?.message as string} />
            </div>

            {/* Drive */}
            <div>
            <Label>Drive</Label>
            <Controller
                name="drive"
                control={control}
                render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={selectClass}>
                    <SelectValue placeholder="Select drive type" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="No Engine">No Engine</SelectItem>
                    <SelectItem value="Inboard/Outboard">Inboard/Outboard</SelectItem>
                    <SelectItem value="Inboard">Inboard</SelectItem>
                    <SelectItem value="Outboard">Outboard</SelectItem>
                    <SelectItem value="Jet">Jet</SelectItem>
                    <SelectItem value="V-Drive">V-Drive</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>
                )}
            />
            <FieldError error={errors.drive?.message as string} />
            </div>

            {/* Hours */}
            <div>
            <Label>Hours</Label>
            <Input
                type="number"
                step="1"
                placeholder="Engine hours"
                {...register("hours")}
                className={errors.hours ? errorClass : ""}
            />
            <FieldError error={errors.hours?.message as string} />
            </div>

            {/* Fuel Type */}
            <div>
            <Label>Fuel Type</Label>
            <Controller
                name="fuelType"
                control={control}
                render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={selectClass}>
                    <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="N/A">N/A</SelectItem>
                    <SelectItem value="Gas">Gas</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    </SelectContent>
                </Select>
                )}
            />
            <FieldError error={errors.fuelType?.message as string} />
            </div>
        </div>
        </section>



          {/* Location */}
        {/* <section>
        <h3 className="font-semibold mb-4">Location</h3>
        <Separator />
        <div className="grid md:grid-cols-3 gap-4 pt-6">
            <CityAutocomplete control={control} setValue={setValue} errors={errors} />
        </div>
        </section> */}
          <section>
            <h3 className="font-semibold mb-4">Location</h3>
            <Separator />
            <div className="grid md:grid-cols-3 gap-4 pt-6">
              <div>
                <RequiredLabel>City</RequiredLabel>
                <Input
                  type="number"
                  {...register("cityID", { required: "City required" })}
                  className={errors.cityID ? errorClass : ""}
                />
                <FieldError error={errors.cityID?.message as string} />
              </div>
            </div>
          </section>

          {/* Description */}
          <section>
            <RequiredLabel>Description</RequiredLabel>
            <Textarea
                rows={4}
                {...register("description", { required: "Description is required" })}
                className={errors.description ? errorClass : ""}
            />
            <FieldError error={errors.description?.message as string} />
          </section>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Boat"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
)

}
