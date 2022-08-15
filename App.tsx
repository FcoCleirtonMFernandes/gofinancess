import React from 'react';
import { StatusBar } from 'react-native';
//import AppLoading from 'expo-app-loading'; 
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

// trocado pela src/routes>import { NavigationContainer } from '@react-navigation/native'
import { Routes } from './src/routes';
import { AppRoutes } from './src/routes/app.routes';

import { SignIn } from './src/screens/SignIn';

import { AuthProvider } from './src/hooks/auth';

export default function App() {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    // se a fonte não tiver carregada, aguardar...
    return null;
  }

  SplashScreen.hideAsync();
  
  return (
    <GestureHandlerRootView style={{ flex:1}}>
      <ThemeProvider theme={theme}>
 
        <StatusBar barStyle="light-content" />

        <AuthProvider >
          <Routes />
        </AuthProvider>

      </ThemeProvider>
    </GestureHandlerRootView>
  )
}