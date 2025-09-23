import { TouchableOpacity, TextInput } from "react-native";
import { View, Text } from "react-native";
import { Task, TaskStep } from "../../models/task";
import { StyleSheet } from "react-native";

export default function Steps({
  newTask,
  updateNewTask,
}: {
  newTask: Task;
  updateNewTask: (updates: Partial<Task>) => void;
}) {
  return (
    <View style={styles.inputSection}>
      {/* Steps Header */}
      <View style={styles.stepsHeader}>
        <Text style={styles.inputLabel}>Steps</Text>
        <TouchableOpacity
          style={styles.addStepButton}
          onPress={() => {
            const newStep: TaskStep = {
              id: Date.now(), // Simple ID generation
              description: "",
              completed: false,
            };
            updateNewTask({ steps: [...newTask.steps, newStep] });
          }}
        >
          <Text style={styles.addStepButtonText}>+ Add Step</Text>
        </TouchableOpacity>
      </View>

      {/* Steps */}
      {newTask.steps.map((step, index) => (
        <View key={step.id} style={styles.stepInputContainer}>
          <View style={styles.stepInputNumber}>
            <Text style={styles.stepInputNumberText}>{index + 1}</Text>
          </View>
          <View style={styles.stepInputField}>
            <TextInput
              style={styles.stepInput}
              placeholder={`Step ${index + 1} description...`}
              placeholderTextColor="#B0B0B0"
              value={step.description}
              onChangeText={(text) => {
                const updatedSteps = newTask.steps.map((s, i) =>
                  i === index ? { ...s, description: text } : s
                );
                updateNewTask({ steps: updatedSteps });
              }}
            />
          </View>
          {newTask.steps.length > 1 && (
            <TouchableOpacity
              style={styles.removeStepButton}
              onPress={() => {
                const newSteps = newTask.steps.filter((_, i) => i !== index);
                updateNewTask({ steps: newSteps });
              }}
            >
              <Text style={styles.removeStepButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  inputSection: {
    marginBottom: 24,
  },
  stepsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  inputPlaceholder: {
    fontSize: 16,
    color: "#B0B0B0",
  },
  addStepButton: {
    backgroundColor: "#4A4A4E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addStepButtonText: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "500",
  },
  stepInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  stepInputNumber: {
    width: 28,
    height: 28,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#4A4A4E",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  stepInputNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#B0B0B0",
  },
  stepInputField: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  stepInput: {
    fontSize: 16,
    color: "#FFFFFF",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#4A4A4E",
    paddingVertical: 8,
  },
  removeStepButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  removeStepButtonText: {
    fontSize: 18,
    color: "#FF0000",
    fontWeight: "600",
    textAlign: "center",
  },
});
