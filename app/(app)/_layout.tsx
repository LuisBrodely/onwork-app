import {
  SessionStatus,
  useSessionStore,
} from "@/features/session/presentation/controllers/useSessionStore";
import { Redirect, Stack, Tabs } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
  const { status } = useSessionStore();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (status === SessionStatus.CHECKING) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} color="#FF4081" size="large" />
      </View>
    );
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (status === SessionStatus.UNAUTHENTICATED) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  return (
    <Stack/>
  );
}
