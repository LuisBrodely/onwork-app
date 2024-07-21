import { useState } from "react";
import { View, Text, Button, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { SignInModel } from "@/features/session/domain/models/session.model";
import { useSessionStore } from "../controllers/useSessionStore";
import { AppTextInput } from "@/shared/components/custom/AppTextInput";
import { Link } from "expo-router";
import Logo from "@/shared/components/Logo";

export const SignInScreen = () => {
  const { signIn } = useSessionStore();
  const [signInForm, setSignInForm] = useState<SignInModel>({
    email: "ramosproque@gmail.com",
    password: "12345678",
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
        <View style={{ marginTop: 30 }}>
          <Text style={styles.title}>Iniciar sesión</Text>
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
          autoFocus={true}
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
        <TouchableOpacity style={styles.button}
          onPress={() => handleSignIn(signInForm)}
        >
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Iniciar sesión</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>¿No tienes una cuenta? </Text>
          <TouchableOpacity>
            <Link href={'/register'} style={{ color: '#696969', fontWeight: '600', fontSize: 14 }}>Registrarse</Link>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: "#101010",
    alignSelf: "flex-start",
    paddingBottom: 24,
  },
  subtitle: {
    color: '#717171',
    fontSize: 19,
    fontWeight: '500',
    alignSelf: 'flex-start',
    paddingBottom: 32,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 24,
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