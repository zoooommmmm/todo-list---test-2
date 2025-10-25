export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  text: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
}

export interface TaskState {
  tasks: Task[];
  filter: 'all' | Priority;
}