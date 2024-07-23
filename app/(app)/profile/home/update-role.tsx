import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { useUserStore } from "@/features/users/presentation/controllers/useUserStore";
import { FAB, Switch } from "react-native-paper";
import { Role } from "@/features/users/domain/models/user.model";
import { Button } from "react-native-paper";

const EditProfileScreen = () => {
  const { user, setUser, signIn } = useSessionStore();
  const { updateUserRole, getUserByUuid } = useUserStore();
  const router = useRouter();
  const [isSwitchOn, setIsSwitchOn] = useState(user?.role === Role.SERVICE_PROVIDER);

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

  return (
    <View style={styles.container}>
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

      <FAB
        icon="arrow-left"
        size="small"
        style={styles.fab}
        mode="flat"
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
    backgroundColor: "#EF3166",
  },
});

export default EditProfileScreen;
