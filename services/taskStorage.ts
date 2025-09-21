import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../models/task";

const TASKS_KEY = "tasks";

export const getTasks = async (): Promise<Task[]> => {
  const tasks = await AsyncStorage.getItem(TASKS_KEY);
  if (!tasks) {
    return [];
  }

  return JSON.parse(tasks);
};

export const addTask = async (task: Task): Promise<void> => {
  const tasks = await getTasks();
  tasks.push(task);
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const updateTask = async (task: Task): Promise<void> => {
  const tasks = await getTasks();

  const index = tasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    tasks[index] = task;
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }

  console.error("Task not found");
};
