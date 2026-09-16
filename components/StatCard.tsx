import { StyleSheet, Text, View } from "react-native";

type StatCardProps = {
  label: string;
  value: number;
};

export default function StatCard({
  label,
  value,
}: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 100,
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    margin: 5,
    elevation: 2,
  },

  value: {
    fontSize: 26,
    fontWeight: "bold",
  },

  label: {
    fontSize: 14,
    marginTop: 5,
  },
});