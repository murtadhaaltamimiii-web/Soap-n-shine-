export type VehicleType = "sedan" | "suv" | "truck";
export type PackageType = "basic" | "premium" | "full";
export type ConditionType = "clean" | "average" | "dirty" | "disaster";

// 1. Base Prices by Vehicle Size
export const BASE_PRICES: Record<VehicleType, number> = {
  sedan: 0,   // Standard price
  suv: 20,    // +$20 surcharge
  truck: 40,  // +$40 surcharge
};

// 2. Package Prices
export const PACKAGES: Record<PackageType, number> = {
  basic: 100,
  premium: 180,
  full: 250,
};

// 3. Condition Multipliers (Extra dirty = extra cost)
export const CONDITION_MULTIPLIERS: Record<ConditionType, number> = {
  clean: 1.0,
  average: 1.0,
  dirty: 1.2,    // 20% extra
  disaster: 1.5, // 50% extra
};

// 4. Add-ons (Optional)
export const ADDONS = {
  petHair: 30,
  clayBar: 50,
  seatShampoo: 40,
};

// --- THE CALCULATOR LOGIC ---
interface EstimateParams {
  vehicle: VehicleType;
  packageType: PackageType;
  condition: ConditionType;
  selectedAddons: (keyof typeof ADDONS)[];
}

export function calculateEstimate({ vehicle, packageType, condition, selectedAddons }: EstimateParams): number {
  // 1. Get Base Package Price
  let total = PACKAGES[packageType];

  // 2. Add Vehicle Surcharge
  total += BASE_PRICES[vehicle];

  // 3. Apply Condition Multiplier
  total = total * CONDITION_MULTIPLIERS[condition];

  // 4. Add Selected Add-ons
  selectedAddons.forEach((addon) => {
    total += ADDONS[addon];
  });

  return Math.round(total);
}