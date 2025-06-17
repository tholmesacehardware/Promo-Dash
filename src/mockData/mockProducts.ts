// src/data/mockProducts.ts

// Interface for a product item, matching the structure in mockProducts
export interface MockProduct {
  name: string;
  retailPrice: string;
  image: string;
}

// Mock product data for demonstration, using data from the PDF
// This data is now separated from the component logic
export const mockProducts: Record<string, MockProduct> = {
  '8108719': { name: 'Weber Spirit E-325 3 Burner Liquid Propane Grill Black', retailPrice: '549.00', image: 'https://placehold.co/50x50/B0BEC5/FFFFFF?text=GRILL' },
  '8108721': { name: 'Weber Spirit E-425 4 Burner Liquid Propane Grill Black', retailPrice: '679.00', image: 'https://placehold.co/50x50/A0A0A0/FFFFFF?text=GRILL' },
  '8108718': { name: 'Weber Spirit E-210 2 Burner Liquid Propane Grill Black', retailPrice: '449.00', image: 'https://placehold.co/50x50/D0D0D0/FFFFFF?text=GRILL' },
  '8096682': { name: 'Recteq Backyard Beast 1000 Wood Pellet WiFi Grill and Smoker Black/Silver', retailPrice: '1099.99', image: 'https://placehold.co/50x50/808080/FFFFFF?text=SMOKER' },
  '8030471': { name: 'American Gourmet 28 in. Charcoal Grill Black', retailPrice: '169.99', image: 'https://placehold.co/50x50/E0E0E0/FFFFFF?text=GRILL' },
  '8091361': { name: 'Weber Genesis SA-E-325 3 Burner Liquid Propane Grill Indigo', retailPrice: '999.00', image: 'https://placehold.co/50x50/F0F0F0/FFFFFF?text=GRILL' },
  '8474793': { name: 'Traeger Pro Series 22 Wood Pellet Grill Bronze', retailPrice: '599.95', image: 'https://placehold.co/50x50/C0C0C0/FFFFFF?text=PELLET' },
  '8474884': { name: 'Traeger Pro Series 34 Wood Pellet Grill Bronze', retailPrice: '699.95', image: 'https://placehold.co/50x50/B0B0B0/FFFFFF?text=PELLET' },
  // Add more products as needed from your PDF data
};
