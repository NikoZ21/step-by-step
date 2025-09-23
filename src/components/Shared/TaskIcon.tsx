import { Text, StyleSheet } from "react-native";

export default function TaskIcon({ icon }: { icon: string }) {
  return <Text style={styles.icon}>{icon}</Text>;
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
  },
});
