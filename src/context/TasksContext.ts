import { createContext, useContext } from "react";
import { Task } from "../models/task";

interface TasksContextType {
  tasks: Task[];
  selectedTask: Task | null;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  toggleStep: (taskId: string, stepId: number) => void;
  selectTask: (task: Task | null) => void;
  getSelectedTask: () => Task | null;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export default TasksContext;
