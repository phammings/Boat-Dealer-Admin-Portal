import axios from "axios";
import type { Boat } from "../types/Boat";

const API_URL = "http://localhost:5299/api/boats";
const AUTH_HEADER = { Authorization: "7" };

export const getBoats = async (): Promise<Boat[]> => {
  const res = await axios.get<Boat[]>(API_URL, { headers: AUTH_HEADER });
  return res.data;
};

export const deleteBoat = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`, { headers: AUTH_HEADER });
};

export const getBoatById = async (id: number): Promise<Boat> => {
  const res = await axios.get<Boat>(`${API_URL}/${id}`, { headers: AUTH_HEADER });
  return res.data;
};
