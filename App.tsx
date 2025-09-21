import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { dummyTasks, Task, TaskStep } from "./temporary/dummydata";
// import {
//   Zap,
//   Code,
//   ChefHat,
//   Target,
//   Sparkles,
//   BookOpen,
// } from "lucide-react-native";

const getTaskIcon = (
  iconName: string,
  size: number = 24,
  color: string = "#4A90E2"
) => {
  // Temporary fallback to emojis while we debug the icon library
  const emojiMap: { [key: string]: string } = {
    Zap: "⚡",
    Code: "💻",
    ChefHat: "👨‍🍳",
    Target: "🎯",
    Sparkles: "✨",
    BookOpen: "📚",
  };

  return (
    <Text style={{ fontSize: size, color: "#4A90E2" }}>
      {emojiMap[iconName] || "⚡"}
    </Text>
  );
};

export default function App() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState(dummyTasks);

  const openTaskModal = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
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

  const getCompletedSteps = (steps: TaskStep[]) => {
    return steps.filter((step) => step.completed).length;
  };

  const renderTaskCard = ({ item }: { item: Task }) => {
    const completedSteps = getCompletedSteps(item.steps);
    const totalSteps = item.steps.length;
    const progressPercentage = (completedSteps / totalSteps) * 100;

    return (
      <TouchableOpacity
        style={styles.taskCard}
        onPress={() => openTaskModal(item)}
        activeOpacity={0.7}
      >
        <View style={styles.taskHeader}>
          <View style={styles.taskTitleRow}>
            <View style={styles.taskIconContainer}>
              {getTaskIcon(item.icon, 24, "#4A90E2")}
            </View>
            <Text style={styles.taskTitle}>{item.title}</Text>
          </View>
          <Text style={styles.stepCounter}>
            {completedSteps}/{totalSteps}
          </Text>
        </View>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${progressPercentage}%` }]}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round(progressPercentage)}% complete
        </Text>
      </TouchableOpacity>
    );
  };

  const renderStepItem = (step: TaskStep, taskId: number) => (
    <TouchableOpacity
      key={step.id}
      style={[styles.stepItem, step.completed && styles.stepItemCompleted]}
      onPress={() => toggleStep(taskId, step.id)}
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
      {step.completed && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Step-By-Step</Text>
        <Text style={styles.headerSubtitle}>Break it down, get it done</Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedTask && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleRow}>
                    <View style={styles.modalIconContainer}>
                      {getTaskIcon(selectedTask.icon, 28, "#4A90E2")}
                    </View>
                    <Text style={styles.modalTitle}>{selectedTask.title}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeModal}
                  >
                    <Text style={styles.closeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalDescription}>
                  {selectedTask.description}
                </Text>

                <View style={styles.stepsHeader}>
                  <Text style={styles.stepsTitle}>Steps</Text>
                  <Text style={styles.stepsCounter}>
                    {getCompletedSteps(selectedTask.steps)} of{" "}
                    {selectedTask.steps.length} completed
                  </Text>
                </View>

                <ScrollView
                  style={styles.stepsContainer}
                  showsVerticalScrollIndicator={false}
                >
                  {selectedTask.steps.map((step) =>
                    renderStepItem(step, selectedTask.id)
                  )}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  taskCard: {
    backgroundColor: "#262629",
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  taskTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  taskIconContainer: {
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A90E2",
    flex: 1,
  },
  stepCounter: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    backgroundColor: "#4A90E2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  taskDescription: {
    fontSize: 14,
    color: "#B0B0B0",
    marginBottom: 16,
    lineHeight: 20,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#4A4A4E",
    borderRadius: 2,
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#00D4AA",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "#B0B0B0",
    textAlign: "right",
  },
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
    color: "#2A2A2E",
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
    color: "#4A90E2",
    fontWeight: "600",
  },
});
