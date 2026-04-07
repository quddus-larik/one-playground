import { create } from "zustand";

type ViewerState = "code" | "output" | "both";

type ViewerStateInterface = {
  viewerState: ViewerState;
  setViewerState: (viewerState: ViewerState) => void;
};

export const useViewer = create<ViewerStateInterface>((set) => ({
  viewerState: "both",
  setViewerState: (viewerState) => set({ viewerState }),
}));

