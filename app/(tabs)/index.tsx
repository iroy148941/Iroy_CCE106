import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  getCurrentUser,
  loginUser,
  UserProfile,
} from '../../src/services/authService';
import {
  deleteToken,
  getToken,
  saveToken,
} from '../../src/storage/tokenStorage';

export default function HomeScreen() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);   // during login
  const [checking, setChecking] = useState(true);  // during startup check
  const [error, setError] = useState('');

  useEffect(() => {
    async function restoreSession() {
      try {
        const token = await getToken();
        if (token) {
          const user = await getCurrentUser(token);
          setProfile(user);
        }
      } catch (e) {
        await deleteToken();
        setProfile(null);
      } finally {
        setChecking(false);
      }
    }
    restoreSession();
  }, []);

  async function handleLogin() {
    setError('');
    setLoading(true);
    try {
      const data = await loginUser(username, password);
      await saveToken(data.accessToken);
      const user = await getCurrentUser(data.accessToken);
      setProfile(user);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await deleteToken();
    setProfile(null);
    setError('');
  }

  if (checking) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.muted}>Checking session...</Text>
      </View>
    );
  }

  if (profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Profile</Text>
        {profile.image ? (
          <Image source={{ uri: profile.image }} style={styles.avatar} />
        ) : null}
        <Text style={styles.name}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.row}>Username: {profile.username}</Text>
        <Text style={styles.row}>Email: {profile.email}</Text>
        <Text style={styles.row}>ID: {profile.id}</Text>
        <View style={styles.spacer} />
        <Button title="Logout" onPress={handleLogout} color="#c0392b" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Profile</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? <Text style={styles.muted}>Signing in...</Text> : null}
      <Button
        title={loading ? 'Please wait...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  error: { color: '#c0392b', marginBottom: 12, textAlign: 'center' },
  muted: { color: '#666', marginBottom: 12, textAlign: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 12 },
  name: { fontSize: 22, fontWeight: '600', textAlign: 'center', marginBottom: 12 },
  row: { fontSize: 16, marginBottom: 6 },
  spacer: { height: 24 },
});