import { create } from "zustand";

interface ExteriorData {
    rustDentDamage: "Y" | "N";
    oilLeakSuspension: "Y" | "N";
    overallSummary: string;
    images?: FileList; // Array of File objects for images
}

interface ExteriorState {
    exterior: ExteriorData;
    setAllData: (exterior: ExteriorData) => void;
}

export const useExteriorStore = create<ExteriorState>((set) => ({
    exterior: {
        rustDentDamage: "N",
        oilLeakSuspension: "N",
        overallSummary: "",
    },

    setAllData: (exterior) =>
        set(() => ({
            exterior,
        })),
}));
