import { Provider } from "@/features/providers/data/interfaces/provider.interface";
import { useProviderStore } from "@/features/providers/presentation/controllers/useProviderStore";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

interface ProviderCardProps {
  provider: Provider;
}

const tagColors: { [key: string]: string } = {
  Pintura: "#F5D867",
  Ensamblaje: "#6A4BC2",
  Informática: "#B54D6A",
  "Trabajo de Jardinería": "#39808A",
  Fontanería: "#5B58E0",
  "Asistencia en Eventos": "#F59B75",
  "Cuidado de Mascotas": "#5C93FF",
  Fotografía: "#FF6A5C",
  "Organización del Hogar": "#EF3166",
  // Agrega más tags y colores según necesites
};

const getHeaderColor = (tags: any) => {
  for (let tag of tags) {
    if (tagColors[tag.title]) {
      return tagColors[tag.title];
    }
  }
  return "red"; // color por defecto si no hay coincidencia de tags
};

export const ProviderCard = ({ provider }: ProviderCardProps) => {
  const headerColor = getHeaderColor(provider.tags);
  const { setSelectedUuidProvider } = useProviderStore();
  const router = useRouter();

  return (
    <View style={styles.card}>
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Entypo name="star" size={16} color="white" />
          <Text style={{ color: "white" }}>{provider.latitude}</Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
        <Text style={styles.name}>{provider.name}</Text>
        <Text style={styles.jobs}>+{provider.tags.length} Categorias</Text>
        <Text style={styles.description}>{provider.description}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => {
              setSelectedUuidProvider(provider.uuid);
              router.push("provider");
            }}
          >
            <Text style={styles.profileButtonText}>Ver perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => {
              setSelectedUuidProvider(provider.uuid);
              router.push(`/provider/home/chat/${provider?.uuid}`);
            }}
          >
            <Text style={styles.contactButtonText}>Contactar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    maxWidth: 280,
    marginLeft: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 65,
  },
  rating: {
    color: "#fff",
    fontWeight: "bold",
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  jobs: {
    textAlign: "center",
    color: "#666",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  profileButton: {
    borderWidth: 1,
    borderColor: "#DEDEDE",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  profileButtonText: {
    color: "#000",
    borderRadius: 8,
  },
  contactButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  contactButtonText: {
    color: "#fff",
  },
});
