import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Task, Priority } from '../types';
import { toggleTask, deleteTask, reorderTasks, setFilter } from '../store/taskSlice';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: { tasks: { tasks: Task[]; filter: string } }) => state.tasks.tasks);
  const filter = useSelector((state: { tasks: { filter: string } }) => state.tasks.filter);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.priority === filter;
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    dispatch(reorderTasks({
      sourceIndex: result.source.index,
      destinationIndex: result.destination.index
    }));
  };

  const priorityColors = {
    high: 'bg-priority-high',
    medium: 'bg-priority-medium',
    low: 'bg-priority-low'
  };

  return (
    <div className="mt-6">
      <div className="flex gap-2 mb-4">
        {['all', 'high', 'medium', 'low'].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => dispatch(setFilter(filterOption as 'all' | Priority))}
            className={`px-3 py-1 rounded-md ${filter === filterOption ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <AnimatePresence>
                {filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`p-4 mb-2 bg-white rounded-lg shadow-sm flex items-center gap-3 ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => dispatch(toggleTask(task.id))}
                          className="w-5 h-5"
                        />
                        <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                          {task.text}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${priorityColors[task.priority]}`} />
                        <button
                          onClick={() => dispatch(deleteTask(task.id))}
                          className="text-gray-400 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </AnimatePresence>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;