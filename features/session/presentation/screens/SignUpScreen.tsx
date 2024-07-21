import { useState } from "react";
import { View, Text, Button, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { SignUpModel } from "@/features/session/domain/models/session.model";
import { useSessionStore } from "../controllers/useSessionStore";
import { AppTextInput } from "@/shared/components/custom/AppTextInput";
import { Link } from "expo-router";
import Logo from "@/shared/components/Logo";

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
        <View style={{ marginTop: 30 }}>
          <Text style={styles.title}>Registrarme</Text>
        </View>
        <Text style={styles.subtitle}>
          Encuentra trabajadores cerca de ti.
        </Text>
        <View >
          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <AppTextInput
                placeholder="Nombre(s)"
                placeholderTextColor="#9C9C9C"
                autoCapitalize="none"
                textContentType="name"
                autoFocus={true}
                value={signUpData.name}
                onChangeText={(name) => setSignUpData({ ...signUpData, name })}
              />
            </View>
            <View style={styles.inputWrapper}>
              <AppTextInput
                placeholder="Apellido(s)"
                placeholderTextColor="#9C9C9C"
                autoCapitalize="none"
                autoFocus={true}
                value={signUpData.lastName}
                onChangeText={(lastName) => setSignUpData({ ...signUpData, lastName })}
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
                autoFocus={true}
                value={signUpData.email}
                onChangeText={(email) => setSignUpData({ ...signUpData, email })}
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
                autoFocus={true}
                value={signUpData.phoneNumber}
                onChangeText={(phoneNumber) => setSignUpData({ ...signUpData, phoneNumber })}
              />
              <AppTextInput
                placeholder="Región"
                placeholderTextColor="#9C9C9C"
                autoCapitalize="none"
                textContentType="location"
                autoFocus={true}
                value={signUpData.region}
                onChangeText={(region) => setSignUpData({ ...signUpData, region })}
              />
              <AppTextInput
                placeholder="Contraseña"
                placeholderTextColor="#9C9C9C"
                autoCapitalize="none"
                textContentType="password"
                autoFocus={true}
                secureTextEntry
                value={signUpData.password}
                onChangeText={(password) => setSignUpData({ ...signUpData, password })}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSignUp(signUpData)}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Registrarme</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>¿Ya tienes una cuenta? </Text>
          <Link
            href={'/login'}
          >
            <Text style={{ color: '#696969', fontWeight: '600', fontSize: 14 }}>Inicia aquí</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: "#101010",
    alignSelf: "flex-start",
    paddingBottom: 24,
  },
  input: {
    height: 48,
    marginBottom: 14,
    fontSize: 14,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DEDEDE',
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
  label: {
    color: '#696969',
    fontSize: 14,
    fontWeight: 'regular',
    alignSelf: 'flex-start',
    paddingBottom: 12,
  },
  forgotten: {
    color: '#696969',
    fontSize: 14,
    fontWeight: 'regular',
    alignSelf: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flex: 1,
    marginRight: 8,
  },
  subtitle: {
    color: '#717171',
    fontSize: 19,
    fontWeight: '500',
    alignSelf: 'flex-start',
    paddingBottom: 32,
  },
});
