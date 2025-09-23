import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Text } from "react-native";
import { emojiMap } from "../../data/icons";
import { Task } from "../../models/task";

const getTaskIcon = (
  iconName: string,
  size: number = 24,
  color: string = "#4A90E2"
) => {
  return (
    <Text style={{ fontSize: size, color: "#4A90E2" }}>
      {emojiMap[iconName] || "⚡"}
    </Text>
  );
};

export default function IconSelector({
  newTask,
  updateNewTask,
}: {
  newTask: Task;
  updateNewTask: (updates: Partial<Task>) => void;
}) {
  return (
    <View style={styles.inputSection}>
      <Text style={styles.inputLabel}>Choose Icon</Text>
      <View style={styles.iconSelectionContainer}>
        {["Zap", "Code", "ChefHat", "Target", "Sparkles", "BookOpen"].map(
          (iconName) => (
            <TouchableOpacity
              key={iconName}
              style={[
                styles.iconOption,
                newTask.icon === iconName && styles.iconOptionSelected,
              ]}
              onPress={() => updateNewTask({ icon: iconName })}
            >
              <View style={styles.iconOptionContainer}>
                {getTaskIcon(
                  iconName,
                  20,
                  newTask.icon === iconName ? "#FFFFFF" : "#4A90E2"
                )}
              </View>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  iconSelectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4A4A4E",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4A4A4E",
  },
  iconOptionSelected: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  iconOptionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
