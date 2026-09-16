import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import TaskCard from "../../components/TaskCard";

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

export default function Tasks() {
  const router = useRouter();

  const [filter, setFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") {
      return true;
    }

    return task.status === filter;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      <View style={styles.filterContainer}>
        {["All", "Pending", "Completed"].map(
          (item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={({ pressed }) => [
                styles.filterButton,
                filter === item &&
                  styles.activeFilter,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item &&
                    styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <ScrollView style={styles.list}>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            subject={task.subject}
            dueDate={task.dueDate}
            status={task.status}
            onPress={() =>
              router.push(`/task/${task.id}`)
            }
          />
        ))}

        {filteredTasks.length === 0 && (
          <Text style={styles.empty}>
            No tasks found.
          </Text>
        )}
      </ScrollView>
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
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 15,
  },

  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },

  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    marginRight: 8,
    marginBottom: 8,
  },

  activeFilter: {
    backgroundColor: "#222222",
  },

  filterText: {
    fontSize: 14,
  },

  activeFilterText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  pressed: {
    opacity: 0.6,
  },

  list: {
    flex: 1,
  },

  empty: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
});