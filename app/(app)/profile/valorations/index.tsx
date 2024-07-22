import { View, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Valoration } from "@/features/valorations/data/interfaces/valoration.interface";
import { useValorationStore } from "@/features/valorations/presentation/controllers/useValorationStore";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { useRouter } from "expo-router";
import { FAB } from "react-native-paper";

const ValorationsScreen = () => {
  const [valorations, setValorations] = useState<Valoration[]>([]);
  const { getValorationsByProvider } = useValorationStore();
  const { user } = useSessionStore();
  const router = useRouter();

  const fetchValorations = async () => {
    if (user) {
      const response = await getValorationsByProvider({ uuid: user.uuid });

      console.log("valoraciones", response);

      setValorations(response);
    }
  };

  useEffect(() => {
    fetchValorations();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text>ValorationsScreen</Text>

      {valorations.map((valoration) => (
        <Pressable key={valoration.uuid}>
          <Text>{valoration.comment}</Text>
        </Pressable>
      ))}

      <FAB
        icon="plus"
        style={styles.fab}
        mode="flat"
        color="#FFF"
        onPress={() => {
          router.push("profile/valorations/create");
        }}      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FF5C69",
  },
});
export default ValorationsScreen;
