import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
  
  type TaskCardProps = {
    title: string;
    subject: string;
    dueDate: string;
    status: string;
    onPress: () => void;
  };
  
  export default function TaskCard({
    title,
    subject,
    dueDate,
    status,
    onPress,
  }: TaskCardProps) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
  
          <Text style={styles.subject}>
            {subject}
          </Text>
  
          <Text style={styles.date}>
            Due: {dueDate}
          </Text>
        </View>
  
        <Text
          style={[
            styles.status,
            status === "Completed"
              ? styles.completed
              : styles.pending,
          ]}
        >
          {status}
        </Text>
      </Pressable>
    );
  }
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: "#ffffff",
      padding: 16,
      marginBottom: 10,
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      elevation: 2,
    },
  
    pressed: {
      opacity: 0.6,
    },
  
    info: {
      flex: 1,
      marginRight: 10,
    },
  
    title: {
      fontSize: 16,
      fontWeight: "bold",
    },
  
    subject: {
      fontSize: 14,
      marginTop: 4,
    },
  
    date: {
      fontSize: 12,
      marginTop: 4,
    },
  
    status: {
      fontSize: 12,
      fontWeight: "bold",
      padding: 7,
      borderRadius: 8,
    },
  
    completed: {
      backgroundColor: "#d1fae5",
    },
  
    pending: {
      backgroundColor: "#fef3c7",
    },
  });