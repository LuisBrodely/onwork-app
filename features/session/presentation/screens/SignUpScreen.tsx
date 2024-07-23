import { useState } from "react";
import { View, Text, Alert, StyleSheet, SafeAreaView } from "react-native";
import { SignUpModel } from "@/features/session/domain/models/session.model";
import { useSessionStore } from "../controllers/useSessionStore";
import { AppTextInput } from "@/shared/components/custom/AppTextInput";
import { Link } from "expo-router";
import Logo from "@/shared/components/Logo";
import { Button } from "react-native-paper";
import Constants from "expo-constants";

export const SignUpScreen = () => {
  const { signUp } = useSessionStore();
  const [signUpData, setSignUpData] = useState<SignUpModel>({
    name: "Leonardo",
    lastName: "Toledo",
    phoneNumber: "9611717177",
    email: "leo@gmail.com",
    password: "12345678",
    birthday: "2022-03-01",
    region: "chiapas",
  });

  const handleSignUp = async (signUpModel: SignUpModel) => {
    if (!signUpModel.email || !signUpModel.password) {
      Alert.alert("Datos requeridos");
      return;
    }
    const response = await signUp(signUpModel);
    if (!response) {
      Alert.alert("Error al registrarse");
    } else {
      Alert.alert("Usuario registrado");
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        <Logo />
        <View style={{ marginTop: 32 }}>
          <Text style={styles.title}>Registrarme</Text>
        </View>
        <Text style={styles.subtitle}>Encuentra trabajadores cerca de ti.</Text>
        <View>
          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <AppTextInput
                placeholder="Nombre(s)"
                placeholderTextColor="#9C9C9C"
                autoCapitalize="none"
                textContentType="name"
                value={signUpData.name}
                onChangeText={(name) => setSignUpData({ ...signUpData, name })}
              />
            </View>
            <View style={styles.inputWrapper}>
              <AppTextInput
                placeholder="Apellido(s)"
                placeholderTextColor="#9C9C9C"
                autoCapitalize="none"
                value={signUpData.lastName}
                onChangeText={(lastName) =>
                  setSignUpData({ ...signUpData, lastName })
                }
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <AppTextInput
                placeholder="Correo electrónico"
                placeholderTextColor="#9C9C9C"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={signUpData.email}
                onChangeText={(email) =>
                  setSignUpData({ ...signUpData, email })
                }
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <AppTextInput
                placeholder="Número de teléfono"
                placeholderTextColor="#9C9C9C"
                autoCapitalize="none"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                value={signUpData.phoneNumber}
                onChangeText={(phoneNumber) =>
                  setSignUpData({ ...signUpData, phoneNumber })
                }
              />
              <AppTextInput
                placeholder="Región"
                placeholderTextColor="#9C9C9C"
                autoCapitalize="none"
                textContentType="location"
                value={signUpData.region}
                onChangeText={(region) =>
                  setSignUpData({ ...signUpData, region })
                }
              />
              <AppTextInput
                placeholder="Contraseña"
                placeholderTextColor="#9C9C9C"
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry
                value={signUpData.password}
                onChangeText={(password) =>
                  setSignUpData({ ...signUpData, password })
                }
              />
            </View>
          </View>
        </View>
        <Button
          mode="contained"
          buttonColor="#EF3166"
          onPress={() => handleSignUp(signUpData)}
          style={{ marginTop: 6 }}
        >
          <Text style={{ fontWeight: "600", color: "#fff", fontSize: 16 }}>
            Iniciar sesión
          </Text>
        </Button>
        <View
          style={{
            marginTop: 28,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Text style={{ color: "gray", fontWeight: "400", fontSize: 14 }}>
            ¿Ya tienes una cuenta?{" "}
          </Text>
          <Link
            href={"/login"}
            style={{ color: "#EF3166", fontWeight: "600", fontSize: 14 }}
          >
            Iniciar sesión
          </Link>
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
    fontWeight: "bold",
    color: "#101010",
    alignSelf: "flex-start",
    paddingBottom: 10,
  },
  subtitle: {
    color: "#717171",
    fontSize: 16,
    fontWeight: "400",
    paddingBottom: 28,
  },
  input: {
    height: 48,
    marginBottom: 14,
    fontSize: 14,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DEDEDE",
  },
  form: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: Constants.statusBarHeight + 80,
  },
  button: {
    backgroundColor: "#5DC3B2",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  label: {
    color: "#696969",
    fontSize: 14,
    fontWeight: "regular",
    alignSelf: "flex-start",
    paddingBottom: 12,
  },
  forgotten: {
    color: "#696969",
    fontSize: 14,
    fontWeight: "regular",
    alignSelf: "flex-end",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputWrapper: {
    flex: 1,
    marginRight: 8,
  },
});
