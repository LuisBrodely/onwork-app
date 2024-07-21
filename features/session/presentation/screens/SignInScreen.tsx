import { useState } from "react";
import { View, Text, Button, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { SignInModel } from "@/features/session/domain/models/session.model";
import { useSessionStore } from "../controllers/useSessionStore";
import { AppTextInput } from "@/shared/components/custom/AppTextInput";
import { Link } from "expo-router";

export const SignInScreen = () => {
  const { signIn } = useSessionStore();
  const [singInForm, setSignInForm] = useState<SignInModel>({
    email: "ramosproque1@gmail.com",
    password: "12345678",
  });

  const handleSignIn = async (signInModel: SignInModel) => {
    if (!signInModel.email || !signInModel.password) {
      Alert.alert("Email and Password are required");
      return;
    }

    const response = await signIn(signInModel);
    if (!response) {
      Alert.alert("Sign In Failed");
    }
  };

  return (

    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.subtitle}>Encuentra talento cerca de ti.</Text>
        <AppTextInput
          placeholder="Ingresa tu correo electrónico"
          placeholderTextColor="#9C9C9C"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={singInForm.email}
          onChangeText={(email) => setSignInForm({ ...singInForm, email })}
        />
        <AppTextInput
          placeholder="Contraseña"
          value={singInForm.password}
          placeholderTextColor="#9C9C9C"
          secureTextEntry
          textContentType="password"
          onChangeText={(password) => setSignInForm({ ...singInForm, password })}
        />
        <TouchableOpacity style={styles.button}
          onPress={() => handleSignIn(singInForm)}
        >
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Iniciar sesión</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>¿No tienes una cuenta? </Text>
          <TouchableOpacity>
            <Link href={'/activate'} style={{ color: '#696969', fontWeight: '600', fontSize: 14 }}> Sign Up</Link>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: "#101010",
    alignSelf: "flex-start",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    color: "#717171",
    alignSelf: "flex-start",
    paddingBottom: 32,
    marginTop: 8,
  },
  input: {
    height: 48,
    marginBottom: 14,
    fontSize: 14,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    color: '#101010',
    borderColor: '#DEDEDE',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  button: {
    backgroundColor: '#5DC3B2',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});