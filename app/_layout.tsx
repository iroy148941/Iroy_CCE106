import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { Stack } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

function RootNavigator() {
  const { token, authLoading } = useAuth();

  // Wait for session restoration before deciding which screens are available.
  if (authLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#245bb2" />
      </View>
    );
  }

  // (app) and student/[id] are only reachable with a token; sign-in only without one.
  // The navigator switches automatically when the token changes, so no manual redirects.
  return (
    <Stack screenOptions={{ headerTintColor: '#17324d' }}>
      <Stack.Protected guard={!!token}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="student/[id]" options={{ title: 'Student Details' }} />
      </Stack.Protected>

      <Stack.Protected guard={!token}>
        <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f5fa',
  },
});