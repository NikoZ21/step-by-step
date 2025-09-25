import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Task, TaskStep } from "../models/task";
import TaskIcon from "./Shared/TaskIcon";

interface TaskModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onToggleStep: (taskId: string, stepId: number) => void;
}

const getCompletedSteps = (steps: TaskStep[]) => {
  return steps.filter((step) => step.completed).length;
};

export default function InProgressTaskModal({
  visible,
  task,
  onClose,
  onToggleStep,
}: TaskModalProps) {
  if (!task) return null;

  const renderStepItem = (step: TaskStep, taskId: string) => (
    <TouchableOpacity
      key={step.id}
      style={[styles.stepItem, step.completed && styles.stepItemCompleted]}
      onPress={() => onToggleStep(taskId, step.id)}
      activeOpacity={0.7}
    >
      <View style={styles.stepContent}>
        <View
          style={[
            styles.stepNumber,
            step.completed && styles.stepNumberCompleted,
          ]}
        >
          <Text
            style={[
              styles.stepNumberText,
              step.completed && styles.stepNumberTextCompleted,
            ]}
          >
            {step.id}
          </Text>
        </View>
        <Text
          style={[
            styles.stepDescription,
            step.completed && styles.stepDescriptionCompleted,
          ]}
        >
          {step.description}
        </Text>
      </View>
      <Text
        style={[
          styles.checkmark,
          step.completed
            ? styles.checkmarkCompleted
            : styles.checkmarkIncomplete,
        ]}
      >
        ✓
      </Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <View style={styles.modalIconContainer}>
                  <TaskIcon iconName={task.icon} color="#4A90E2" />
                </View>
                <Text style={styles.modalTitle}>{task.title}</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>{task.description}</Text>

            <View style={styles.stepsHeader}>
              <Text style={styles.stepsTitle}>Steps</Text>
              <Text style={styles.stepsCounter}>
                {getCompletedSteps(task.steps)} of {task.steps.length} completed
              </Text>
            </View>

            <ScrollView
              style={styles.stepsContainer}
              showsVerticalScrollIndicator={false}
            >
              {task.steps.map((step) => renderStepItem(step, task.id))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#262629",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    minHeight: "60%",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#4A4A4E",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#4A4A4E",
  },
  modalTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modalIconContainer: {
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4A4A4E",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "400",
  },
  modalDescription: {
    fontSize: 16,
    color: "#B0B0B0",
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 20,
    lineHeight: 24,
  },
  stepsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  stepsCounter: {
    fontSize: 14,
    color: "#B0B0B0",
  },
  stepsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#4A4A4E",
  },
  stepItemCompleted: {
    opacity: 0.7,
  },
  stepContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4A4A4E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#B0B0B0",
  },
  stepNumberCompleted: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  stepNumberTextCompleted: {
    color: "#FFFFFF",
  },
  stepDescription: {
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
    lineHeight: 22,
  },
  stepDescriptionCompleted: {
    textDecorationLine: "line-through",
    color: "#B0B0B0",
  },
  checkmark: {
    fontSize: 18,
    fontWeight: "600",
  },
  checkmarkCompleted: {
    color: "#4A90E2",
  },
  checkmarkIncomplete: {
    color: "#4A4A4E",
  },
});
