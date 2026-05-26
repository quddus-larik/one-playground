import { create } from "zustand";

export interface InputRequestItem {
  title: string;
  input: string;
}

type StdinState = {
  stdin: string;
  inputRequests: InputRequestItem[];
  hasStdin: boolean;
  setStdin: (stdin: string) => void;
  setInputRequests: (requests: InputRequestItem[]) => void;
  setInputRequestValue: (index: number, input: string) => void;
  clearStdin: () => void;
};

export const useStdinState = create<StdinState>((set) => ({
  stdin: "",
  inputRequests: [],
  hasStdin: false,
  setStdin: (stdin) => set({ stdin }),
  setInputRequests: (requests) =>
    set({
      inputRequests: requests,
      hasStdin: requests.length > 0,
    }),
  setInputRequestValue: (index, input) =>
    set((state) => ({
      inputRequests: state.inputRequests.map((item, itemIndex) =>
        itemIndex === index ? { ...item, input } : item,
      ),
    })),
  clearStdin: () => set({ stdin: "" }),
}));
