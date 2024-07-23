import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { Role } from "@/features/users/domain/models/user.model";
import { RoleInvalid } from "@/shared/components/role/RoleInvalid";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, FAB } from "react-native-paper";

const PaymentsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useSessionStore();

  return (
    <View
      style={{
        ...styles.container,
        paddingHorizontal: 32,
        paddingVertical: 40,
      }}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {user?.role === Role.SERVICE_PROVIDER && (
          <View>
            <Text>Payments</Text>
          </View>
        )}

        {user?.role === Role.CLIENT && (
          <RoleInvalid />
        )}
      </ScrollView>
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
    margin: 24,
    right: 0,
    top: 0,
    borderRadius: 100,
    backgroundColor: "#FF5C69",
  },
});

export default PaymentsScreen;
