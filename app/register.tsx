import { SessionStatus, useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { SignUpScreen } from "@/features/session/presentation/screens/SignUpScreen";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const register = () => {
  const { status } = useSessionStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [])

  if (status === SessionStatus.AUTHENTICATED) {
    return <Redirect href="/" />;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} color="#FF4081" size="large" />
      </View>
    );
  }

  return <SignUpScreen />;
};

export default register;
