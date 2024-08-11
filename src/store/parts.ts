import { create } from "zustand";

interface Part {
    id: string; // Assuming each part has a unique ID
    name: string;
    price: number;
    category: string;
}

interface PartsStore {
    parts: Part[];
    addPart: (part: Part) => void;
    updatePart: (id: string, updatedPart: Partial<Part>) => void;
    removePart: (id: string) => void;
    getPartById: (id: string) => Part | undefined;
}

const usePartsStore = create<PartsStore>((set, get) => ({
    parts: [],

    addPart: (part) =>
        set((state) => ({
            parts: [...state.parts, part],
        })),

    updatePart: (id, updatedPart) =>
        set((state) => ({
            parts: state.parts.map((part) =>
                part.id === id ? { ...part, ...updatedPart } : part,
            ),
        })),

    removePart: (id) =>
        set((state) => ({
            parts: state.parts.filter((part) => part.id !== id),
        })),

    getPartById: (id) => {
        const parts = get().parts;
        return parts.find((part) => part.id === id);
    },
}));

export default usePartsStore;
