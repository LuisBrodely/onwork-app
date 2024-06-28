import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { SignInModel } from "@/features/session/domain/models/session.model";
import { SessionStatus, useSessionStore } from "../controllers/useSessionStore";
import { router } from 'expo-router';

export const SignInScreen = () => {
  const { signIn, setStatus } = useSessionStore();
  const [singInForm, setSignInForm] = useState<SignInModel>({
    email: "",
    password: "",
  });

  return (
    <View>
      <Text>LoginScreen</Text>

      <TextInput
        placeholder="Email"
        value={singInForm.email}
        onChangeText={(email) => setSignInForm({ ...singInForm, email })}
      />

      <TextInput
        placeholder="Password"
        value={singInForm.password}
        onChangeText={(password) => setSignInForm({ ...singInForm, password })}
      />

      <Button title="Sign In" onPress={() => signIn(singInForm)} />

      <Button title="Navigate to Home" onPress={() => router.replace("/")} />

      <Button title="Poner status login" onPress={() => {
        // espera tres segundos para hacer el set status
        setTimeout(() => {
          setStatus(SessionStatus.AUTHENTICATED)
        }, 3000)
      }}/> 
    </View>
  );
};
