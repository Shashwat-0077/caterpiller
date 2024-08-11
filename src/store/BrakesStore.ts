import { create } from "zustand";

interface BrakesData {
    fluidLevel: "Good" | "Ok" | "Low";
    frontCondition: "Good" | "Ok" | "Needs Replacement";
    rearCondition: "Good" | "Ok" | "Needs Replacement";
    emergencyBrakeCondition: "Good" | "Ok" | "Low";
    overallSummary: string;
    images?: FileList; // Array of File objects for images
}

interface BrakesState {
    brakes: BrakesData;
    setAllData: (brakes: BrakesData) => void;
}

export const useBrakesStore = create<BrakesState>((set) => ({
    brakes: {
        fluidLevel: "Ok",
        frontCondition: "Ok",
        rearCondition: "Ok",
        emergencyBrakeCondition: "Ok",
        overallSummary: "",
    },

    setAllData: (brakes) =>
        set(() => ({
            brakes,
        })),
}));
