import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { TaskStep } from "../../../models/task";

interface props {
  step: TaskStep;
  index: number;
  totalSteps: number;
  updateStep: (text: string) => void;
  removeStep: () => void;
}

export default function Step({
  step,
  index,
  totalSteps,
  updateStep,
  removeStep,
}: props) {
  return (
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
            updateStep(text);
          }}
        />
      </View>
      {totalSteps > 1 && (
        <TouchableOpacity style={styles.removeStepButton} onPress={removeStep}>
          <Text style={styles.removeStepButtonText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
