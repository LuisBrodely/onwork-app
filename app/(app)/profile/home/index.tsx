import { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  calculateAverageRating,
  capitalize,
  formatPhoneNumber,
} from "@/shared/utils/util";
import { usePublicationStore } from "@/features/publications/presentation/controllers/usePublicationStore";
import { useValorationStore } from "@/features/valorations/presentation/controllers/useValorationStore";
import { useServiceStore } from "@/features/services/presentation/controllers/useValorationStore";

const ProfileScreen = () => {
  const { user } = useSessionStore();
  const { getValorationsByProvider, myValorations, setMyValorations } =
    useValorationStore();
  const { getPublicationsByUser, myPublications, setMyPublications } =
    usePublicationStore();
  const { getServicesByProvider, setMyServices } = useServiceStore();

  const router = useRouter();

  const fetchValorations = async () => {
    if (user) {
      const response = await getValorationsByProvider({ uuid: user.uuid });
      console.log('userid', user.uuid);
      console.log('VALORATIONS', response);
      setMyValorations(response);
    }
  };

  useEffect(() => {
    fetchValorations();
  }, [user]);

  const fetchPublications = async () => {
    if (user) {
      const response = await getPublicationsByUser({ uuid: user.uuid });
      setMyPublications(response);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, [user]);

  const fetchServices = async () => {
    if (user) {
      const response = await getServicesByProvider({ uuid: user.uuid });
      setMyServices(response);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [user]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileInfo}>
          <Image
            style={styles.coverPhoto}
            source={require("@/assets/images/bg-red-2.png")}
          ></Image>
          <View style={styles.profileDetails}>
            <Image
              style={styles.profileImage}
              source={{
                uri: user?.image_url,
              }}
            />
            <View>
              <View
                style={{
                  marginLeft: 4,
                }}
              >
                <Text style={styles.profileName}>{user?.name}</Text>
                <Text style={styles.profileTitle}>{user?.lastName}</Text>
              </View>

              {/* <Pressable
                style={styles.profileBadge}
                onPress={() => {
                  router.push(`/profile/home/chat/${user?.uuid}`);
                }}
              >
                <Text style={styles.profileStars}>Contactar</Text>
              </Pressable> */}

              <TouchableOpacity
                style={styles.profileBadge}
                onPress={() => {
                  router.push(`/profile/home/update-role`);
                }}
              >
                <Text style={styles.profileStars}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{myPublications.length}</Text>
              <Text style={styles.statLabel}>Publicaciones</Text>
            </View>

            <View style={styles.stat}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 6,
                }}
              >
                <Octicons name="star-fill" size={18} color="#FF4081" />
                <Text style={styles.statNumber}>
                  {calculateAverageRating(myValorations)}
                </Text>
              </View>
              <Text style={styles.statLabel}>Calificación</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{myValorations.length}</Text>
              <Text style={styles.statLabel}>Opiniones</Text>
            </View>
          </View>
        </View>
        <View style={styles.skillsSection}>
          <Text style={styles.skillsTitle}>Información</Text>
          <Text style={styles.userDescription}>{user?.description}</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginTop: 10,
            }}
          >
            <Octicons name="location" size={14} color="gray" />
            <Text
              style={{
                ...styles.userDescription,
                color: "gray",
              }}
            >
              {capitalize(user?.region ?? "")}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginTop: 10,
            }}
          >
            <Octicons name="device-mobile" size={14} color="gray" />
            <Text
              style={{
                ...styles.userDescription,
                color: "gray",
              }}
            >
              {"+52 " + formatPhoneNumber(user?.phoneNumber ?? "")}
            </Text>
          </View>
        </View>
        {user?.tags && user.tags.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.skillsTitle}>Categorias</Text>
            <View style={styles.skillsContainer}>
              {user?.tags.map((tag, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{tag.title}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        <View style={{ paddingVertical: 14 }}>
          <View style={{ ...styles.skillsContainer }}>
            <FlatList
              horizontal={true}
              data={myPublications}
              keyExtractor={(item) => item.uuid}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/profile/home/publication/${item.uuid}`);
                  }}
                >
                  <Image
                    source={{ uri: item.url_image }}
                    style={{
                      width: 120,
                      height: 180,
                      borderRadius: 10,
                      marginRight: 12,
                      ...(index === 0 && {
                        marginLeft: 24,
                      }),
                      ...(index === 4 && {
                        marginRight: 24,
                      }),
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={{ height: 24 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileInfo: {
    marginBottom: 10,
  },
  coverPhoto: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  profileDetails: {
    paddingHorizontal: 24,
    flexDirection: "row",
    gap: 14,
  },
  profileImage: {
    width: 124,
    height: 124,
    marginTop: -22,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fff",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 14,
  },
  profileTitle: {
    color: "gray",
    marginTop: 2,
  },
  profileBadge: {
    backgroundColor: "#ffff",
    borderRadius: 20,
    paddingHorizontal: 6,
    width: 100,
    flexDirection: "row",
    borderColor: '#C9C9C9',
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  profileStars: {
    color: "#1a1a1a",
    padding: 6,
    fontWeight: "600",
    fontSize: 14,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 22,
    paddingHorizontal: 18,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "gray",
  },
  skillsSection: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillBadge: {
    backgroundColor: "#EF3166",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  skillText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fafafa",
  },
  userDescription: {
    fontSize: 14,
    color: "gray",
    marginRight: 32,
  },
});

export default ProfileScreen;
