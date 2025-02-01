import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useProject } from '../context/ProjectContext';
import TaskModal from './TaskModal';

const columns = {
  todo: {
    title: 'To Do',
    className: 'bg-gray-100',
  },
  inProgress: {
    title: 'In Progress',
    className: 'bg-blue-50',
  },
  review: {
    title: 'Review',
    className: 'bg-yellow-50',
  },
  done: {
    title: 'Done',
    className: 'bg-green-50',
  },
};

function KanbanBoard() {
  const { tasks, updateTask } = useProject();
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      updateTask(draggableId, { status: destination.droppableId });
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4 h-full">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className={`flex flex-col rounded-lg ${column.className} p-4`}>
              <h2 className="font-semibold text-lg mb-4">{column.title}</h2>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-1 overflow-y-auto"
                  >
                    {getTasksByStatus(columnId).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white rounded-lg shadow-sm p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedTask(task)}
                          >
                            <h3 className="font-medium mb-2">{task.title}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">{task.description}</div>
                            <div className="mt-2 text-sm text-gray-500">
                              Assignee: {task.assignee}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={(updates) => {
            updateTask(selectedTask.id, updates);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}

export default KanbanBoard;
