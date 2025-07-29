import { create } from "zustand";
import { MODEL_PROVIDERS, ModelProvider, ModelOption } from "@/utils/modelProviders";

export interface FilePreview {
  id: string;
  file: File;
  url: string;
  localUrl: string;
  status?: "uploading" | "done" | "error";
}

interface OtherConfig {
  isBackEnd: boolean;
  backendLanguage: string;
  extra: {
    isOpenDataBase: boolean;
    database: string;
    databaseConfig: {
      url: string;
      username: string;
      password: string;
    };
    isOpenCache: boolean;
    cache: string;
  };
}

interface ChatState {
  isDeepThinking: boolean;
  setIsDeepThinking: (isDeepThinking: boolean) => void;
  modelOptions: ModelOption[];
  setModelOptions: (v: ModelOption[]) => void;
  uploadedImages: FilePreview[];
  setUploadedImages: (images: FilePreview[]) => void;
  addImages: (images: FilePreview[]) => void;
  updateImageStatus: (id: string, status: FilePreview["status"]) => void;
  removeImage: (id: string) => void;
  clearImages: () => void;
  otherConfig: OtherConfig;
  setOtherConfig: (config: OtherConfig | ((prev: OtherConfig) => OtherConfig)) => void;
  // جديد:
  currentProviderId: string;
  setCurrentProviderId: (id: string) => void;
  currentModelValue: string;
  setCurrentModelValue: (value: string) => void;
  apiKeys: Record<string, string>;
  setApiKey: (providerId: string, key: string) => void;
}

const defaultProvider = MODEL_PROVIDERS[0];
const defaultModel = defaultProvider.models[0];

const useChatStore = create<ChatState>((set, get) => ({
  isDeepThinking: false,
  setIsDeepThinking: (isDeepThinking: boolean) => set({ isDeepThinking }),
  uploadedImages: [],
  setModelOptions: (options) => set({ modelOptions: options }),
  setUploadedImages: (images) => set({ uploadedImages: images }),
  addImages: (images) => set((state) => ({ uploadedImages: [...state.uploadedImages, ...images] })),
  updateImageStatus: (id, status) => set((state) => ({ uploadedImages: state.uploadedImages.map((img) => img.id === id ? { ...img, status } : img) })),
  removeImage: (id) => set((state) => ({ uploadedImages: state.uploadedImages.filter((img) => img.id !== id) })),
  clearImages: () => set({ uploadedImages: [] }),
  modelOptions: defaultProvider.models,
  otherConfig: {
    isBackEnd: false,
    backendLanguage: "",
    extra: {
      isOpenDataBase: false,
      database: "",
      databaseConfig: { url: "", username: "", password: "" },
      isOpenCache: false,
      cache: "",
    },
  },
  setOtherConfig: (config) => {
    if (typeof config === 'function') {
      set((state) => ({ otherConfig: config(state.otherConfig) }));
    } else {
      set({ otherConfig: config });
    }
  },
  // جديد:
  currentProviderId: defaultProvider.id,
  setCurrentProviderId: (id: string) => {
    const provider = MODEL_PROVIDERS.find((p) => p.id === id) || defaultProvider;
    set({
      currentProviderId: id,
      modelOptions: provider.models,
      currentModelValue: provider.models[0]?.value || "",
    });
  },
  currentModelValue: defaultModel.value,
  setCurrentModelValue: (value: string) => set({ currentModelValue: value }),
  apiKeys: {},
  setApiKey: (providerId, key) => set((state) => ({ apiKeys: { ...state.apiKeys, [providerId]: key } })),
}));

export default useChatStore;
