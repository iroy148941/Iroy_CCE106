import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    useLocalSearchParams,
    useRouter,
} from "expo-router";

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

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const task = tasks.find(
    (item) => item.id === id
  );

  const [status, setStatus] = useState(
    task?.status || "Pending"
  );

  if (!task) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Task Not Found
        </Text>

        <Text style={styles.errorText}>
          The task with ID "{id}" does not exist.
        </Text>

        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>
            Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  const toggleStatus = () => {
    setStatus(
      status === "Completed"
        ? "Pending"
        : "Completed"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {task.title}
      </Text>

      <Text style={styles.label}>
        Subject
      </Text>

      <Text style={styles.value}>
        {task.subject}
      </Text>

      <Text style={styles.label}>
        Due Date
      </Text>

      <Text style={styles.value}>
        {task.dueDate}
      </Text>

      <Text style={styles.label}>
        Status
      </Text>

      <Text style={styles.status}>
        {status}
      </Text>

      <Pressable
        onPress={toggleStatus}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>
          Mark as{" "}
          {status === "Completed"
            ? "Pending"
            : "Completed"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.backText}>
          Go Back
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
  },

  value: {
    fontSize: 17,
    marginTop: 5,
  },

  status: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },

  button: {
    backgroundColor: "#222222",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  backButton: {
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },

  backText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  pressed: {
    opacity: 0.6,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#f4f6f8",
  },

  errorTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },

  errorText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
  },
});