import { create } from "zustand";

interface EngineData {
    rustDentDamage: "Y" | "N";
    oilCondition: "Good" | "Bad";
    oilColor: "Clean" | "Brown" | "Black";
    brakeFluidCondition: "Good" | "Bad";
    brakeFluidColor: "Clean" | "Brown" | "Black";
    oilLeak: "Y" | "N";
    overallSummary: string;
    images?: FileList; // Array of File objects for images
}

interface EngineState {
    engine: EngineData;
    setAllData: (engine: EngineData) => void;
}

export const useEngineStore = create<EngineState>((set) => ({
    engine: {
        rustDentDamage: "N",
        oilCondition: "Good",
        oilColor: "Clean",
        brakeFluidCondition: "Good",
        brakeFluidColor: "Clean",
        oilLeak: "N",
        overallSummary: "",
    },

    setAllData: (engine) =>
        set(() => ({
            engine,
        })),
}));
