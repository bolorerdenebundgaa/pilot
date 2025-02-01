# Project Management Tool

A React-based project management tool with Kanban board, milestone tracking, and weekly views.

## Installation

```bash
npm install project-management-tool
```

## Features

- Kanban Board
- Milestone Tracking
- Weekly View
- Task Management
- Project Settings
- Chat Window

## Usage

```jsx
import { 
  KanbanBoard, 
  MilestoneView, 
  WeeklyView,
  ProjectProvider 
} from 'project-management-tool';

function App() {
  return (
    <ProjectProvider>
      {/* Use the components as needed */}
      <KanbanBoard />
      <MilestoneView />
      <WeeklyView />
    </ProjectProvider>
  );
}
```

## Components

### KanbanBoard
A drag-and-drop kanban board for task management.

### MilestoneView
Track and manage project milestones.

### WeeklyView
Weekly calendar view of tasks and deadlines.

### ChatWindow
Integrated chat functionality for team communication.

### TaskModal
Modal component for creating and editing tasks.

### Settings
Project settings management component.

### LoadingScreen
Loading state component.

## Context

The package includes a ProjectContext provider that manages the global state:

```jsx
import { ProjectProvider, useProject } from 'project-management-tool';

// Use the context in your components
function MyComponent() {
  const { tasks, milestones, updateTask } = useProject();
  // ...
}
```

## Requirements

- React 18 or higher
- React DOM 18 or higher

## License

MIT
