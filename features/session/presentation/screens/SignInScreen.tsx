import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { SignInModel } from "@/features/session/domain/models/session.model";
import { SessionStatus, useSessionStore } from "../controllers/useSessionStore";
import { router } from "expo-router";

export const SignInScreen = () => {
  const { signIn } = useSessionStore();
  const [singInForm, setSignInForm] = useState<SignInModel>({
    email: "",
    password: "",
  });

  const handleSignIn = async (signInModel: SignInModel) => {
    if (!signInModel.email || !signInModel.password) {
      Alert.alert("Email and Password are required");
      return;
    }

    const response = await signIn(signInModel);

    if (response) {
      Alert.alert("Sign In Success");
    } else {
      Alert.alert("Sign In Failed");
    }
  };

  return (
    <View style={{ marginTop: 100 }}>
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

      <Button title="Sign In" onPress={() => handleSignIn(singInForm)} />

      <Button title="Navigate to Home" onPress={() => router.replace("/")} />
    </View>
  );
};
