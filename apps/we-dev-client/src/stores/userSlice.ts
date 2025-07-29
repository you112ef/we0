import { authService } from "@/api/auth"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export enum TierType {
  FREE = "free",
  PRO = "pro",
  PROMAX = "promax",
}
export interface TierMessage {
  startTime: Date
  tier: TierType
  resetTime: Date
}

export interface User {
  id: string
  username: string
  error?: any
  email: string
  githubId: string
  wechatId: string
  avatar?: string
  userQuota: {
    // 用户当前拥有的配额
    quota: number
    resetTime: Date
    tierType: TierType
    // 加油包的配额
    refillQuota: number
    // 该周期的额度
    usedQuota: number
    quotaTotal: number

  }
}

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  updateUser: (userData: Partial<User>) => void
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user))
        } else {
          localStorage.removeItem("user")
        }

        set(() => ({
          user,
        }))
      },

      updateUser: (userData) =>
        set((state) => {
          const newUser = state.user ? { ...state.user, ...userData } : null
          localStorage.setItem("user", JSON.stringify(newUser))

          return { user: newUser }
        }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
      }),
      version: 1,
      onRehydrateStorage: () => (state) => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          state?.setUser(JSON.parse(storedUser))
        }
      },
    }
  )
)

export default useUserStore
