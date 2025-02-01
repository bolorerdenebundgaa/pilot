import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isWithinInterval,
  addWeeks,
  subWeeks,
} from 'date-fns';

function WeeklyView() {
  const { tasks, epics, stories, generateWeeklyReport } = useProject();
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const getTasksForDay = (date) => {
    return tasks.filter((task) =>
      isWithinInterval(new Date(date), {
        start: new Date(task.startDate),
        end: new Date(task.endDate),
      })
    );
  };

  const handlePreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const downloadReport = () => {
    const report = generateWeeklyReport();
    const reportText = formatReportText(report);
    
    // Create and download the report file
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weekly-report-${format(weekStart, 'yyyy-MM-dd')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatReportText = (report) => {
    let text = `Weekly Project Report\n`;
    text += `Week of ${format(weekStart, 'MMMM d, yyyy')}\n\n`;

    report.epics.forEach((epic) => {
      text += `Epic: ${epic.title}\n`;
      text += `${epic.description}\n\n`;

      epic.stories.forEach((story) => {
        text += `  Story: ${story.title}\n`;
        text += `  Points: ${story.points}\n`;
        
        story.tasks.forEach((task) => {
          const taskDate = new Date(task.startDate);
          if (isWithinInterval(taskDate, { start: weekStart, end: weekEnd })) {
            text += `    - ${task.title} (${task.status})\n`;
            text += `      Assigned to: ${task.assignee}\n`;
            text += `      Priority: ${task.priority}\n`;
            text += `      Due: ${format(new Date(task.endDate), 'MMM d, yyyy')}\n`;
          }
        });
        text += '\n';
      });
      text += '-------------------------------------------\n\n';
    });

    return text;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <button
          onClick={handlePreviousWeek}
          className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Previous Week
        </button>
        <h2 className="text-lg font-semibold">
          Week of {format(weekStart, 'MMMM d, yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleNextWeek}
            className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Next Week
          </button>
          <button onClick={downloadReport} className="btn btn-primary">
            Download Report
          </button>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="grid grid-cols-7 gap-4">
        {daysInWeek.map((day) => (
          <div
            key={day.toISOString()}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <h3 className="font-medium text-gray-900 mb-2">
              {format(day, 'EEEE')}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{format(day, 'MMM d')}</p>
            <div className="space-y-2">
              {getTasksForDay(day).map((task) => (
                <div
                  key={task.id}
                  className="p-2 rounded-lg bg-gray-50 border border-gray-200"
                >
                  <p className="text-sm font-medium text-gray-900">
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-500">{task.assignee}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyView;
