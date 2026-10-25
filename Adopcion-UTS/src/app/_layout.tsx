import { AuthProvider } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import Toast from "react-native-toast-message";


SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="index"
        />
        <Stack.Screen
          name="register"
        />
        <Stack.Screen
          name="login"
        />
        <Stack.Screen
          name="drawer"
        />

      </Stack>
      <Toast />
    </AuthProvider>
  );
}



// otra pantalla
// const { user, loading } = useAuth();
// user?.uid
// user?.email
// user?.displayName
// user?.photoURL