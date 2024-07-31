import { View, StyleSheet, ScrollView, Alert, Text } from "react-native";
import { useState } from "react";
import { FAB, TextInput, Button, Switch } from "react-native-paper";
import { useRouter } from "expo-router";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { useUserStore } from "@/features/users/presentation/controllers/useUserStore";
import {
  Role,
  UserUpdateModel,
  UserUpdatePasswordModel,
} from "@/features/users/domain/models/user.model";
import { User } from "@/features/session/data/interfaces/session.interface";

const EditProfileScreen = () => {
  const { user, setUser, signOut } = useSessionStore();
  const { updateUser, getUserByUuid, updateUserPassword } = useUserStore();

  const [form, setForm] = useState<UserUpdateModel>({
    uuid: user?.uuid || "",
    email: user?.email || "",
    name: user?.name || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    birthday: user?.birthday || new Date(),
    region: user?.region || "",
  });

  const [passwordForm, setPasswordForm] = useState<UserUpdatePasswordModel>({
    uuid: user?.uuid || "",
    password: "",
    newPassword: "",
  });

  const handleSubmit = async () => {
    if (
      !form.email ||
      !form.name ||
      !form.lastName ||
      !form.phoneNumber ||
      !form.birthday ||
      !form.region
    ) {
      Alert.alert("Todos los campos son requeridos");
      return;
    }

    const response = await updateUser(form);
    if (!response) {
      Alert.alert("Error al actualizar el perfil");
    } else {
      Alert.alert("Perfil actualizado correctamente");
      const response = await getUserByUuid({
        uuid: user?.uuid || "",
      });
      setUser(response as User);
      router.back();
    }
  };

  const handleUpdatePassword = async () => {
    if (!passwordForm.password || !passwordForm.newPassword) {
      Alert.alert("Todos los campos son requeridos");
      return;
    }

    const response = await updateUserPassword(passwordForm);
    if (!response) {
      Alert.alert("Error al actualizar la contraseña");
    } else {
      Alert.alert("Contraseña actualizada correctamente");
      router.back();
    }
  };

  const { updateUserRole } = useUserStore();
  const [isSwitchOn, setIsSwitchOn] = useState(
    user?.role === Role.SERVICE_PROVIDER
  );

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const handleUpdateRole = async () => {
    const response = await updateUserRole({
      uuid: user?.uuid || "",
      role: isSwitchOn ? Role.SERVICE_PROVIDER : Role.CLIENT,
    });

    if (response) {
      const updatedUser = await getUserByUuid({ uuid: user?.uuid || "" });
      if (!updatedUser) return;
      setUser(updatedUser);
      Alert.alert("Actualizado", "Rol actualizado correctamente");
      router.back();
    } else {
      Alert.alert("Error", "Ocurrió un error al actualizar el rol");
    }
  };

  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 24,
          }}
        >
          Editar perfil
        </Text>

        <View style={{ marginTop: 18, gap: 10 }}>
          <TextInput
            label="Correo electrónico"
            value={form.email}
            mode="outlined"
            onChangeText={(text) => setForm({ ...form, email: text })}
          />

          <TextInput
            label="Nombre"
            value={form.name}
            mode="outlined"
            onChangeText={(text) => setForm({ ...form, name: text })}
          />

          <TextInput
            label="Apellido"
            value={form.lastName}
            mode="outlined"
            onChangeText={(text) => setForm({ ...form, lastName: text })}
          />

          <TextInput
            label="Número de teléfono"
            value={form.phoneNumber}
            mode="outlined"
            onChangeText={(text) => setForm({ ...form, phoneNumber: text })}
          />

          <TextInput
            label="Fecha de nacimiento"
            value={form.birthday.toString()}
            mode="outlined"
            onChangeText={(text) =>
              setForm({ ...form, birthday: new Date(text) })
            }
          />

          <TextInput
            label="Región"
            mode="outlined"
            value={form.region}
            onChangeText={(text) => setForm({ ...form, region: text })}
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={{
            marginTop: 24,
            backgroundColor: "#FF5C69",
          }}
        >
          Guardar
        </Button>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 32,
          }}
        >
          Editar contraseña
        </Text>

        <View style={{ marginTop: 18, gap: 10 }}>
          <TextInput
            label="Contraseña actual"
            value={passwordForm.password}
            mode="outlined"
            onChangeText={(text) =>
              setPasswordForm({ ...passwordForm, password: text })
            }
          />

          <TextInput
            label="Nueva contraseña"
            value={passwordForm.newPassword}
            mode="outlined"
            onChangeText={(text) =>
              setPasswordForm({ ...passwordForm, newPassword: text })
            }
          />
        </View>

        <Button
          mode="contained"
          onPress={handleUpdatePassword}
          style={{
            marginTop: 24,
            backgroundColor: "#FF5C69",
          }}
        >
          Actualizar contraseña
        </Button>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 24,
          }}
        >
          Actualizar Rol
        </Text>

        <View style={{ marginTop: 12, gap: 14 }}>
          <Text>¿Quieres ser proveedor?</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color="#EF3166"
          />
        </View>

        <Button
          mode="contained"
          buttonColor="#EF3166"
          style={{ marginTop: 24 }}
          onPress={handleUpdateRole}
        >
          Guardar
        </Button>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 32,
          }}
        >
          Cerrar sesión
        </Text>

        <Button
          mode="contained"
          onPress={() => {
            signOut();
          }}
          style={{
            marginTop: 24,
            backgroundColor: "#FF5C69",
          }}
        >
          Cerrar sesión
        </Button>
      </ScrollView>

      <FAB
        icon="arrow-left"
        style={styles.fab}
        mode="flat"
        size="small"
        color="#FFF"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  fab: {
    position: "absolute",
    marginHorizontal: 24,
    marginVertical: 20,
    right: 0,
    top: 0,
    borderRadius: 100,
    backgroundColor: "#FF5C69",
  },
});

export default EditProfileScreen;
