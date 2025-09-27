import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import TaskIcon from "../Shared/TaskIcon";
import SwipeAction from "./SwipeAction";

import { Task, TaskStep } from "../../models/task";
import { scaleWidth } from "../../utils/scaling";
import { useTasks } from "../../context/TasksContext";

interface Props {
  task: Task;
  onOpen: () => void;
}

const getCompletedSteps = (steps: TaskStep[]) => {
  return steps.filter((step) => step.completed).length;
};

export default function TaskCard({ task, onOpen }: Props) {
  const tasksContext = useTasks();

  const completedSteps = getCompletedSteps(task.steps);
  const totalSteps = task.steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const sharedProg = useSharedValue(0);

  const updateProgress = (progress: number) => {
    "worklet";
    sharedProg.value = progress;
  };

  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    return (
      <SwipeAction
        prog={prog}
        drag={drag}
        icon="🗑️"
        text="Delete"
        actionStyle={styles.rightAction}
        onProgress={updateProgress}
      />
    );
  };

  const LeftAction = (prog: SharedValue<number>, drag: SharedValue<number>) => {
    return (
      <SwipeAction
        prog={prog}
        drag={drag}
        icon="✏️"
        text="Edit"
        actionStyle={styles.leftAction}
        onProgress={updateProgress}
      />
    );
  };

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: 1 - sharedProg.value, // Fade to 50% opacity when fully swiped
    };
  });

  return (
    <ReanimatedSwipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={80}
      leftThreshold={80}
      renderRightActions={RightAction}
      renderLeftActions={LeftAction}
      containerStyle={styles.swipeableContainer}
      onSwipeableOpen={(direction) => {
        console.log("swipeable open", direction);
      }}
    >
      <Reanimated.View style={[styles.taskCard, fadeStyle]}>
        <TouchableOpacity
          onPress={() => {
            onOpen();
            tasksContext.selectTask(task);
          }}
          activeOpacity={0.7}
        >
          <View style={styles.taskHeader}>
            <View style={styles.taskTitleRow}>
              <View style={styles.taskIconContainer}>
                <TaskIcon iconName={task.icon} color="#4A90E2" />
              </View>
              <Text style={styles.taskTitle}>{task.title}</Text>
            </View>
            <Text style={styles.stepCounter}>
              {completedSteps}/{totalSteps}
            </Text>
          </View>
          <Text style={styles.taskDescription}>{task.description}</Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, { width: `${progressPercentage}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(progressPercentage)}% complete
          </Text>
        </TouchableOpacity>
      </Reanimated.View>
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  swipeableContainer: {
    flex: 1,
  },
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
  rightAction: {
    backgroundColor: "#E74C3C",
    alignItems: "flex-end",
  },
  leftAction: {
    backgroundColor: "#FF8C42",
    alignItems: "flex-start",
  },
});
