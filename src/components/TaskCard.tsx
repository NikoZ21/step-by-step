import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { TaskStep } from "../models/task";
import { Task } from "../models/task";

import { scaleHeight, scaleWidth } from "../utils/scaling";

import TaskIcon from "./Shared/TaskIcon";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

interface TaskCardProps {
  item: Task;
  onPress: (task: Task) => void;
}

const getCompletedSteps = (steps: TaskStep[]) => {
  return steps.filter((step) => step.completed).length;
};

export default function TaskCard({ item, onPress }: TaskCardProps) {
  const completedSteps = getCompletedSteps(item.steps);
  const totalSteps = item.steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <Swipeable>
      <TouchableOpacity
        style={styles.taskCard}
        onPress={() => onPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.taskHeader}>
          <View style={styles.taskTitleRow}>
            <View style={styles.taskIconContainer}>
              <TaskIcon iconName={item.icon} color="#4A90E2" />
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
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#262629",
    width: "100%",
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    elevation: scaleWidth(1),
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
    color: "#F8F8F8",
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
});
