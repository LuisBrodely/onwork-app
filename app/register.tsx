import { SessionStatus, useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { SignUpScreen } from "@/features/session/presentation/screens/SignUpScreen";
import { Redirect } from "expo-router";

const register = () => {
  const { status } = useSessionStore();

  if (status === SessionStatus.AUTHENTICATED) {
    return <Redirect href="/" />;
  }

  return <SignUpScreen />;
};

export default register;
