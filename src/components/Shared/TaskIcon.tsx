import { Text, StyleSheet } from "react-native";
import { emojiMap } from "../../data/icons";

interface Props {
  iconName: string;
  color: string;
}

export default function TaskIcon({ iconName, color }: Props) {
  return (
    <Text style={[styles.icon, { color: color ? color : "#4A90E2" }]}>
      {emojiMap[iconName] || "⚡"}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
