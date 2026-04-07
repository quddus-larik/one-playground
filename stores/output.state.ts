import { create } from "zustand";

type OutputState = {
  output: string;
  isRunning: boolean;
  setOutput: (output: string) => void;
  setRunning: (isRunning: boolean) => void;
  clearOutput: () => void;
};

export const useOutput = create<OutputState>((set) => ({
  output: "",
  isRunning: false,
  setOutput: (output) => set({ output }),
  setRunning: (isRunning) => set({ isRunning }),
  clearOutput: () => set({ output: "" }),
}));
