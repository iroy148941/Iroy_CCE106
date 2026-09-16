import { Link } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import StatCard from "../../components/StatCard";

const tasks = [
  {
    id: "1",
    title: "Create React Native App",
    subject: "CCE106",
    dueDate: "September 17, 2026",
    status: "Completed",
  },
  {
    id: "2",
    title: "Study Navigation",
    subject: "CCE106",
    dueDate: "September 18, 2026",
    status: "Pending",
  },
  {
    id: "3",
    title: "Submit Programming Activity",
    subject: "CCE103",
    dueDate: "September 19, 2026",
    status: "Pending",
  },
  {
    id: "4",
    title: "Review Data Structures",
    subject: "CCE105",
    dueDate: "September 20, 2026",
    status: "Completed",
  },
  {
    id: "5",
    title: "Prepare for Examination",
    subject: "CCE106",
    dueDate: "September 21, 2026",
    status: "Pending",
  },
];

export default function Dashboard() {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StudyFlow</Text>

      <Text style={styles.welcome}>
        Welcome back, Mike!
      </Text>

      <Text style={styles.subtitle}>
        Here's your task summary.
      </Text>

      <View style={styles.statsContainer}>
        <StatCard
          label="Total Tasks"
          value={totalTasks}
        />

        <StatCard
          label="Completed"
          value={completedTasks}
        />

        <StatCard
          label="Pending"
          value={pendingTasks}
        />
      </View>

      <Link href="/tasks" asChild>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>
            View My Tasks
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
  },

  welcome: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    marginTop: 5,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 25,
    marginHorizontal: -5,
  },

  button: {
    backgroundColor: "#222222",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  pressed: {
    opacity: 0.6,
  },
});