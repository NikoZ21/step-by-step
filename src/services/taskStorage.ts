import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../models/task";

const TASKS_KEY = "tasks";

export const getTasksFromStorage = async (): Promise<Task[]> => {
  const tasks = await AsyncStorage.getItem(TASKS_KEY);
  if (!tasks) {
    return [];
  }

  return JSON.parse(tasks);
};

export const addTaskToStorage = async (task: Task): Promise<void> => {
  const tasks = await getTasksFromStorage();
  tasks.push(task);
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const updateTaskInStorage = async (task: Task): Promise<void> => {
  const tasks = await getTasksFromStorage();

  const index = tasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    tasks[index] = task;
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }

  console.error("Task not found");
};

export const deleteTaskFromStorage = async (taskId: string): Promise<void> => {
  const tasks = await getTasksFromStorage();
  const filteredTasks = tasks.filter((t) => t.id !== taskId);
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
};
