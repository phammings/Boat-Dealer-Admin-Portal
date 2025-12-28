import api from "./axios"


export const getBoatCategories = async (vehicleType: number) => {
  const res = await api.get(`/api/lookup/vehicle-categories?vehicleType=${vehicleType}`)
  return res.data
}

export const getClassesByCategory = async (categoryId: number) => {
  const res = await api.get(`/api/lookup/vehicle-classes?categoryId=${categoryId}`)
  return res.data
}


