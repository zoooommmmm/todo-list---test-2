import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './store/taskSlice';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

const store = configureStore({
  reducer: {
    tasks: taskReducer
  }
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background-secondary p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-text-primary mb-6">Task Manager</h1>
          <TaskInput />
          <TaskList />
        </div>
      </div>
    </Provider>
  );
};

export default App;