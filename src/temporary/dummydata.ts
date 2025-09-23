export interface TaskStep {
  id: number;
  description: string;
  completed: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  icon: string;
  steps: TaskStep[];
}

export const dummyTasks: Task[] = [
  {
    id: 1,
    title: "Morning Routine",
    description: "Start your day with a productive morning routine",
    icon: "Zap",
    steps: [
      { id: 1, description: "Wake up at 6:00 AM", completed: true },
      { id: 2, description: "Drink a glass of water", completed: true },
      { id: 3, description: "Do 10 minutes of stretching", completed: true },
      { id: 4, description: "Take a shower", completed: false },
      { id: 5, description: "Eat a healthy breakfast", completed: false },
    ],
  },
  {
    id: 2,
    title: "Learn React Native",
    description: "Master React Native development step by step",
    icon: "Code",
    steps: [
      {
        id: 1,
        description: "Set up development environment",
        completed: true,
      },
      { id: 2, description: "Learn basic components", completed: true },
      { id: 3, description: "Understand navigation", completed: false },
      { id: 4, description: "Work with APIs", completed: false },
      { id: 5, description: "Handle state management", completed: false },
      { id: 6, description: "Build your first app", completed: false },
    ],
  },
  // {
  //   id: 3,
  //   title: "Meal Prep Sunday",
  //   description: "Prepare healthy meals for the week ahead",
  //   icon: "ChefHat",
  //   steps: [
  //     { id: 1, description: "Plan weekly menu", completed: true },
  //     { id: 2, description: "Create shopping list", completed: true },
  //     { id: 3, description: "Go grocery shopping", completed: true },
  //     { id: 4, description: "Prep vegetables", completed: false },
  //     { id: 5, description: "Cook proteins", completed: false },
  //     { id: 6, description: "Portion and store meals", completed: false },
  //   ],
  // },
  // {
  //   id: 4,
  //   title: "Home Workout",
  //   description: "Complete a full-body workout at home",
  //   icon: "Target",
  //   steps: [
  //     { id: 1, description: "5-minute warm-up", completed: true },
  //     { id: 2, description: "20 push-ups", completed: true },
  //     { id: 3, description: "30 squats", completed: true },
  //     { id: 4, description: "1-minute plank", completed: true },
  //     { id: 5, description: "15 burpees", completed: false },
  //     { id: 6, description: "5-minute cool-down stretch", completed: false },
  //   ],
  // },
  // {
  //   id: 5,
  //   title: "Deep Clean Bedroom",
  //   description: "Give your bedroom a thorough cleaning",
  //   icon: "Sparkles",
  //   steps: [
  //     { id: 1, description: "Make the bed", completed: false },
  //     { id: 2, description: "Organize nightstand", completed: false },
  //     { id: 3, description: "Vacuum the floor", completed: false },
  //     { id: 4, description: "Dust all surfaces", completed: false },
  //     { id: 5, description: "Clean windows", completed: false },
  //     { id: 6, description: "Organize closet", completed: false },
  //     { id: 7, description: "Change bed sheets", completed: false },
  //   ],
  // },
  {
    id: 6,
    title: "Study Session",
    description: "Focused 2-hour study session",
    icon: "BookOpen",
    steps: [
      { id: 1, description: "Prepare study materials", completed: false },
      { id: 2, description: "Review previous notes", completed: false },
      {
        id: 3,
        description: "Study new material (50 minutes)",
        completed: false,
      },
      { id: 4, description: "Take 10-minute break", completed: false },
      {
        id: 5,
        description: "Practice problems (50 minutes)",
        completed: false,
      },
      { id: 6, description: "Review and summarize", completed: false },
    ],
  },
];
