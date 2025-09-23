import { TouchableOpacity, TextInput } from "react-native";
import { View, Text } from "react-native";
import { Task, TaskStep } from "../../../models/task";
import { StyleSheet } from "react-native";
import Step from "./Step";

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
        <Step
          key={step.id}
          step={step}
          index={index}
          totalSteps={newTask.steps.length}
          updateStep={(text: string) => {
            const updatedSteps = newTask.steps.map((s, i) =>
              i === index ? { ...s, description: text } : s
            );
            updateNewTask({ steps: updatedSteps });
          }}
          removeStep={() => {
            const newSteps = newTask.steps.filter((_, i) => i !== index);
            updateNewTask({ steps: newSteps });
          }}
        />
        // <View key={step.id} style={styles.stepInputContainer}>
        //   <View style={styles.stepInputNumber}>
        //     <Text style={styles.stepInputNumberText}>{index + 1}</Text>
        //   </View>
        //   <View style={styles.stepInputField}>
        //     <TextInput
        //       style={styles.stepInput}
        //       placeholder={`Step ${index + 1} description...`}
        //       placeholderTextColor="#B0B0B0"
        //       value={step.description}
        //       onChangeText={(text) => {
        //         const updatedSteps = newTask.steps.map((s, i) =>
        //           i === index ? { ...s, description: text } : s
        //         );
        //         updateNewTask({ steps: updatedSteps });
        //       }}
        //     />
        //   </View>
        //   {newTask.steps.length > 1 && (
        //     <TouchableOpacity
        //       style={styles.removeStepButton}
        //       onPress={() => {
        //         const newSteps = newTask.steps.filter((_, i) => i !== index);
        //         updateNewTask({ steps: newSteps });
        //       }}
        //     >
        //       <Text style={styles.removeStepButtonText}>×</Text>
        //     </TouchableOpacity>
        //   )}
        // </View>
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
});
