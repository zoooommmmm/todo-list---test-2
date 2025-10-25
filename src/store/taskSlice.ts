import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState, Priority } from '../types';

const initialState: TaskState = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  filter: 'all'
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ text: string; priority: Priority }>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        text: action.payload.text,
        priority: action.payload.priority,
        completed: false,
        createdAt: Date.now()
      };
      state.tasks.unshift(newTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setFilter: (state, action: PayloadAction<'all' | Priority>) => {
      state.filter = action.payload;
    },
    reorderTasks: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const [removed] = state.tasks.splice(action.payload.sourceIndex, 1);
      state.tasks.splice(action.payload.destinationIndex, 0, removed);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  }
});

export const { addTask, toggleTask, deleteTask, setFilter, reorderTasks } = taskSlice.actions;
export default taskSlice.reducer;