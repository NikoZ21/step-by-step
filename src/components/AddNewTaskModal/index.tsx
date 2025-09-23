import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";

import { Task, TaskStep } from "../../models/task";

import IconSelector from "./IconSelector";
import CustomInput from "./CustomInput";

interface props {
  visible: boolean;
  onClose: () => void;
  onCreateTask: () => void;
}

export default function AddNewTaskModal({
  visible,
  onClose,
  onCreateTask,
}: props) {
  const [newTask, setNewTask] = useState<Task>({
    title: "",
    description: "",
    icon: "Zap",
    steps: [],
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const updateNewTask = (updates: Partial<Task>) => {
    setNewTask({ ...newTask, ...updates });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Task</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.newTaskContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Task Title Input */}
            <CustomInput
              label="Task Name"
              value={newTask.title}
              placeholder="Enter task name..."
              onChangeText={(text) => updateNewTask({ title: text })}
            />
            {/* Task Description Input */}
            <CustomInput
              label="Description"
              value={newTask.description}
              placeholder="Enter description..."
              onChangeText={(text) => updateNewTask({ description: text })}
              multiline={true}
              numberOfLines={1}
            />
            {/* Icon Selection */}
            <IconSelector newTask={newTask} updateNewTask={updateNewTask} />
            {/* Steps Section
            <View style={styles.inputSection}>
              <View style={styles.stepsHeader}>
                <Text style={styles.inputLabel}>Steps</Text>
                <TouchableOpacity
                  style={styles.addStepButton}
                  onPress={() =>
                    updateNewTask({ steps: [...newTask.steps, ""] })
                  }
                >
                  <Text style={styles.addStepButtonText}>+ Add Step</Text>
                </TouchableOpacity>
              </View>

              {newTask.steps.map((step, index) => (
                <View key={index} style={styles.stepInputContainer}>
                  <View style={styles.stepInputNumber}>
                    <Text style={styles.stepInputNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.stepInputField}>
                    <Text style={styles.inputPlaceholder}>
                      {step || `Step ${index + 1} description...`}
                    </Text>
                  </View>
                  {newTask.steps.length > 1 && (
                    <TouchableOpacity
                      style={styles.removeStepButton}
                      onPress={() => {
                        const newSteps = newTask.steps.filter(
                          (_, i) => i !== index
                        );
                        updateNewTask({ steps: newSteps });
                      }}
                    >
                      <Text style={styles.removeStepButtonText}>×</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View> */}
            {/* Create Button */}
            <TouchableOpacity
              style={styles.createTaskButton}
              onPress={onCreateTask}
            >
              <Text style={styles.createTaskButtonText}>Create Task</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
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
  newTaskContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: "#4A4A4E",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#4A4A4E",
  },
  inputPlaceholder: {
    fontSize: 16,
    color: "#B0B0B0",
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
  stepsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4A4A4E",
    justifyContent: "center",
    alignItems: "center",
  },
  stepInputNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  stepInputField: {
    flex: 1,
    backgroundColor: "#4A4A4E",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  removeStepButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
  },
  removeStepButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "300",
  },
  createTaskButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  createTaskButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
