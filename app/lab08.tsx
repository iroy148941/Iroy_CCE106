import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Student = {
  id: number;
  name: string;
  status: 'Present' | 'Absent' | '';
};

export default function Lab08() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents([
      { id: 1, name: 'Descartin, John Denver', status: '' },
      { id: 2, name: 'Gonzales, Dwayne', status: '' },
      { id: 3, name: 'Gamones, Lhindex Khim', status: '' },
      { id: 4, name: 'Iroy, Mike Airon', status: '' },
      { id: 5, name: 'Malintad, Edieson', status: '' },
      { id: 6, name: 'Olacao, Jade', status: '' },
    ]);
  }, []);

  const markAttendance = (
    id: number,
    status: 'Present' | 'Absent'
  ) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, status }
          : student
      )
    );
  };

  const presentCount = students.filter(
    (student) => student.status === 'Present'
  ).length;

  const absentCount = students.filter(
    (student) => student.status === 'Absent'
  ).length;

  const totalStudents = students.length;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Attendance Dashboard</Text>
        <Text style={styles.subtitle}>
          CCE106 • Class Attendance
        </Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {totalStudents}
          </Text>
          <Text style={styles.summaryLabel}>Students</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {presentCount}
          </Text>
          <Text style={styles.summaryLabel}>Present</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {absentCount}
          </Text>
          <Text style={styles.summaryLabel}>Absent</Text>
        </View>
      </View>

      {/* Attendance Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Student Checklist</Text>
        <Text style={styles.sectionSubtitle}>
          Select Present or Absent
        </Text>
      </View>

      {/* Student List */}
      {students.map((student) => (
        <View style={styles.studentCard} key={student.id}>
          <View style={styles.studentTop}>
            <View style={styles.studentNumber}>
              <Text style={styles.numberText}>
                {student.id}
              </Text>
            </View>

            <View style={styles.studentDetails}>
              <Text style={styles.studentName}>
                {student.name}
              </Text>

              <Text style={styles.currentStatus}>
                {student.status
                  ? student.status
                  : 'Not marked yet'}
              </Text>
            </View>
          </View>

          {/* Checklist Buttons */}
          <View style={styles.checklistContainer}>
            <TouchableOpacity
              style={styles.checkOption}
              onPress={() =>
                markAttendance(student.id, 'Present')
              }
            >
              <View
                style={[
                  styles.checkbox,
                  student.status === 'Present' &&
                    styles.presentChecked,
                ]}
              >
                {student.status === 'Present' && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>

              <Text style={styles.optionText}>Present</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkOption}
              onPress={() =>
                markAttendance(student.id, 'Absent')
              }
            >
              <View
                style={[
                  styles.checkbox,
                  student.status === 'Absent' &&
                    styles.absentChecked,
                ]}
              >
                {student.status === 'Absent' && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>

              <Text style={styles.optionText}>Absent</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Attendance: {presentCount} of {totalStudents} present
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    paddingHorizontal: 20,
  },

  /* Header */
  header: {
    marginTop: 50,
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },

  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 5,
  },

  /* Summary */
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  summaryCard: {
    backgroundColor: '#ffffff',
    width: '31%',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },

  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },

  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },

  /* Section */
  sectionHeader: {
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },

  sectionSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 3,
  },

  /* Student Card */
  studentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  studentTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  studentNumber: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  numberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },

  studentDetails: {
    flex: 1,
  },

  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  currentStatus: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 3,
  },

  /* Checklist */
  checklistContainer: {
    flexDirection: 'row',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    paddingTop: 12,
  },

  checkOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#9ca3af',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  presentChecked: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },

  absentChecked: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },

  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  optionText: {
    fontSize: 14,
    color: '#374151',
  },

  /* Footer */
  footer: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 30,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});