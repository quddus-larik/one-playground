import { create } from 'zustand';
import { languages } from "@/config/site.config";

interface UseCodePayload {
  userCode: string | '';
}

type UserCodeInterface = {
  userCode: string | '';
  setUserCode: (payload: UseCodePayload) => void;
};

export const useUserCode = create<UserCodeInterface>((set) => ({
  userCode: languages.find((lang) => lang.id === "react")?.defaultCode ?? "",
  setUserCode: (payload) => set(payload),
}));
