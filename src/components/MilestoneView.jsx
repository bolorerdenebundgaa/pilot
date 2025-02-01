import React from 'react';
import { useProject } from '../context/ProjectContext';
import { format, differenceInDays, addDays, startOfWeek } from 'date-fns';

function MilestoneView() {
  const { epics, stories, tasks } = useProject();

  // Find project start and end dates
  const allDates = [...epics, ...tasks].flatMap(item => [
    new Date(item.startDate),
    new Date(item.endDate),
  ]);
  const projectStart = startOfWeek(new Date(Math.min(...allDates)));
  const projectEnd = new Date(Math.max(...allDates));
  const totalDays = differenceInDays(projectEnd, projectStart) + 1;
  const weeks = Math.ceil(totalDays / 7);

  // Generate week labels
  const weekLabels = Array.from({ length: weeks }, (_, i) => {
    const weekStart = addDays(projectStart, i * 7);
    return format(weekStart, 'MMM d');
  });

  const getItemPosition = (startDate, endDate) => {
    const start = differenceInDays(new Date(startDate), projectStart);
    const duration = differenceInDays(new Date(endDate), new Date(startDate)) + 1;
    const left = (start / totalDays) * 100;
    const width = (duration / totalDays) * 100;
    return { left: `${left}%`, width: `${width}%` };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Project Timeline</h2>
      
      {/* Timeline header */}
      <div className="flex mb-4 pl-[200px]">
        {weekLabels.map((label, index) => (
          <div
            key={index}
            className="flex-1 text-sm text-gray-600 text-center border-l border-gray-200"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Timeline content */}
      <div className="space-y-8">
        {/* Epics */}
        {epics.map((epic) => (
          <div key={epic.id} className="relative">
            <div className="absolute left-0 w-[180px] pr-4">
              <h3 className="font-medium text-gray-900">{epic.title}</h3>
              <p className="text-sm text-gray-500">Epic</p>
            </div>
            <div className="relative ml-[200px] h-8">
              <div
                className="absolute h-full rounded-lg bg-blue-100 border border-blue-300"
                style={getItemPosition(epic.startDate, epic.endDate)}
              >
                <div className="px-2 py-1 text-sm text-blue-800 truncate">
                  {epic.title}
                </div>
              </div>
            </div>

            {/* Stories within this epic */}
            <div className="mt-2">
              {stories
                .filter((story) => story.epicId === epic.id)
                .map((story) => {
                  // Find story date range from its tasks
                  const storyTasks = tasks.filter(
                    (task) => task.storyId === story.id
                  );
                  if (storyTasks.length === 0) return null;

                  const storyStart = new Date(
                    Math.min(
                      ...storyTasks.map((task) => new Date(task.startDate))
                    )
                  );
                  const storyEnd = new Date(
                    Math.max(...storyTasks.map((task) => new Date(task.endDate)))
                  );

                  return (
                    <div key={story.id} className="relative mt-2">
                      <div className="absolute left-0 w-[180px] pr-4 pl-4">
                        <p className="text-sm text-gray-700">{story.title}</p>
                        <p className="text-xs text-gray-500">Story</p>
                      </div>
                      <div className="relative ml-[200px] h-6">
                        <div
                          className="absolute h-full rounded-lg bg-indigo-50 border border-indigo-200"
                          style={getItemPosition(storyStart, storyEnd)}
                        >
                          <div className="px-2 py-0.5 text-xs text-indigo-700 truncate">
                            {story.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MilestoneView;
