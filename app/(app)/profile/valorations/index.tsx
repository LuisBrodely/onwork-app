import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { Valoration } from "@/features/valorations/data/interfaces/valoration.interface";
import { useValorationStore } from "@/features/valorations/presentation/controllers/useValorationStore";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";

const ValorationsScreen = () => {
  const [valorations, setValorations] = useState<Valoration[]>([]);
  const { getValorationsByProvider } = useValorationStore();
  const { user } = useSessionStore();

  const fetchValorations = async () => {
    if (user) {
      const response = await getValorationsByProvider({ uuid: user.uuid });

      console.log('valoraciones', response);

      setValorations(response);
    }
  };

  useEffect(() => {
    fetchValorations();
  }, [user]);

  return (
    <View>
      <Text>ValorationsScreen</Text>
    </View>
  );
};

export default ValorationsScreen;
