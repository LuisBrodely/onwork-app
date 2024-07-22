import { View, Text, Alert, Pressable, Button } from "react-native";
import { useEffect, useState } from "react";
import { useValorationStore } from "@/features/valorations/presentation/controllers/useValorationStore";
import { useSessionStore } from "@/features/session/presentation/controllers/useSessionStore";
import { AppTextInput } from '../../../../shared/components/custom/AppTextInput';
import StarRating from 'react-native-star-rating-widget';

const ServicesScreen = () => {
  const { createValoration } = useValorationStore();
  const { user } = useSessionStore();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (user) {
      const response = await createValoration({
        user_uuid: user.uuid,
        provider_uuid: user.uuid,
        rating,
        comment,
      });

      if (response) {
        Alert.alert('Success', 'Valoración creada correctamente');
      } else {
        Alert.alert('Error', 'Ocurrió un error al crear la valoración');
      }
    }
  }

  return (
    <View>
      <StarRating
        emptyColor="#FF3040"
        color="#FF3040"
        rating={rating}
        onChange={setRating}
        maxStars={5}
      />
      <AppTextInput
        placeholder="Ingresa un comentario"
        value={comment}
        onChangeText={setComment}
      />

      <Button title="Crear Valoración" onPress={handleSubmit} />
    </View>
  );
};

export default ServicesScreen;
