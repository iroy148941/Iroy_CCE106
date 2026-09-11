import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const students = {
  '148941': {
    name: 'Mike Airon',
    program: 'BS Information Technology',
    year: '3rd Year',
  },
};

export default function StudentDetails() {
  const { id } = useLocalSearchParams();

  const student = students[id as keyof typeof students];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Student ID</Text>
        <Text style={styles.info}>{id}</Text>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.name}>
          {student?.name ?? 'Mike Airon Iroy'}
        </Text>

        <Text style={styles.label}>Program</Text>
        <Text style={styles.info}>
          {student?.program ?? 'BS Information Technology'}
        </Text>

        <Text style={styles.label}>Year Level</Text>
        <Text style={styles.info}>
          {student?.year ?? '3rd'}
        </Text>
      </View>

      <Link href="/(tabs)" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: '#246BCE',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },

  info: {
    fontSize: 18,
    color: '#555',
  },

  button: {
    backgroundColor: '#246BCE',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});