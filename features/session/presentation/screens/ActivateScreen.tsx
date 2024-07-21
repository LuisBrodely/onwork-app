import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { OtpInput } from 'react-native-otp-entry'
import { ActivateModel } from '../../domain/models/session.model'
import { useSessionStore } from '../controllers/useSessionStore'

export const ActivateScreen = () => {
    const { activate } = useSessionStore();

    const [activateData, setActivateData] = useState<ActivateModel>({
        uuid: '',
        token: ''
    });

    const handleActivate = async (activateModel: ActivateModel) => {
        if (!activateModel.uuid || !activateModel.token) {
            Alert.alert("Fill the camps");
            return;
        }
        const response = await activate(activateModel);
        if (!response) {
            Alert.alert("Code error");
        }
    };
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F1F1F1", alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginHorizontal: 32 }}>
                <StatusBar hidden />
                <View style={styles.container}>
                    <Text style={styles.title}>Activa tu cuenta</Text>
                    <Text style={styles.subtitle}>Ingresa el código de verificación que recibiste en tu correo electrónico.</Text>
                </View>
                <View>
                    <OtpInput
                        numberOfDigits={6}
                        onTextChange={(token) => setActivateData({ ...activateData, token })}
                        focusColor={"#C8C8C8EE"}
                        focusStickBlinkingDuration={400}
                        disabled={false}
                        theme={{
                            pinCodeContainerStyle: {
                                backgroundColor: '#F1F1F1',
                                width: 58,
                                height: 58,
                                borderRadius: 10
                            }
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleActivate(activateData)}
                >
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#5DC3B2',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
        marginBottom: 20
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#717171',
        fontWeight: '400',
        marginBottom: 32
    }
});