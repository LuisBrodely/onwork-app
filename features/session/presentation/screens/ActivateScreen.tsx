import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { OtpInput } from 'react-native-otp-entry'
import { ActivateModel } from '../../domain/models/session.model'
import { useSessionStore } from '../controllers/useSessionStore'
import { Button } from 'react-native-paper'

export const ActivateScreen = () => {
    const { activate, user } = useSessionStore();

    const [activateData, setActivateData] = useState<ActivateModel>({
        uuid: user?.uuid || '',
        token: ''
    });

    const handleActivate = async (activateModel: ActivateModel) => {
        console.log(activateModel.uuid, activateModel.token);
        if (!activateModel.uuid || !activateModel.token) {
            Alert.alert("Rellena los campos");
            return;
        }
        const response = await activate(activateModel);
        if (!response) {
            Alert.alert("Error al activar la cuenta");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF", alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={require('@/assets/images/logo.png')}
                style={{
                    width: 46,
                    height: 46,
                }}
            />
            <View style={{ marginHorizontal: 24 }}>
                <StatusBar />
                <View style={styles.container}>
                    <Text style={styles.title}>Activa tu cuenta</Text>
                    <Text style={styles.subtitle}>Ingresa el código de verificación que recibiste en tu correo electrónico.</Text>
                </View>
                <View>
                    <OtpInput
                        numberOfDigits={6}
                        onTextChange={(token) => setActivateData({ ...activateData, token })}
                        focusColor={"#EF3166"}
                        focusStickBlinkingDuration={400}
                        disabled={false}
                        theme={{
                            pinCodeContainerStyle: {
                                backgroundColor: '#F1F1F1',
                                width: 52,
                                height: 52,
                                borderRadius: 10,
                                marginHorizontal: 4
                            }
                        }}
                    />
                </View>
                <Button
                    mode="contained"
                    buttonColor="#EF3166"
                    onPress={() => handleActivate(activateData)}
                    style={{ marginTop: 32 }}
                >
                    <Text style={{ fontWeight: '600', color: '#fff', fontSize: 16 }}>Activar cuenta</Text>
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
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
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#717171',
        fontWeight: '400',
        marginBottom: 32
    }
});