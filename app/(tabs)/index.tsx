import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.greeting}>Hello! I am</Text>

        <Text style={styles.title}>Mike Airon Iroy</Text>

        <Text style={styles.subtitle}>My First Mobile App</Text>

        <View style={styles.line} />

        <Text style={styles.info}> Age: 19</Text>
        <Text style={styles.info}>Program: BS Information Technology</Text>
        <Text style={styles.info}>Hobbies: Sepaktakraw, Gaming, and Reading Manhwa</Text>

        <View style={styles.ideaBox}>
          <Text style={styles.ideaTitle}>My App Idea</Text>

          <Text style={styles.ideaText}>
            I plan to create a simple To-Do List app that helps users organize
            their daily tasks and keep track of things they need to accomplish.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCEBFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  greeting: {
    fontSize: 18,
    color: '#4A90E2',
    marginBottom: 5,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  subtitle: {
    fontSize: 18,
    color: '#64748B',
    marginTop: 5,
  },

  line: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 20,
  },

  info: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 12,
  },

  ideaBox: {
    backgroundColor: '#EEF6FF',
    borderRadius: 12,
    padding: 18,
    marginTop: 10,
  },

  ideaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 8,
  },

  ideaText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 23,
  },
});