import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import type { AuthStackParamList } from './src/navigation/types';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import ConnectWalletScreen from './src/screens/auth/ConnectWalletScreen';
import HomePlaceholderScreen from './src/screens/home/HomePlaceholderScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function RootNavigator() {
  const { walletAddress } = useAuth();

  return (
    <NavigationContainer>
      {walletAddress ? (
        <HomePlaceholderScreen />
      ) : (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
          <AuthStack.Screen name="ConnectWallet" component={ConnectWalletScreen} />
        </AuthStack.Navigator>
      )}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
