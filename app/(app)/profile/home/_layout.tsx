import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="chat" />
      <Stack.Screen name="edit" />
      <Stack.Screen name="publication/[id]" 
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
