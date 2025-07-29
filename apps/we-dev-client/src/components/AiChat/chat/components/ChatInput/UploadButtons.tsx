import React, { useState, useRef, useEffect } from "react"
import classNames from "classnames"
import { App, Tooltip, Modal, Input } from "antd"
import { Image, ChevronDown, Figma } from "lucide-react"
import type { UploadButtonsProps } from "./types"

import { useTranslation } from "react-i18next"
import { IModelOption } from "../.."
import useChatStore from "@/stores/chatSlice"
import { aiProvierIcon } from "./config"
import MCPToolsButton from "./MCPToolsButton"
import { MODEL_PROVIDERS, ModelProvider, ModelOption } from "@/utils/modelProviders";

export const UploadButtons: React.FC<UploadButtonsProps> = ({
  isLoading,
  isUploading,
  append,
  onImageClick,
  baseModal,
  messages,
  handleSubmitWithFiles,
  setMessages,
  setBaseModal,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const {
    currentProviderId,
    setCurrentProviderId,
    currentModelValue,
    setCurrentModelValue,
    apiKeys,
    setApiKey,
    modelOptions,
  } = useChatStore();
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [providerForApiKey, setProviderForApiKey] = useState<ModelProvider | null>(null);
  const [isFigmaModalOpen, setIsFigmaModalOpen] = useState(false)
  const [figmaUrl, setFigmaUrl] = useState(() => localStorage.getItem('figmaUrl') || '')
  const [figmaToken, setFigmaToken] = useState(() => localStorage.getItem('figmaToken') || '')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // عند تغيير المزود، حدث النماذج واختر أول نموذج افتراضي
  const handleProviderSelect = (providerId: string) => {
    setCurrentProviderId(providerId);
  };

  // عند تغيير النموذج
  const handleModelSelect = (modelValue: string) => {
    setCurrentModelValue(modelValue);
    const model = modelOptions.find((m) => m.value === modelValue);
    if (model) setBaseModal(model as any);
  };

  // فتح نافذة إدخال مفتاح API
  const handleOpenApiKeyModal = (provider: ModelProvider) => {
    setProviderForApiKey(provider);
    setApiKeyInput(apiKeys[provider.id] || "");
    setShowApiKeyModal(true);
  };

  // حفظ مفتاح API
  const handleSaveApiKey = () => {
    if (providerForApiKey) {
      setApiKey(providerForApiKey.id, apiKeyInput);
      setShowApiKeyModal(false);
    }
  };

  // تحديث النموذج الافتراضي عند تغيير المزود
  useEffect(() => {
    if (modelOptions.length > 0) {
      setCurrentModelValue(modelOptions[0].value);
      setBaseModal(modelOptions[0] as any);
    }
  }, [modelOptions]);

  const handleFigmaSubmit = () => {
    localStorage.setItem('figmaUrl', figmaUrl)
    localStorage.setItem('figmaToken', figmaToken)
    setIsFigmaModalOpen(false)
  }

  // 定义一个可复用的按钮样式组件
  const ToolbarButton = React.forwardRef<HTMLButtonElement, any>((props, ref) => (
    <button
      ref={ref}
      {...props}
      className={classNames(
        "p-2 text-gray-600 dark:text-gray-500 flex hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500/20 rounded-lg transition-all duration-200",
        props.disabled && "opacity-50 cursor-not-allowed",
        props.className
      )}
    >
      {props.children}
    </button>
  ))
  const isElectron = typeof window !== 'undefined' && !!window.electron;
  
  const canUseMCP = isElectron && baseModal.functionCall;


  return (
    <div className="flex items-center">
      {/* قائمة مزودي الذكاء الاصطناعي */}
      <div className="relative mr-2">
        <select
          value={currentProviderId}
          onChange={(e) => handleProviderSelect(e.target.value)}
          className="px-2 py-1 rounded border border-gray-300 dark:bg-[#252525] dark:text-gray-200"
        >
          {MODEL_PROVIDERS.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.label}
            </option>
          ))}
        </select>
        {/* زر مفتاح API */}
        <button
          className="ml-1 text-xs text-blue-500 underline"
          onClick={() => handleOpenApiKeyModal(MODEL_PROVIDERS.find(p => p.id === currentProviderId)!)}
        >
          API Key
        </button>
      </div>
      {/* قائمة النماذج */}
      <div className="relative mr-2">
        <select
          value={currentModelValue}
          onChange={(e) => handleModelSelect(e.target.value)}
          className="px-2 py-1 rounded border border-gray-300 dark:bg-[#252525] dark:text-gray-200"
        >
          {modelOptions.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>
      {/* نافذة إدخال مفتاح API */}
      {showApiKeyModal && (
        <Modal
          open={showApiKeyModal}
          onCancel={() => setShowApiKeyModal(false)}
          onOk={handleSaveApiKey}
          title={`API Key for ${providerForApiKey?.label}`}
        >
          <Input
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder="Enter API Key"
          />
        </Modal>
      )}
      <div className="flex items-center gap-2">
        {/* MCP Tools Button - Disabled when functionCall is false */}
        {isElectron && (
          <Tooltip
            title={
              <div className="text-xs">
                <div className="font-medium mb-1">
                  {!canUseMCP
                    ? t("chat.buttons.mcp_disabled")
                    : t("chat.buttons.mcp_tools")}
                </div>
                <div className="text-gray-300">
                  {!canUseMCP
                    ? t("chat.buttons.not_support_mcp")
                    : t("chat.buttons.click_to_use_mcp")}
                </div>
              </div>
            }
            placement="bottom"
          >
            <span className={!canUseMCP ? "cursor-not-allowed" : ""}>
              <MCPToolsButton 
                ToolbarButton={ToolbarButton} 
                disabled={!canUseMCP}
              />
            </span>
          </Tooltip>
        )}

        {/* figma todo */}
        {/* <Tooltip
          title={
            <div className="text-xs">
              <div className="font-medium mb-1">
                {t("chat.buttons.figma_integration")}
              </div>
            </div>
          }
          placement="bottom"
        >
          <button
            type="button"
            onClick={() => setIsFigmaModalOpen(true)}
            className="p-2 text-gray-600 dark:text-gray-500 flex hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500/20 rounded-lg transition-all duration-200"
          >
            <Figma className="w-4 h-4" />
          </button>
        </Tooltip> */}

        <Tooltip
          title={
            <div className="text-xs">
              <div className="font-medium mb-1">
                {isLoading || isUploading || !baseModal.useImage
                  ? t("chat.buttons.upload_disabled")
                  : t("chat.buttons.upload_image")}
              </div>
              <div className="text-gray-300">
                {isLoading || isUploading
                  ? t("chat.buttons.waiting")
                  : !baseModal.useImage
                    ? t("chat.buttons.not_support_image")
                    : t("chat.buttons.click_to_upload")}
              </div>
            </div>
          }
          placement="bottom"
        >
          <ToolbarButton
            type="button"
            onClick={onImageClick}
            disabled={isLoading || isUploading || !baseModal.useImage}
            // className={classNames(
            //   "p-2 text-gray-600 dark:text-gray-500 flex hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500/20 rounded-lg transition-all duration-200",
            //   (isLoading || isUploading || !baseModal.useImage) &&
            //   "opacity-50 cursor-not-allowed"
            // )}
          >
            <Image className="w-4 h-4" />
          </ToolbarButton>
        </Tooltip>

      </div>

      <div className="relative ml-2" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(
            "flex items-center justify-between w-[150px] px-2 py-1 text-[11px] text-gray-700 dark:text-gray-300 bg-transparent dark:bg-[#252525] rounded-md transition-colors duration-200",
            isOpen
              ? "bg-gray-100 dark:bg-[#252525]"
              : "hover:bg-gray-100 dark:hover:bg-[#252525]"
          )}
        >
          <span>{baseModal.label}</span>
          <ChevronDown
            className={classNames(
              "w-3 h-3 text-gray-500 dark:text-gray-400 transition-transform duration-200",
              isOpen ? "-rotate-180" : "rotate-0"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-0 mb-1 w-[160px] bg-white dark:bg-[#18181a] border border-gray-200 dark:border-gray-600/30 rounded-lg shadow-lg overflow-hidden z-50">
            <div className="flex flex-col w-full">
              {modelOptions.map((model) => (
                <button
                  key={model.value}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleModelSelect(model.value)
                    // clearImages() // This line was removed from the new_code, so it's removed here.
                  }}
                  className={classNames(
                    "w-full px-3 py-1.5 flex justify-between text-left text-[11px] transition-colors duration-200",
                    "hover:bg-gray-100 dark:hover:bg-[#252525]",
                    baseModal.value === model.value
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {model.provider &&
                      aiProvierIcon[model.provider] &&
                      React.createElement(aiProvierIcon[model.provider])}
                    {model.label}
                  </div>
                  {/* TODO 最好之后可以是 tooltip ，不想用 antd，这里不想动了 */}
                  <div className="flex">
                    {model.quota}
                    {/* {Array.from(
                      { length: Math.floor(model.quota) },
                      (_, index) => (
                        <div key={index} className="flex">
                          <span className="icon-[line-md--star-filled] text-primary"></span>
                        </div>
                      )
                    )}
                    {model.quota % 1 !== 0 && (
                      <span className="icon-[line-md--star-filled-half] text-primary"></span>
                    )} */}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
