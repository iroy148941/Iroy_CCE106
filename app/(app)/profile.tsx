import { type User } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { apiFetch } from '@/services/mockApi';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { user, token, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiFetch('/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401) {
        await logout();
        return;
      }
      if (!response.ok) {
        throw new Error('Unable to load your profile. Please try again.');
      }
      const data: User = await response.json();
      setProfile(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const shown = profile ?? user;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MY PROFILE</Text>
      <View style={styles.card}>
        <Text style={styles.text}>Name: {shown?.name || '—'}</Text>
        <Text style={styles.text}>Email: {shown?.email || '—'}</Text>
        <Text style={styles.text}>Role: {shown?.role || '—'}</Text>
        {loading && <Text style={styles.note}>Loading profile…</Text>}
        {error ? <Text style={styles.error} accessibilityLiveRegion="polite">{error}</Text> : null}
        {!shown && !loading && !error && <Text style={styles.note}>No profile loaded yet.</Text>}
      </View>
      <Text style={styles.text}>Session Status: {token ? 'Authenticated' : 'Not Available'}</Text>
      <Pressable accessibilityRole="button" style={styles.button} onPress={logout}><Text style={styles.buttonText}>LOGOUT</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 20, backgroundColor: '#f2f5fa' },
  title: { color: '#17324d', fontSize: 24, fontWeight: '700' },
  card: { backgroundColor: '#ffffff', padding: 20, gap: 16, borderRadius: 12 },
  text: { color: '#536579', fontSize: 16 },
  note: { color: '#536579', fontSize: 12 },
  error: { color: '#b42318' },
  button: { backgroundColor: '#245bb2', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: '600' },
});