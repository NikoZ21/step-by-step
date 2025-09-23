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
import Steps from "./Steps";

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
  console.log("AddNewTaskModal rendered");

  const [newTask, setNewTask] = useState<Task>({
    title: "",
    description: "",
    icon: "Zap",
    steps: [
      {
        id: Date.now(),
        description: "",
        completed: false,
      },
    ],
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("newTask state: ", JSON.stringify(newTask));

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

            {/* Steps */}
            <Steps newTask={newTask} updateNewTask={updateNewTask} />

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
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#FF0000",
    fontWeight: "600",
  },
  newTaskContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },

  createTaskButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderRadius: 8,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  createTaskButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A90E2",
  },
});
