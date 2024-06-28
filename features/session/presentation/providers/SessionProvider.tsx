import { PropsWithChildren, useEffect } from "react";
import { SessionStatus, useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { router } from "expo-router";

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const { validateToken, status } = useSessionStore()

  useEffect(() => {
    console.log('API URL =>>  ', process.env.EXPO_PUBLIC_API_URL)
    validateToken();
  }, [])

    useEffect(() => {
      if (status !== SessionStatus.CHECKING) {
        if (status === SessionStatus.UNAUTHENTICATED) {
          router.replace("/login")
        }

        if (status === SessionStatus.AUTHENTICATED) {
          router.replace("/")
        }
      }
    }, [status])

  return children
}