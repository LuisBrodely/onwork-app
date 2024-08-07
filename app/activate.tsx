import { SessionStatus, useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { ActivateScreen } from "@/features/session/presentation/screens/ActivateScreen";
import { Redirect } from "expo-router";

const activate = () => {
  const { status } = useSessionStore();

  if (status === SessionStatus.AUTHENTICATED) {
    return <Redirect href="/" />;
  }

  return <ActivateScreen />;
};

export default activate;
