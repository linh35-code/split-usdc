import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { GroupsProvider } from './src/context/GroupsContext';
import type { AuthStackParamList, MainStackParamList } from './src/navigation/types';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import ConnectWalletScreen from './src/screens/auth/ConnectWalletScreen';
import GroupsListScreen from './src/screens/home/GroupsListScreen';
import GroupDetailScreen from './src/screens/home/GroupDetailScreen';
import CreateGroupScreen from './src/screens/groups/CreateGroupScreen';
import InviteMemberScreen from './src/screens/groups/InviteMemberScreen';
import GroupSettingsScreen from './src/screens/groups/GroupSettingsScreen';
import AddExpenseScreen from './src/screens/expenses/AddExpenseScreen';
import SplitExpenseScreen from './src/screens/expenses/SplitExpenseScreen';
import AccountScreen from './src/screens/account/AccountScreen';
import ComingSoonScreen, { ComingSoonBody } from './src/screens/common/ComingSoonScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator();

function GroupsTabStack() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="GroupsList" component={GroupsListScreen} />
      <MainStack.Screen name="GroupDetail" component={GroupDetailScreen} />
      <MainStack.Screen name="GroupSettings" component={GroupSettingsScreen} />
      <MainStack.Screen name="CreateGroup" component={CreateGroupScreen} />
      <MainStack.Screen name="InviteMember" component={InviteMemberScreen} />
      <MainStack.Screen name="AddExpense" component={AddExpenseScreen} />
      <MainStack.Screen name="SplitExpense" component={SplitExpenseScreen} />
      <MainStack.Screen name="Account" component={AccountScreen} />
      <MainStack.Screen name="ComingSoon" component={ComingSoonScreen} />
    </MainStack.Navigator>
  );
}

function ActivityComingSoon() {
  return <ComingSoonBody title="Hoạt động" />;
}

function WalletComingSoon() {
  return <ComingSoonBody title="Ví" />;
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Nhóm" component={GroupsTabStack} />
      <Tab.Screen name="Hoạt động" component={ActivityComingSoon} />
      <Tab.Screen name="Ví" component={WalletComingSoon} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { walletAddress } = useAuth();

  return (
    <NavigationContainer>
      {walletAddress ? (
        <MainTabs />
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
      <GroupsProvider>
        <RootNavigator />
      </GroupsProvider>
    </AuthProvider>
  );
}
