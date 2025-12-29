export interface Boat {
  boatID: number;
  listingType: "Dealer" | "Broker" | "Concessionnaire" | "Private";
  stockNumber: string;
  condition: "New" | "Used";
  status: number; 
  boatType: number; // vehicleCategoryID
  classCode: number; // vehicleClassID
  make: string;
  model: string;
  boatYear: number;

  // Dimensions
  lengthFt: number;
  lengthIn?: number;
  beamFt?: number;
  beamIn?: number;
  draftFt?: number;
  draftIn?: number;

  // Price
  price: number;
  currency: "CAD" | "USD";

  // Location
  cityID: number;
  city?: string;

  // Engine
  engine?: string;
  numEngines?: number | "N/A";
  hp?: number;
  drive?: string;
  hours?: number;
  fuelType?: "Gas" | "Diesel" | "Electric" | "N/A";

  // Optional description
  description: string;

  // Optional weight
  weight?: number;

  // Optional category/class names for easier display
  category?: string | null;
  class?: string | null;
}
