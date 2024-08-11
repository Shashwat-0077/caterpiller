import { create } from "zustand";

interface BatteryData {
    make: string;
    replacementDate?: string;
    voltage?: number;
    waterLevel: "Good" | "Ok" | "Low";
    condition: "Y" | "N";
    leakRust: "Y" | "N";
    overallSummary: string;
    images?: FileList; // Array of File objects for images
}

interface BatteryState {
    battery: BatteryData;
    setAllData: (battery: BatteryData) => void;
}

export const useBatteryStore = create<BatteryState>((set) => ({
    battery: {
        make: "",
        replacementDate: undefined,
        voltage: undefined,
        waterLevel: "Ok",
        condition: "N",
        leakRust: "N",
        overallSummary: "",
    },

    setAllData: (battery) =>
        set(() => ({
            battery,
        })),
}));
