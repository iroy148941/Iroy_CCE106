import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const courses = {
  '101': {
    code: 'CCE 106',
    name: 'APPLICATION DEVELOPMENT AND EMERGING TECHNOLOGIES',
  },
  '102': {
    code: 'IT 12',
    name: 'SYSTEMS INTEGRATION & ARCHITECTURE',
  },
  '103': {
    code: 'IT 13',
    name: 'PROFESSIONAL TRACK FOR IT 4',
  },
};

export default function CourseDetails() {
  const { id } = useLocalSearchParams();

  const course = courses[id as keyof typeof courses];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Course Code</Text>
        <Text style={styles.courseCode}>
          {course?.code ?? 'Unknown Course'}
        </Text>

        <Text style={styles.label}>Course Name</Text>
        <Text style={styles.courseName}>
          {course?.name ?? 'Course not found'}
        </Text>

        <Text style={styles.label}>Course ID</Text>
        <Text style={styles.info}>{id}</Text>
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

  courseCode: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },

  courseName: {
    fontSize: 18,
    color: '#333',
    lineHeight: 26,
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