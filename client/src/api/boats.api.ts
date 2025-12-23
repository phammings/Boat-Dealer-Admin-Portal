import api from "./axios";
import { Boat } from "../types/Boat";

export const getBoats = () => api.get<Boat[]>("/boats");
export const getBoat = (id: string) => api.get<Boat>(`/boats/${id}`);
export const createBoat = (boat: Boat) => api.post("/boats", boat);
export const updateBoat = (id: string, boat: Boat) =>
  api.put(`/boats/${id}`, boat);
export const deleteBoat = (id: string) =>
  api.delete(`/boats/${id}`);
