import { create } from "zustand"

export interface BoatFormState {
  listingType: string
  status: string
  condition: string
  boatType: string
  classCode: string
  make: string
  model: string
  boatYear: string
  price: string
  length: string
  beamFt: string
  draftFt: string
  weight: string
  engine: string
  numEngines: string
  hp: string
  drive: string
  hours: string
  fuelType: string
  description: string
  cityID: string
  updateField: (key: keyof BoatFormState, value: any) => void
}

export const useBoatFormStore = create<BoatFormState>((set) => ({
  listingType: "",
  status: "",
  condition: "",
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
  drive: "",
  hours: "",
  fuelType: "",
  description: "",
  cityID: "",
  updateField: (key, value) => set((state) => ({ ...state, [key]: value })),
}))
