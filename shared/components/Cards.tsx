import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const professionals = [
  {
    name: 'Iram Emmanuel',
    rating: 5.0,
    jobs: 100,
    description: 'Reparación y mantenimiento de computadoras, ademas de servicio de programación.',
    color: '#FF6A5C',
  },
  {
    name: 'Iram Emmanuel',
    rating: 5.0,
    jobs: 100,
    description: 'Reparación y mantenimiento de computadoras, ademas de servicio de programación.',
    color: '#EF3166',
  },
  {
    name: 'Iram Emmanuel',
    rating: 5.0,
    jobs: 100,
    description: 'Reparación y mantenimiento de computadoras, ademas de servicio de programación.',
    color: '#5DC3B2',
  },

];

const ProfessionalCard = ({ professional }: any) => {
  return (
    <View style={styles.card}>
      <View style={[styles.header, { backgroundColor: professional.color }]}>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Entypo name="star" size={16} color="white" />
          <Text style={{ color: 'white' }}>{professional.rating}.0</Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
        <Text style={styles.name}>{professional.name}</Text>
        <Text style={styles.jobs}>+{professional.jobs} Trabajos</Text>
        <Text style={styles.description}>{professional.description}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileButtonText}>Ver perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contactar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Cards = () => {
  return (
    <FlatList
      data={professionals}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <ProfessionalCard professional={item} />}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    maxWidth: 280,
    marginLeft: 24
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 65,
  },
  rating: {
    color: '#fff',
    fontWeight: 'bold',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  jobs: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileButton: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  profileButtonText: {
    color: '#000',
    borderRadius: 8,
  },
  contactButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  contactButtonText: {
    color: '#fff',
  },
});

export default Cards;
