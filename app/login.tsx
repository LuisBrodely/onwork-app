import { SessionStatus, useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { SignInScreen } from "@/features/session/presentation/screens/SignInScreen";
import { Redirect } from "expo-router";

const login = () => {
  const { status } = useSessionStore();

  if (status === SessionStatus.AUTHENTICATED) {
    return <Redirect href="/" />;
  }

  return <SignInScreen />;
};

export default login;
