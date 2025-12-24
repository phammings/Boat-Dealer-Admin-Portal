export interface Boat {
  boatID: number;
  make: string;
  model: string;
  boatYear: number;
  status: boolean;
  city: string;
  category?: string | null;
  class?: string | null;
  stockNumber?: string | null;
}
