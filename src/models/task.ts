export interface TaskStep {
  id: number;
  description: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: TaskStep[];
  createdAt: Date;
  updatedAt: Date;
}
