import api from "./axios"
import type { Boat } from "../types/Boat"

const AUTH_HEADER = { Authorization: "Bearer 7" }

export const getBoats = async (): Promise<Boat[]> => {
  const res = await api.get<Boat[]>("/api/boats", {
    headers: AUTH_HEADER,
  })
  return res.data
}

export const deleteBoat = async (id: number) => {
  await api.delete(`/api/boats/${id}`, {
    headers: AUTH_HEADER,
  })
}

export const getBoatById = async (id: number): Promise<Boat> => {
  const res = await api.get<Boat>(`/api/boats/${id}`, {
    headers: AUTH_HEADER,
  })
  return res.data
}

export async function createBoat(payload: {
  status: number
  boatType: string
  classCode: string
  make: string
  model: string
  boatYear: number
  price: number
  length: number
  beamFt: number
  draftFt: number
  weight: number
  engine: string
  numEngines: number
  hp: number
  drive: string
  hours: number
  fuelType: string
  description: string
  cityID: number
}) {
  const res = await api.post("/api/boats", payload, {
    headers: AUTH_HEADER,
  })
  return res.data
}
