import { View, Text, Alert, StyleSheet } from "react-native";
import { Button, FAB } from "react-native-paper";
import { useState } from "react";
import { useValorationStore } from "@/features/valorations/presentation/controllers/useValorationStore";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { useServiceStore } from "@/features/services/presentation/controllers/useValorationStore";
import { CreateServiceModel } from "@/features/services/domain/models/service.model";

const ServicesScreen = () => {
  const router = useRouter();
  const { createService, setMyServices, getServicesByProvider } =
    useServiceStore();
  const { user } = useSessionStore();

  const [serviceForm, setServiceForm] = useState<CreateServiceModel>({
    name: "",
    currency: "MXN",
    cost_per_service: 1000,
    provider_uuid: user?.uuid || "",
  });

  const handleSubmit = async () => {
    if (!serviceForm.name || !serviceForm.cost_per_service) {
      Alert.alert("Todos los campos son requeridos");
      return;
    }
    const response = await createService(serviceForm);

    if (response) {
      Alert.alert("Success", "Servicio creado correctamente");
      const response = await getServicesByProvider({ uuid: user?.uuid || "" });
      setMyServices(response);
      router.back();
    } else {
      Alert.alert("Error", "Ocurrió un error al crear el servicio");
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
        Crear Servicio
      </Text>
      <View style={{ marginTop: 18, gap: 10 }}>
        <TextInput
          label="Nombre"
          value={serviceForm.name}
          mode="outlined"
          onChangeText={(name) => setServiceForm({ ...serviceForm, name })}
        />

        <TextInput
          label="Costo"
          value={serviceForm.cost_per_service.toString()}
          mode="outlined"
          onChangeText={(cost_per_service) =>
            setServiceForm({
              ...serviceForm,
              cost_per_service: Number(cost_per_service),
            })
          }
        />

        <TextInput
          label="Moneda"
          value={serviceForm.currency}
          mode="outlined"
          onChangeText={(currency) =>
            setServiceForm({ ...serviceForm, currency })
          }
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={{
            marginTop: 24,
            backgroundColor: "#EF3166",
          }}
        >
          Guardar
        </Button>
      </View>

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
    backgroundColor: "#EF3166",
  },
});

export default ServicesScreen;
