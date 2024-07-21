import React from "react";
import { View, Text, ScrollView, StyleSheet, FlatList, Pressable } from "react-native";
import { Image } from "expo-image";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const { user } = useSessionStore();
  const router = useRouter();

  return (
    <View 
      style={styles.container}
    >
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileInfo}>
          <View style={styles.coverPhoto}></View>
          <View style={styles.profileDetails}>
            <Image
              style={styles.profileImage}
              source={{
                uri: user?.image_url
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
              <Pressable style={styles.profileBadge}
                onPress={() => {
                  router.push("/profile/chat");
                }}
              >
                <Text style={styles.profileStars}>Contactar</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>20</Text>
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
                <Text style={styles.statNumber}>5.0</Text>
              </View>
              <Text style={styles.statLabel}>Calificación</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>14</Text>
              <Text style={styles.statLabel}>Opiniones</Text>
            </View>
          </View>
        </View>
        <View style={styles.skillsSection}>
          <Text style={styles.skillsTitle}>Descripción</Text>
          <Text style={styles.userDescription}>{user?.description}</Text>
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
              horizontal
              data={[
                {
                  id: "1",
                  image:
                    "https://scontent.ftgz2-1.fna.fbcdn.net/v/t39.30808-6/380225606_1053387445684353_5102482143565506419_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGg45zTO40jMMjMqFjAJAA7SASloZ07JrBIBKWhnTsmsI_L8JjSyTYR1tQL9cXx5YpE-nVs8Nrcd9ROawq4yrmb&_nc_ohc=-vQNJHBYyKgQ7kNvgGSCuR9&_nc_ht=scontent.ftgz2-1.fna&oh=00_AYAYF_bce3SHTmH-ofXwmj99drxzMrOWWx9q0zrLS4kmtA&oe=66A28588",
                  title: "Trabajo 1",
                  description: "Descripcion del trabajo 1",
                },
                {
                  id: "2",
                  image:
                    "https://scontent.ftgz2-1.fna.fbcdn.net/v/t39.30808-6/380225606_1053387445684353_5102482143565506419_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGg45zTO40jMMjMqFjAJAA7SASloZ07JrBIBKWhnTsmsI_L8JjSyTYR1tQL9cXx5YpE-nVs8Nrcd9ROawq4yrmb&_nc_ohc=-vQNJHBYyKgQ7kNvgGSCuR9&_nc_ht=scontent.ftgz2-1.fna&oh=00_AYAYF_bce3SHTmH-ofXwmj99drxzMrOWWx9q0zrLS4kmtA&oe=66A28588",
                  title: "Trabajo 2",
                  description:
                    "Descripcion del trabajo 2 Descripcion del trabajo 2 Descripcion del trabajo 2",
                },
              ]}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 220,
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
              )}
            />
            <FlatList
              horizontal
              data={[
                {
                  id: "1",
                  image:
                    "https://scontent.ftgz2-1.fna.fbcdn.net/v/t39.30808-6/380225606_1053387445684353_5102482143565506419_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGg45zTO40jMMjMqFjAJAA7SASloZ07JrBIBKWhnTsmsI_L8JjSyTYR1tQL9cXx5YpE-nVs8Nrcd9ROawq4yrmb&_nc_ohc=-vQNJHBYyKgQ7kNvgGSCuR9&_nc_ht=scontent.ftgz2-1.fna&oh=00_AYAYF_bce3SHTmH-ofXwmj99drxzMrOWWx9q0zrLS4kmtA&oe=66A28588",
                  title: "Trabajo 1",
                  description: "Descripcion del trabajo 1",
                },
                {
                  id: "2",
                  image:
                    "https://scontent.ftgz2-1.fna.fbcdn.net/v/t39.30808-6/380225606_1053387445684353_5102482143565506419_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGg45zTO40jMMjMqFjAJAA7SASloZ07JrBIBKWhnTsmsI_L8JjSyTYR1tQL9cXx5YpE-nVs8Nrcd9ROawq4yrmb&_nc_ohc=-vQNJHBYyKgQ7kNvgGSCuR9&_nc_ht=scontent.ftgz2-1.fna&oh=00_AYAYF_bce3SHTmH-ofXwmj99drxzMrOWWx9q0zrLS4kmtA&oe=66A28588",
                  title: "Trabajo 2",
                  description:
                    "Descripcion del trabajo 2 Descripcion del trabajo 2 Descripcion del trabajo 2",
                },
                {
                  id: "3",
                  image:
                    "https://scontent.ftgz2-1.fna.fbcdn.net/v/t39.30808-6/380225606_1053387445684353_5102482143565506419_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGg45zTO40jMMjMqFjAJAA7SASloZ07JrBIBKWhnTsmsI_L8JjSyTYR1tQL9cXx5YpE-nVs8Nrcd9ROawq4yrmb&_nc_ohc=-vQNJHBYyKgQ7kNvgGSCuR9&_nc_ht=scontent.ftgz2-1.fna&oh=00_AYAYF_bce3SHTmH-ofXwmj99drxzMrOWWx9q0zrLS4kmtA&oe=66A28588",
                  title: "Trabajo 2",
                  description:
                    "Descripcion del trabajo 2 Descripcion del trabajo 2 Descripcion del trabajo 2",
                },
                {
                  id: "4",
                  image:
                    "https://scontent.ftgz2-1.fna.fbcdn.net/v/t39.30808-6/380225606_1053387445684353_5102482143565506419_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGg45zTO40jMMjMqFjAJAA7SASloZ07JrBIBKWhnTsmsI_L8JjSyTYR1tQL9cXx5YpE-nVs8Nrcd9ROawq4yrmb&_nc_ohc=-vQNJHBYyKgQ7kNvgGSCuR9&_nc_ht=scontent.ftgz2-1.fna&oh=00_AYAYF_bce3SHTmH-ofXwmj99drxzMrOWWx9q0zrLS4kmtA&oe=66A28588",
                  title: "Trabajo 2",
                  description:
                    "Descripcion del trabajo 2 Descripcion del trabajo 2 Descripcion del trabajo 2",
                },
              ]}
              style={{ marginTop: 16 }}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 120,
                    height: 140,
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
              )}
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
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
    backgroundColor: "#EF3166",
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
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    paddingHorizontal: 6,
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  profileStars: {
    color: "#fff",
    padding: 6,
    fontWeight: "bold",
    fontSize: 14,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 30,
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
    paddingVertical: 12,
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 14,
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
