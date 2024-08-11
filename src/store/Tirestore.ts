import { create } from "zustand";

interface TireData {
    leftFrontPressure: number;
    rightFrontPressure: number;
    leftFrontCondition: "Good" | "Ok" | "Needs Replacement";
    rightFrontCondition: "Good" | "Ok" | "Needs Replacement";
    leftRearPressure: number;
    rightRearPressure: number;
    leftRearCondition: "Good" | "Ok" | "Needs Replacement";
    rightRearCondition: "Good" | "Ok" | "Needs Replacement";
    overallSummary: string;
    images?: FileList; // Array of File objects for images
}

interface TireState {
    tires: TireData;
    setAllData: (tires: TireData) => void;
}

export const useTireStore = create<TireState>((set) => ({
    tires: {
        leftFrontPressure: 0,
        rightFrontPressure: 0,
        leftFrontCondition: "Ok",
        rightFrontCondition: "Ok",
        leftRearPressure: 0,
        rightRearPressure: 0,
        leftRearCondition: "Ok",
        rightRearCondition: "Ok",
        overallSummary: "",
    },

    setAllData: (tires) =>
        set(() => ({
            tires,
        })),
}));
