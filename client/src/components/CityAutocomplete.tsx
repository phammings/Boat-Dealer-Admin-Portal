// CityAutocomplete.tsx
import { useState } from "react"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"
import axios from "axios"

interface CityOption {
  label: string
  value: number
}

export default function CityAutocomplete({ control, setValue, errors }: any) {
  const [options, setOptions] = useState<CityOption[]>([])
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const fetchCities = async (text: string) => {
    try {
        const res = await axios.post("http://devp.mydealers.ca/location/find", { location: text })
        setOptions(res.data) // array of { label, value }
    } catch (err) {
        toast.error("Failed to fetch cities")
    }
 }


  const handleInputChange = (value: string) => {
    setQuery(value)
    if (value.length >= 3) {
      fetchCities(value)
      setOpen(true)
    } else {
      setOptions([])
      setOpen(false)
    }
  }

  return (
    <div>
      <Label>
        City <span className="text-red-500">*</span>
      </Label>
      <Controller
        name="cityID"
        control={control}
        rules={{ required: "City is required" }}
        render={({ field }) => (
          <div className="relative">
            <Input
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Start typing city..."
            />
            {open && options.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-60 overflow-y-auto">
                {options.map((option) => (
                  <li
                    key={option.value}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setQuery(option.label)
                      field.onChange(option.value) // store CityID
                      setOpen(false)
                    }}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      />
      {errors.cityID && (
        <p className="text-red-500 text-sm mt-1">{errors.cityID.message}</p>
      )}
    </div>
  )
}
