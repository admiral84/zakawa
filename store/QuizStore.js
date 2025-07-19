import { create } from "zustand";
const useQuizStore = create((set) => ({
  mode: null,
  setMode: (mode) => set({ mode }),
  category: null,
  setCategory: (category) => set({ category }),
  loaded: false,
  setLoaded: (loaded) => set({ loaded }),
  id: 1,
  setId: (id) => set({ id }),
  score: 0,
  setScore: (score) => set({ score }),
  level: 1,
  setLevel: (level) => set({ level }),
}));
export default useQuizStore;
