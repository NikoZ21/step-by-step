import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TaskCard from "./components/TaskCard";
import InProgressTaskModal from "./components/InProgressTaskModal";
import AddNewTaskModal from "./components/AddNewTaskModal/index";
import AddAllToLocalStorageButton from "./development/addAllToLocalStorageButton";
import RemoveAllFromLocalStorageButton from "./development/removeAllFromLocalStorageButton";

import { dummyTasks, Task, TaskStep } from "./temporary/dummydata";

import { getTasks } from "./services/taskStorage";

// Icon handling moved to individual components

export default function App() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    icon: "Zap",
    steps: [""],
  });

  // Load tasks when component mounts
  useEffect(() => {
    const loadTasks = async () => {
      const initialTasks = await getTasks();
      setTasks(initialTasks);
    };

    loadTasks();
  }, []);

  //functions for the modal
  const openTaskModal = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  const openNewTaskModal = () => {
    setNewTaskModalVisible(true);
  };

  const closeNewTaskModal = () => {
    setNewTaskModalVisible(false);
    setNewTask({ title: "", description: "", icon: "Zap", steps: [""] });
  };

  const toggleStep = (taskId: number, stepId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              steps: task.steps.map((step) =>
                step.id === stepId
                  ? { ...step, completed: !step.completed }
                  : step
              ),
            }
          : task
      )
    );
  };

  const handleCreateTask = () => {
    // TODO: Implement task creation logic
    console.log("Creating task:", newTask);
    closeNewTaskModal();
  };

  const renderTaskCard = ({ item }: { item: Task }) => (
    <TaskCard item={item} onPress={openTaskModal} />
  );

  // Step rendering logic moved to TaskModal component

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            {/* <Text style={styles.headerTitle}>Step-By-Step</Text>
            <Text style={styles.headerSubtitle}>
              Break it down, get it done
            </Text> */}
            <View style={styles.developmentButtonsContainer}>
              <AddAllToLocalStorageButton />
              <RemoveAllFromLocalStorageButton />
            </View>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.7}
            onPress={openNewTaskModal}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.taskList}
        showsVerticalScrollIndicator={false}
      />

      {/* Task Detail Modal */}
      <InProgressTaskModal
        visible={modalVisible}
        task={selectedTask}
        onClose={closeModal}
        onToggleStep={toggleStep}
      />

      {/* New Task Modal */}
      <AddNewTaskModal
        visible={newTaskModalVisible}
        onClose={closeNewTaskModal}
        onCreateTask={handleCreateTask}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1E",
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#1A1A1E",
    borderBottomWidth: 1,
    borderBottomColor: "#4A4A4E",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#B0B0B0",
    marginTop: 4,
  },
  taskList: {
    padding: 16,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "300",
    lineHeight: 24,
  },
  developmentButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
