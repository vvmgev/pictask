import { Task } from "@models/task";
import tasksData from "./tasks-data.json";

let tasks: Task[] = tasksData;

export const addNewTask = (task: Omit<Task, "id">): Promise<Task> => {
  return new Promise((resolve) => {
    const newTask: Task = {
      id: String(new Date().getTime()),
      ...task,
    };
    tasks.push(newTask);
    setTimeout(resolve, 15, { ...newTask });
  });
};

export const getTasks = (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, [...tasks]);
  });
};

export const removeTaskById = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    tasks = [...tasks.filter((task) => task.id !== id)];
    setTimeout(resolve, 100, tasks);
  });
};
