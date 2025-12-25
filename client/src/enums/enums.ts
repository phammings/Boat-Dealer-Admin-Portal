export const ListingType = ["Dealer", "Broker"] as const;
export type ListingType = (typeof ListingType)[number];

export const BoatStatus = [
  "InStock",
  "ComingSoon",
  "DealPending",
  "Incoming",
  "IncomingDealPending",
  "OnOrder",
  "OutOfStock",
  "Sold",
  "Unavailable",
  "UnderDeposit",
] as const;
export type BoatStatus = (typeof BoatStatus)[number];

export const Condition = ["New", "Used"] as const;
export type Condition = (typeof Condition)[number];

export const DriveType = [
  "NoEngine",
  "InboardOutboard",
  "Inboard",
  "Outboard",
  "Jet",
  "VDrive",
  "Other",
] as const;
export type DriveType = (typeof DriveType)[number];

export const FuelType = ["None", "Gas", "Diesel", "Electric"] as const;
export type FuelType = (typeof FuelType)[number];
