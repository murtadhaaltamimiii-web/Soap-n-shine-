// BASE PRICES (Increased by $30 total)
export const VEHICLE_PRICES = {
  sedan: 229, // Was 219
  suv: 239,   // Was 229
  truck: 249, // Was 239
  van: 259,   // Was 249
};

// ADD-ONS (Unchanged)
export const ADD_ONS = [
  { id: "pet-hair", label: "Pet Hair Removal", price: 20 },
  { id: "engine-bay", label: "Engine Bay Detail", price: 50 },
  { id: "headlight", label: "Headlight Restoration", price: 40 },
  { id: "steam-clean", label: "Deep Stain Extraction", price: 25 },
  { id: "plastic-trim", label: "Exterior Plastic Protectant", price: 15 },
  { id: "child-seat", label: "Child Seat Sanitization", price: 25 },
];

export function calculatePrice(vehicleType: string, selectedAddOns: string[] = []) {
  // 1. Get Base Price (Default to 199 if unknown)
  let total = VEHICLE_PRICES[vehicleType as keyof typeof VEHICLE_PRICES] || 199;

  // 2. Add Selected Add-ons
  selectedAddOns.forEach((addOnId) => {
    const addOn = ADD_ONS.find((a) => a.id === addOnId);
    if (addOn) {
      total += addOn.price;
    }
  });

  return Math.round(total);
}