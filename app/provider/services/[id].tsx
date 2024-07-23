import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { useServiceStore } from "@/features/services/presentation/controllers/useValorationStore";
import { useEffect, useState } from "react";
import queryString from 'query-string';
import { Service } from "@/features/services/data/interfaces/service.interface";
import base64 from "base-64";
import { WebView } from 'react-native-webview';

interface ButtonCompProps {
    text?: string;
    onPress?: () => void;
    disabled?: boolean;
    btnStyle?: object;
    isLoading?: boolean;
}

const ButtonComp: React.FC<ButtonCompProps> = ({
    text = 'DONE',
    onPress = () => { },
    disabled = false,
    btnStyle = {},
    isLoading = false
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...stylesPaypal.container,
                backgroundColor: !disabled ? '#D7654D' : 'grey',
                ...btnStyle,
            }}
            disabled={disabled}
        >
            {isLoading ? <ActivityIndicator size={'small'} /> : <Text style={stylesPaypal.textStyle}>{text}</Text>}
        </TouchableOpacity>
    );
};

// define your styles
const stylesPaypal = StyleSheet.create({
    container: {
        height: 42,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
});


const PublicationScreen = () => {
  const [service, setService] = useState<Service | null>(null);
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { getServiceByUuid } = useServiceStore();

  const fetchService = async () => {
    if (id) {
      const response = await getServiceByUuid({ uuid: id as string });
      setService(response);
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  const baseUrl = "https://api-m.sandbox.paypal.com";

  const clientId =
    "AQo77g8LKOgX5m7YMM2jA5e7SZ4evedcnuOJ4t3-eg32V86R5tjL_trEVEYHfRQs40EZQdw8yUgKaAeX";
  const secretKey =
    "EGBtDute65hIhIaKTqV1Bj_6lCsBTemvgUABxy8A-MJdj53FYF3H8F3-aaDVkTBTWVXYJM_ZGg-az4dX";

  const orderDetail = {
    intent: "CAPTURE",
    purchase_units: [
      {
        items: [
          {
            name: service?.name,
            description: "Pago de servicio en OnWork",
            quantity: "1",
            unit_amount: {
              currency_code: service?.currency,
              value: service?.cost_total.toString(),
            },
          },
        ],
        amount: {
          currency_code: service?.currency,
          value: service?.cost_total.toString(),
          breakdown: {
            item_total: {
              currency_code: service?.currency,
              value: service?.cost_total.toString(),
            },
          },
        },
      },
    ],
    application_context: {
      return_url: "https://example.com/return",
      cancel_url: "https://example.com/cancel",
    },
  };

  const generateToken = async (): Promise<string> => {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append(
      "Authorization",
      "Basic " + base64.encode(`${clientId}:${secretKey}`)
    );

    const requestOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: "grant_type=client_credentials",
    };

    try {
      const response = await fetch(
        `${baseUrl}/v1/oauth2/token`,
        requestOptions
      );
      const result = await response.text();
      console.log("result print", result);
      const { access_token } = JSON.parse(result);
      return access_token;
    } catch (error) {
      console.log("error raised", error);
      throw error;
    }
  };

  const createOrder = async (token: string): Promise<any> => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderDetail),
    };

    try {
      const response = await fetch(
        `${baseUrl}/v2/checkout/orders`,
        requestOptions
      );
      const result = await response.text();
      console.log("result print", result);
      return JSON.parse(result);
    } catch (error) {
      console.log("error raised", error);
      throw error;
    }
  };

  const capturePayment = async (id: string, token: string): Promise<any> => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        `${baseUrl}/v2/checkout/orders/${id}/capture`,
        requestOptions
      );
      const result = await response.text();
      console.log("result print", result);
      return JSON.parse(result);
    } catch (error) {
      console.log("error raised", error);
      throw error;
    }
  };

  const [paypalUrl, setPaypalUrl] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onPressPaypal = async () => {
    setLoading(true);
    try {
      const token = await generateToken();
      const res = await createOrder(token);
      setAccessToken(token);
      console.log('PayPal order response', res);

      if (res?.links) {
        const findUrl = res.links.find((data: any) => data?.rel === 'approve');
        setPaypalUrl(findUrl?.href || null);
      }
    } catch (error) {
      console.log('Error during PayPal order creation', error);
    } finally {
      setLoading(false);
    }
  };

  const onUrlChange = (webviewState: any) => {
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url);
      const { token } = urlValues.query;
      if (token) {
        paymentSuccess(token);
      }
    }
  };

  const paymentSuccess = async (orderId: string | (string | null)[]) => {
    try {
      const res = await capturePayment(orderId.toString(), accessToken || '');
      console.log('Capture payment result', res);
      alert('Payment successful!');
      clearPaypalState();
    } catch (error) {
      console.log('Error during payment capture', error);
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };


  return (
    <View style={{...styles.container, paddingHorizontal: 24 }}>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Text>{service?.name}</Text>
        <Text>{service?.cost_total}</Text>

        <View>
          <ButtonComp
            onPress={onPressPaypal}
            disabled={false}
            btnStyle={{ backgroundColor: '#0f4fa3', marginVertical: 16 }}
            text="Pay with PayPal"
            isLoading={isLoading}
          />

          <Modal visible={!!paypalUrl}>
            <TouchableOpacity
              onPress={clearPaypalState}
              style={{ margin: 24 }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <WebView
                source={{ uri: paypalUrl || '' }}
                onNavigationStateChange={onUrlChange}
              />
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default PublicationScreen;
