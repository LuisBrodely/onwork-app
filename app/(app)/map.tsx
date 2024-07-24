import { StyleSheet, View, Text, Alert } from "react-native";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { useProviderStore } from "@/features/providers/presentation/controllers/useProviderStore";
import { useRouter } from "expo-router";

interface Coordinates {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}

interface Location {
  coords: Coordinates;
  timestamp: number;
}
const INITIAL_REGION = {
  latitude: 16.614254,
  longitude: -93.08969,
  latitudeDelta: 1,
  longitudeDelta: 1,
};


export default function ProfileScreen() {
  const { providers, getProviders, setSelectedUuidProvider } = useProviderStore();

  const router = useRouter();

  useEffect(() => {
    getProviders();
  }, []);

  const [location, setLocation] = useState<Location>({
    coords: {
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: 0,
      longitude: 0,
      speed: 0,
    },
    timestamp: 0,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location as Location);
    })();
  }, [location]);


  return (
    <View style={styles.containerGlobal}>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
      >
        {providers && providers.map((provider) => (
          <Marker
            key={provider.uuid}
            coordinate={{
              latitude: provider.latitude,
              longitude: provider.longitude,
            }}
            title={"Persona a cargo:  " + provider.name}
            onPress={() => {
              setSelectedUuidProvider(provider.uuid);
              router.push("provider");
            }}
          >
            <View style={styles.marker}>
              <Text
                style={{
                  color: '#000',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {provider?.tags.length > 0 ? provider?.tags[0].title : provider.name}
              </Text>
            </View>
          </Marker>
        ))}
        <Marker
          coordinate={{
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
          }}
          title="Tu ubicación"
        >
          <View style={styles.Mymarker}>
            <Ionicons name="location" size={14} color="#fff" />
          </View>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerGlobal: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 42,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userLocation: {
    color: '#666',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 32,
    height: 32,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 16,
    marginLeft: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    maxWidth: 300,
  },
  searchInput: {
    borderRadius: 20,
    paddingVertical: 15,
    marginVertical: 20,
    paddingLeft: 30,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    marginTop: 64
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  category: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoryJobs: {
    color: '#666',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  talentList: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 10,
  },
  talentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  talentText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  talentName: {
    color: '#aaa',
  },
  talentRating: {
    color: '#fff',
  },
  marker: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 12,
    borderColor: '#000',
    borderWidth: 0.4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  Mymarker: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5DC3B2',
    elevation: 1,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 12,
    },
  },
});
