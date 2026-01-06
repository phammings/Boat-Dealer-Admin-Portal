import api from "./axios"


export const getBoatCategories = async (vehicleType: number) => {
  const res = await api.get(`/api/lookup/vehicle-categories?vehicleType=${vehicleType}`)
  return res.data
}

export const getClassesByCategory = async (categoryId: number) => {
  const res = await api.get(`/api/lookup/vehicle-classes?categoryId=${categoryId}`)
  return res.data
}

export interface CityOption {
  label: string
  value: number
}

export const fetchCities = async (text: string): Promise<CityOption[]> => {
  const body = new URLSearchParams()
  body.append("term", text)

  const res = await api.post(
    "https://devp.mydealers.ca/location/find",
    body.toString(), // must be string
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )

  return res.data
}



