import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import InProgressTaskModal from "../components/InProgressTaskModal";
import TaskFormModal from "../components/TaskFormModal";
import TaskCard from "../components/TaskCard";

import { useTasks } from "../context/TasksContext";
import { Task } from "../models/task";

const initialTask: Task = {
  id: "",
  title: "",
  description: "",
  icon: "Zap",
  steps: [
    {
      id: 1,
      description: "",
      completed: false,
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function Tasks() {
  const tasksContext = useTasks();

  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);
  const [taskFormInitialValues, setTaskFormInitialValues] =
    useState<Task>(initialTask);

  const renderTaskCard = ({ item }: { item: Task }) => (
    <TaskCard
      task={item}
      onOpen={() => {
        setModalVisible(true);
      }}
      onOpenFormModal={() => {
        setNewTaskModalVisible(true);
        setTaskFormInitialValues(item);
        console.log("onOpenFormModal with the values: ", JSON.stringify(item));
      }}
    />
  );

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Step-By-Step</Text>
            <Text style={styles.headerSubtitle}>
              Break it down, get it done
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.7}
            onPress={() => {
              setNewTaskModalVisible(true);
              setTaskFormInitialValues(initialTask);
            }}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Task List */}
      <FlatList
        data={tasksContext.tasks}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.taskList}
        showsVerticalScrollIndicator={false}
      />

      {/* Task Detail Modal */}
      <InProgressTaskModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      />

      {/* New Task Modal */}
      <TaskFormModal
        visible={newTaskModalVisible}
        initialValues={taskFormInitialValues}
        onClose={() => {
          setNewTaskModalVisible(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 8,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  addButtonText: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "300",
    lineHeight: 32,
  },
  developmentButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
