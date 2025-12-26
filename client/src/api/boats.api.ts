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
  await api.patch(
    `/api/boats/${id}/status?active=false`,
    null, 
    {
      headers: AUTH_HEADER, 
    }
  )
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


export interface PresignedRequestPayload {
  boatID: number;
  fileName: string;
  contentType: string;
  isPrimary: boolean;
}

export interface PresignedResponse {
  boatPhotoID: number;
  uploadUrl: string; // S3 presigned URL
  fileKey: string; // S3 object key
}

export const getPresignedUpload = async (payload: PresignedRequestPayload) => {
  const { data } = await api.post<PresignedResponse>(
    "http://localhost:5299/api/boats/photos/presigned-upload",
    payload
  );
  return data;
};

export interface BoatVideoPayload {
  title: string
  url: string
  imageUrl: string
  boat_VehicleID: number
}

export const createBoatVideo = async (payload: BoatVideoPayload) => {
  const { data } = await api.post("/api/boats/videos", payload, { headers: AUTH_HEADER })
  return data // assuming response includes id
}

export const updateBoatVideo = async (videoID: number, payload: BoatVideoPayload) => {
  const { data } = await api.put(`/api/boats/videos/${videoID}`, payload, { headers: AUTH_HEADER })
  return data
}

export const toggleBoatVideoStatus = async (videoID: number, active: boolean) => {
  await api.patch(`/api/boats/videos/${videoID}/status?active=${active}`, null, { headers: AUTH_HEADER })
}
