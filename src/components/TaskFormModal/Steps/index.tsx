import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

import { Task, TaskStep } from '../../../models/task';
import Step from './Step';

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
              id: newTask.steps.length + 1, // Simple ID generation
              description: '',
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
            const updatedSteps = newTask.steps.map((s, i) => (i === index ? { ...s, description: text } : s));
            updateNewTask({ steps: updatedSteps });
          }}
          removeStep={() => {
            const newSteps = newTask.steps.filter((_, i) => i !== index);
            updateNewTask({ steps: newSteps });
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  inputSection: {
    marginBottom: 24,
  },
  stepsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  addStepButton: {
    backgroundColor: '#4A4A4E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addStepButtonText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
});
