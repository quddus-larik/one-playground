import { create } from "zustand"

interface SelectedLanguagePayload {
  selectedLanguageState: string | ''
}

type SelectedLanguageInterface = {
  selectedLanguageState: string | 'react',
  setLanguageState: (payload: SelectedLanguagePayload) => void
}

export const useSelectedLanguage = create<SelectedLanguageInterface>((set)=>({
  selectedLanguageState: 'react',
  setLanguageState: (payload) => set(payload)
}));
