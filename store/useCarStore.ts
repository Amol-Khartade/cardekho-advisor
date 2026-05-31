import { create } from 'zustand';

export interface Car {
  id: string;
  make: string;
  model: string;
  price_lakhs: number;
  mileage_kmpl: number;
  safety_rating: number;
  body_type: string;
  features: string[];
  ai_reason: string;
}

interface CarState {
  userQuery: string;
  isLoading: boolean;
  recommendedCars: Car[];
  allCars: Car[];
  selectedForCompare: string[];
  isCompareMinimized: boolean;
  
  // Actions
  setUserQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  setRecommendedCars: (cars: Car[]) => void;
  setAllCars: (cars: Car[]) => void;
  toggleCompare: (carId: string) => void;
  setCompareMinimized: (minimized: boolean) => void;
  resetCompare: () => void;
}

export const useCarStore = create<CarState>((set) => ({
  userQuery: '',
  isLoading: false,
  recommendedCars: [],
  allCars: [],
  selectedForCompare: [],
  isCompareMinimized: false,

  setUserQuery: (query) => set({ userQuery: query }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setRecommendedCars: (cars) => set({ recommendedCars: cars }),
  setAllCars: (cars) => set({ allCars: cars }),
  setCompareMinimized: (minimized) => set({ isCompareMinimized: minimized }),
  
  toggleCompare: (carId) => set((state) => {
    const isSelected = state.selectedForCompare.includes(carId);
    let newSelected;
    let newMinimized = state.isCompareMinimized;

    if (isSelected) {
      newSelected = state.selectedForCompare.filter((id) => id !== carId);
    } else if (state.selectedForCompare.length < 3) {
      newSelected = [...state.selectedForCompare, carId];
      // Auto-expand when adding a car if we now have 2+
      if (newSelected.length >= 2) {
        newMinimized = false;
      }
    } else {
      return state; // Limit reached
    }

    return { 
      selectedForCompare: newSelected,
      isCompareMinimized: newMinimized
    };
  }),

  resetCompare: () => set({ selectedForCompare: [], isCompareMinimized: false }),
}));
