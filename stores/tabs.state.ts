import { create } from 'zustand';

interface ViewerPayload {
  viewerState: string | '';
}

type ViewerStateInterface = {
  viewerState: string | '';
  setViewerState: (payload: ViewerPayload) => void;
};

export const useViewer = create<ViewerStateInterface>((set) => ({
  viewerState: 'both',  // Initial value
  setViewerState: (payload) => set(payload),
}));