import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native'

const ProviderScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>ProviderScreen {id}</Text>
    </View>
  )
}

export default ProviderScreen