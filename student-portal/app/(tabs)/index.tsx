import { Link } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallText}>Welcome back!</Text>
          <Text style={styles.title}>Student Portal</Text>
        </View>

        <Link href="/student/148941" asChild>
          <Pressable style={styles.profileButton}>
            <Text style={styles.profileText}>👤</Text>
          </Pressable>
        </Link>
      </View>

      {/* Student Card */}
      <View style={styles.studentCard}>
        <Text style={styles.cardLabel}>STUDENT</Text>
        <Text style={styles.studentName}>Mike Airon </Text>
        <Text style={styles.studentInfo}>BS Information Technology</Text>
        <Text style={styles.studentInfo}>Student ID: 148941</Text>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actionRow}>
        <Link href="/course/101" asChild>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionIcon}>📚</Text>
            <Text style={styles.actionText}>Courses</Text>
          </Pressable>
        </Link>

        <Link href="/student/14841" asChild>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionIcon}>🎓</Text>
            <Text style={styles.actionText}>Student Info</Text>
          </Pressable>
        </Link>
      </View>

      {/* Current Courses */}
      <Text style={styles.sectionTitle}>Current Courses</Text>

      <Link href="/course/101" asChild>
        <Pressable style={styles.courseCard}>
          <View>
            <Text style={styles.courseCode}>CCE 106</Text>
            <Text style={styles.courseName}>
              APPLICATION DEVELOPMENT AND EMERGING TECHNOLOGIES
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </Link>

      <Link href="/course/102" asChild>
        <Pressable style={styles.courseCard}>
          <View>
            <Text style={styles.courseCode}>IT 12</Text>
            <Text style={styles.courseName}>
              SYSTEMS INTEGRATION & ARCHITECTURE
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </Link>

      <Link href="/course/103" asChild>
        <Pressable style={styles.courseCard}>
          <View>
            <Text style={styles.courseCode}>IT 13</Text>
            <Text style={styles.courseName}>
              PROFESSIONAL TRACK FOR IT 4
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </Link>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 20,
  },

  smallText: {
    fontSize: 14,
    color: '#777',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },

  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#DDE7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileText: {
    fontSize: 24,
  },

  studentCard: {
    backgroundColor: '#246BCE',
    borderRadius: 16,
    padding: 22,
    marginBottom: 25,
  },

  cardLabel: {
    color: '#DCEAFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  studentName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  studentInfo: {
    color: '#E8F1FF',
    fontSize: 14,
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 25,
  },

  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },

  actionIcon: {
    fontSize: 25,
    marginBottom: 6,
  },

  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },

  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  courseCode: {
    fontSize: 13,
    color: '#246BCE',
    fontWeight: 'bold',
    marginBottom: 4,
  },

  courseName: {
    fontSize: 15,
    color: '#333',
  },

  arrow: {
    fontSize: 28,
    color: '#999',
  },
});