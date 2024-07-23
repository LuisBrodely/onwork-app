import { useState } from "react";
import { View, Text, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { SignInModel } from "@/features/session/domain/models/session.model";
import { useSessionStore } from "../controllers/useSessionStore";
import { AppTextInput } from "@/shared/components/custom/AppTextInput";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import Logo from "@/shared/components/Logo";
import Constants from "expo-constants";

export const SignInScreen = () => {
  const { signIn } = useSessionStore();
  const [signInForm, setSignInForm] = useState<SignInModel>({
    email: "ramosproque4@gmail.com",
    password: "1234567810",
  });

  const handleSignIn = async (signInModel: SignInModel) => {
    if (!signInModel.email || !signInModel.password) {
      Alert.alert("Email and Password are required");
      return;
    }

    const response = await signIn(signInModel);
    if (!response) {
      Alert.alert("Error al iniciar sesión");
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        <Logo />
        <View style={{ marginTop: 90 }}>
          <Text style={styles.title}>Iniciar Sesión</Text>
        </View>
        <Text style={styles.subtitle}>
          Encuentra talento cerca de ti.
        </Text>
        <AppTextInput
          placeholder="Ingresa tu correo electrónico"
          placeholderTextColor="#9C9C9C"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={signInForm.email}
          onChangeText={(email) => setSignInForm({ ...signInForm, email })}
        />
        <AppTextInput
          placeholder="Contraseña"
          value={signInForm.password}
          placeholderTextColor="#9C9C9C"
          secureTextEntry
          textContentType="password"
          onChangeText={(password) => setSignInForm({ ...signInForm, password })}
        />
        <Button
          mode="contained"
          buttonColor="#EF3166"
          onPress={() => handleSignIn(signInForm)}
          style={{ marginTop: 6 }}
        >
          <Text style={{ fontWeight: '600', color: '#fff', fontSize: 16 }}>Iniciar sesión</Text>
        </Button>
        <View style={{ marginTop: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <Text style={{ color: 'gray', fontWeight: '400', fontSize: 14 }}>¿No tienes una cuenta? </Text>
          <TouchableOpacity>
            <Link href={'/register'} style={{ color: '#EF3166', fontWeight: '600', fontSize: 14 }}>Registrarse</Link>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: "#101010",
    alignSelf: "flex-start",
    paddingBottom: 10,
  },
  subtitle: {
    color: '#717171',
    fontSize: 16,
    fontWeight: '400',
    paddingBottom: 28,
  },
  form: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 80,
    marginHorizontal: 24,
  },
});