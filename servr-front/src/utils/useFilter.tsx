import { create } from "zustand";

type Filter = {
  text: string;
  setText: (text: string) => void;
};

const useFilter = create<Filter>()((set) => ({
  text: "",
  setText: (text) => set({ text }),
}));

export default useFilter;
