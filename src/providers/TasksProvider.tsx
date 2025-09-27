import { ReactNode, useEffect } from "react";
import { useState } from "react";
import { Task } from "../models/task";
import TasksContext from "../context/TasksContext";

import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../services/taskStorage";

interface Props {
  children: ReactNode;
}

export default function TasksProvider({ children }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Load tasks when component mounts
  useEffect(() => {
    const loadTasks = async () => {
      const initialTasks = await getTasks();
      setTasks(initialTasks);
    };

    loadTasks();
  }, []);

  const selectTask = (task: Task) => {
    setSelectedTask(task);
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
    addTask(task);
  };
  const updateTask = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    updateTask(task);
  };
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    deleteTask(taskId);
  };

  const toggleStep = (taskId: string, stepId: number) => {
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

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, addTask, updateTask, deleteTask, toggleStep }}
    >
      {children}
    </TasksContext.Provider>
  );
}
