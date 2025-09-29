import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../models/task';

const TASKS_KEY = 'tasks';

export const getTasksFromStorage = async (): Promise<Task[]> => {
  try {
    const tasks = await AsyncStorage.getItem(TASKS_KEY);
    if (!tasks) {
      return [];
    }

    return JSON.parse(tasks);
  } catch (error) {
    console.error('Error getting tasks from storage:', error);
    return [];
  }
};

export const addTaskToStorage = async (task: Task): Promise<void> => {
  try {
    const tasks = await getTasksFromStorage();
    tasks.push(task);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error adding task to storage:', error);
  }
};

export const updateTaskInStorage = async (task: Task): Promise<void> => {
  try {
    const tasks = await getTasksFromStorage();

    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } else {
      throw new Error('Task not found');
    }
  } catch (error) {
    console.error('Error updating task in storage:', error);
  }
};

export const deleteTaskFromStorage = async (taskId: string): Promise<void> => {
  try {
    const tasks = await getTasksFromStorage();
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
  } catch (error) {
    console.error('Error deleting task from storage:', error);
  }
};
