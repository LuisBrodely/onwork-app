import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import axios, { AxiosResponse } from 'axios';

// Define the interfaces for the response data
export interface SessionCreateResponse {
  data: Data;
  message: string;
  status: boolean;
  status_code: number;
}

export interface Data {
  success: boolean;
  x: Date[];
  y: number[];
  x_pred: Date[];
  y_pred: number[];
  s3_url: string;
}

const Graphs: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://onwork-gateway.integrador.xyz/api/v1/valorations/serie/user/1d7c8d0a-6ec5-4d71-9f11-c5f9eb56cec8/days/10',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRhZ3MiOltdLCJ1dWlkIjoiOTgyMzYyZGEtNGFhYi00YTBjLTlkNzItYjFiOTcwZThkNTU1IiwibmFtZSI6InNob25zYWRhc2QiLCJlbWFpbCI6InJhbW9zcHJvcXVlb2ZpY2lhbEBnbWFpbC5jb20iLCJsYXN0TmFtZSI6InNob25zYWRhc2QiLCJwaG9uZU51bWJlciI6IjkyMzQ1Njc4OTEiLCJiaXJ0aGRheSI6IjIwMjItMDMtMDEiLCJyZWdpb24iOiJjaGlhcGFzIiwicGxhbiI6IkZSRUUiLCJyb2xlIjoiU0VSVklDRV9QUk9WSURFUiIsImxhdGl0dWRlIjowLCJsb25naXR1ZGUiOjAsImRlc2NyaXB0aW9uIjoid2UgZG9uJ3Qga25vdyBhbnl0aGluZyB5ZXQgYWJvdXQgdGhpcyBwZXJzb24sIGJ1dCB3ZSB0aGluayBoZSdzIGdyZWF0LiIsImNvbXBhbnkiOiIiLCJpbWFnZV91cmwiOm51bGx9LCJpYXQiOjE3MjE4NDI3NDMsImV4cCI6MTcyMTg0OTk0M30.3oRKZ7M9NhYkP26bfRZ9_PyBkXcHTgDXhC3xdjxjQlM'
        }
      };

      axios.request<SessionCreateResponse>(config)
        .then((response: AxiosResponse<SessionCreateResponse>) => {
          console.log(JSON.stringify(response.data));
          setImageUrl(response.data.data.s3_url);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View>
      {imageUrl && (
        <Image
          style={{ width: 400, height: 400, resizeMode: "contain" }}
          source={{ uri: imageUrl }}
        />
      )}
    </View>
  )
}

export default Graphs;

const styles = StyleSheet.create({});
