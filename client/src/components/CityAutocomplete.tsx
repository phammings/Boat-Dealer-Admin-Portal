import { useState } from "react"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"
import { fetchCities } from "@/api/lookup.api"
import type { CityOption } from "@/api/lookup.api"

export default function CityAutocomplete({ control, errors }: any) {
  const [options, setOptions] = useState<CityOption[]>([])
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadCities = async (text: string) => {
    try {
      setLoading(true)
      const data = await fetchCities(text)
      setOptions(data)
      setOpen(true)
    } catch {
      toast.error("Failed to fetch cities")
      setOptions([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (value: string) => {
    setQuery(value)

    if (value.length >= 3) {
      loadCities(value)
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

            {open && (
              <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-60 overflow-y-auto">
                {loading && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <li
                        key={i}
                        className="px-3 py-2 animate-pulse bg-gray-100"
                      >
                        &nbsp;
                      </li>
                    ))}
                  </>
                )}

                {!loading &&
                  options.map((option) => (
                    <li
                      key={option.value}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setQuery(option.label)
                        field.onChange(option.value)
                        setOpen(false)
                      }}
                    >
                      {option.label}
                    </li>
                  ))}

                {!loading && options.length === 0 && (
                  <li className="px-3 py-2 text-gray-400">
                    No results
                  </li>
                )}
              </ul>
            )}
          </div>
        )}
      />

      {errors.cityID && (
        <p className="text-red-500 text-sm mt-1">
          {errors.cityID.message}
        </p>
      )}
    </div>
  )
}
