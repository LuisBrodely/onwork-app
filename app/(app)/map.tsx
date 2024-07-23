import { StyleSheet, View, Text, Alert } from "react-native";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

interface User {
  tags: string[];
  uuid: string;
  name: string;
  email: string;
  lastName: string;
  phoneNumber: string;
  birthday: string;
  region: string;
  plan: string;
  role: string;
  latitude: number;
  longitude: number;
  description: string;
  company: string;
}

interface ApiResponse {
  data: User[];
  message: string;
  success: boolean;
  statusCode: number;
}

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

export default function ProfileScreen() {
  const { user } = useSessionStore();

  const [users, setUsers] = useState<User[]>([]);
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


  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://50.17.183.28:3000/api/v1/users/',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRhZ3MiOlt7InV1aWQiOiIwMTlmNjkxNS1lZGJiLTRmZGItYWYzZi0wMmY1ODhiMjI0ZjIiLCJ0aXRsZSI6IkVuc2FtYmxhamUiLCJkZXNjcmlwdGlvbiI6Ik1vbnRhamUgZGUgbXVlYmxlcywgZXF1aXBvcyB5IG90cm9zIGFydMOtY3Vsb3MgcXVlIHJlcXVpZXJlbiBlbnNhbWJsYWplLiJ9LHsidXVpZCI6IjA2ODU1OWJhLTBmNTMtNDBjMS04MjAzLWJkMzVjNTg4YjJjNCIsInRpdGxlIjoiUGludHVyYSIsImRlc2NyaXB0aW9uIjoiU2VydmljaW9zIGRlIGFwbGljYWNpw7NuIGRlIHBpbnR1cmEgZW4gaW50ZXJpb3JlcyB5IGV4dGVyaW9yZXMuIn1dLCJ1dWlkIjoiMWQ3YzhkMGEtNmVjNS00ZDcxLTlmMTEtYzVmOWViNTZjZWM4IiwibmFtZSI6InNob25zYWRhc2QiLCJlbWFpbCI6InJhbW9zcHJvcXVlQGdtYWlsLmNvbSIsImxhc3ROYW1lIjoic2hvbnNhZGFzZCIsInBob25lTnVtYmVyIjoiOTIzNDU2Nzg5MSIsImJpcnRoZGF5IjoiMjAyMi0wMy0wMSIsInJlZ2lvbiI6ImNoaWFwYXMiLCJwbGFuIjoiRlJFRSIsInJvbGUiOiJTRVJWSUNFX1BST1ZJREVSIiwibGF0aXR1ZGUiOjAsImxvbmdpdHVkZSI6MCwiZGVzY3JpcHRpb24iOiJ3ZSBkb24ndCBrbm93IGFueXRoaW5nIHlldCBhYm91dCB0aGlzIHBlcnNvbiwgYnV0IHdlIHRoaW5rIGhlJ3MgZ3JlYXQuIiwiY29tcGFueSI6IiIsImltYWdlX3VybCI6Imh0dHBzOi8vb253b3JrLnMzLmFtYXpvbmF3cy5jb20vdXN1YXJpby9tLnBuZyJ9LCJpYXQiOjE3MjE3MTAyOTIsImV4cCI6MTcyMTcxNzQ5Mn0.CKe1zq0HKkRRU02fA5pDCW-th_T9aT7MuCfD3xx3UXM'
    }
  };

  useEffect(() => {
    axios.request<ApiResponse>(config)
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.containerGlobal}>
      <MapView
        style={styles.map}
      >
        {users && users.map((user, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude,
            }}
            title={user.name}
            description={user.description}
          >
            <View style={styles.marker}>
              <Ionicons name="person" size={14} color="#fff" />
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
    height: '60%',
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
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF3166',
    elevation: 1,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOpacity: 2,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 12,
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
