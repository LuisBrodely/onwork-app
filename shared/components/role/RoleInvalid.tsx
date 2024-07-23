import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export function RoleInvalid() {
  const router = useRouter();

  return (
    <View>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginTop: 24,
          textAlign: "center",
        }}
      >
        No tienes permisos para ver esta pantalla.
      </Text>

      <Text
        style={{
          fontSize: 14,
          fontWeight: "400",
          marginTop: 14,
          textAlign: "center",
        }}
      >
        Si quieres ver tus pagos, vuelvete un proveedor de servicios pulsando el
        siguiente botón.
      </Text>

      <Button
        mode="contained"
        buttonColor="#EF3166"
        onPress={() => router.push("/profile/home/update-role")}
        style={{ marginTop: 20 }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "600",
          }}
        >
          {" "}
          Convertirme en proveedor
        </Text>
      </Button>
    </View>
  );
}
