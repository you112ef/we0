// قائمة مزودي الذكاء الاصطناعي والنماذج المدعومة (مستوحاة من bolt.diy)

export interface ModelProvider {
  id: string;
  label: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  apiKey?: string;
  models: ModelOption[];
}

export interface ModelOption {
  value: string;
  label: string;
  quota: number;
  useImage: boolean;
  functionCall?: boolean;
  provider: string;
}

// ملاحظة: الأيقونات يمكن استيرادها لاحقًا حسب الحاجة
export const MODEL_PROVIDERS: ModelProvider[] = [
  {
    id: "openai",
    label: "OpenAI",
    models: [
      { value: "gpt-4o", label: "GPT-4o", quota: 100, useImage: true, functionCall: true, provider: "openai" },
      { value: "gpt-4-turbo", label: "GPT-4 Turbo", quota: 100, useImage: true, functionCall: true, provider: "openai" },
      { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", quota: 100, useImage: false, functionCall: true, provider: "openai" },
    ],
  },
  {
    id: "anthropic",
    label: "Anthropic",
    models: [
      { value: "claude-3-opus-20240229", label: "Claude 3 Opus", quota: 100, useImage: true, functionCall: true, provider: "anthropic" },
      { value: "claude-3-sonnet-20240229", label: "Claude 3 Sonnet", quota: 100, useImage: true, functionCall: true, provider: "anthropic" },
      { value: "claude-3-haiku-20240307", label: "Claude 3 Haiku", quota: 100, useImage: true, functionCall: true, provider: "anthropic" },
    ],
  },
  {
    id: "groq",
    label: "Groq",
    models: [
      { value: "llama3-70b-8192", label: "Llama 3 70B", quota: 100, useImage: false, functionCall: false, provider: "groq" },
      { value: "mixtral-8x7b-32768", label: "Mixtral 8x7B", quota: 100, useImage: false, functionCall: false, provider: "groq" },
    ],
  },
  {
    id: "gemini",
    label: "Gemini",
    models: [
      { value: "gemini-pro", label: "Gemini Pro", quota: 100, useImage: true, functionCall: true, provider: "gemini" },
      { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro", quota: 100, useImage: true, functionCall: true, provider: "gemini" },
    ],
  },
  {
    id: "deepseek",
    label: "DeepSeek",
    models: [
      { value: "deepseek-coder", label: "DeepSeek Coder", quota: 100, useImage: false, functionCall: false, provider: "deepseek" },
      { value: "deepseek-chat", label: "DeepSeek Chat", quota: 100, useImage: false, functionCall: false, provider: "deepseek" },
    ],
  },
  {
    id: "huggingface",
    label: "HuggingFace",
    models: [
      { value: "meta-llama/Llama-2-70b-chat-hf", label: "Llama 2 70B Chat", quota: 100, useImage: false, functionCall: false, provider: "huggingface" },
      { value: "mistralai/Mistral-7B-Instruct-v0.2", label: "Mistral 7B Instruct", quota: 100, useImage: false, functionCall: false, provider: "huggingface" },
    ],
  },
  {
    id: "xai",
    label: "xAI",
    models: [
      { value: "grok-1", label: "Grok-1", quota: 100, useImage: false, functionCall: false, provider: "xai" },
    ],
  },
  {
    id: "lmstudio",
    label: "LMStudio",
    models: [
      { value: "lmstudio-local", label: "LMStudio Local", quota: 100, useImage: false, functionCall: false, provider: "lmstudio" },
    ],
  },
  {
    id: "ollama",
    label: "Ollama",
    models: [
      { value: "llama2", label: "Llama 2", quota: 100, useImage: false, functionCall: false, provider: "ollama" },
      { value: "mistral", label: "Mistral", quota: 100, useImage: false, functionCall: false, provider: "ollama" },
    ],
  },
];