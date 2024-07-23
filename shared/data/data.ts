import { AnimationObject } from "react-native-reanimated";

export interface OnBoardingData {
  id: number;
  animation: any;
  text: string;
  textColor: string;
  subtitle: string;
  backgroundColor: string;
  subcolor: string;
}


const data: OnBoardingData[] = [
  {
    id: 1,
    animation: require('@/assets/images/onboarding-1.svg'),
    text: 'La Dificultad en la Contratación.',
    textColor: '#F3766A',
    backgroundColor: '#201F1F',
    subtitle: 'La contratación de personal es un proceso largo y tedioso, OnWork te ayuda a simplificarlo.',
    subcolor: "#CFCFCF"
  },
  {
    id: 2,
    animation: require('@/assets/images/onboarding-2.svg'),
    text: 'La Solución de OnWork.',
    textColor: '#CF5275',
    backgroundColor: '#f1f1f1',
    subtitle: 'OnWork es una plataforma que te permite encontrar personal de manera rápida y sencilla.',
    subcolor: "#8A8A8A"
  },
  {
    id: 3,
    animation: require('@/assets/images/onboarding-3.svg'),
    text: '¿Por qué elegir OnWork?.',
    textColor: '#4B8178',
    backgroundColor: '#201F1F',
    subtitle: 'OnWork te permite encontrar personal calificado y con experiencia en el área que necesitas en cuestión de minutos.',
    subcolor: "#CFCFCF"
  },
]

export default data;