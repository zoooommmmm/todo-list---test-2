import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Priority } from '../types';
import { addTask } from '../store/taskSlice';

const TaskInput: React.FC = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTask({ text: text.trim(), priority }));
      setText('');
      setPriority('medium');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="p-2 border rounded-md bg-white"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Add
        </button>
      </div>
    </motion.form>
  );
};

export default TaskInput;