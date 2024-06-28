import { PropsWithChildren, useEffect } from "react";
import { SessionStatus, useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { router } from "expo-router";

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const { validateToken, status } = useSessionStore()

  useEffect(() => {
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