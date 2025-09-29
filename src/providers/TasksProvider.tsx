import { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import { Task } from '../models/task';
import TasksContext from '../context/TasksContext';

import {
  getTasksFromStorage,
  addTaskToStorage,
  updateTaskInStorage,
  deleteTaskFromStorage,
} from '../services/taskStorage';

interface Props {
  children: ReactNode;
}

export default function TasksProvider({ children }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Load tasks when component mounts
  useEffect(() => {
    const loadTasks = async () => {
      const initialTasks = await getTasksFromStorage();
      setTasks(initialTasks);
    };

    loadTasks();
  }, []);

  const selectTask = (task: Task | null) => {
    setSelectedTask(task);
  };

  const getSelectedTask = () => {
    return selectedTask;
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
    addTaskToStorage(task);
  };
  const updateTask = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    updateTaskInStorage(task);
  };
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    deleteTaskFromStorage(taskId);
  };

  const toggleStep = (taskId: string, stepId: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              steps: task.steps.map(step =>
                step.id === stepId && !step.completed
                  ? { ...step, completed: true } // Only allow completion, never uncomplete
                  : step
              ),
              updatedAt: new Date(),
            }
          : task
      );

      // Update selectedTask if it's the same task being modified
      if (selectedTask && selectedTask.id === taskId) {
        const updatedSelectedTask = updatedTasks.find(t => t.id === taskId);
        if (updatedSelectedTask) {
          setSelectedTask(updatedSelectedTask);
        }
      }

      return updatedTasks;
    });

    // Update storage with the same logic
    const updatedTask = tasks.find(t => t.id === taskId);
    if (updatedTask) {
      const taskToUpdate = {
        ...updatedTask,
        steps: updatedTask.steps.map(step =>
          step.id === stepId && !step.completed ? { ...step, completed: true } : step
        ),
        updatedAt: new Date(),
      };
      updateTaskInStorage(taskToUpdate);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        selectedTask,
        setTasks,
        addTask,
        updateTask,
        deleteTask,
        toggleStep,
        selectTask,
        getSelectedTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
