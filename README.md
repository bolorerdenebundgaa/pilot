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


## Prompt

Here's the perfect prompt to recreate this project management application with the correct dependencies and setup:

Create a React-based project management tool with the following setup and features:

Initial Setup:
1. Create a new Vite project:
```bash
npm create vite@latest project-management-tool -- --template react
cd project-management-tool
Install dependencies:
npm install react@18.2.0 react-dom@18.2.0 react-beautiful-dnd@13.1.1 date-fns@2.30.0
Install dev dependencies:
npm install -D @types/node@20.10.5 @types/react@18.2.45 @types/react-dom@18.2.18 @types/react-beautiful-dnd@13.1.7 @typescript-eslint/eslint-plugin@6.15.0 @typescript-eslint/parser@6.15.0 @vitejs/plugin-react@4.2.1 typescript@5.3.3 vite@5.0.10 tailwindcss@3.4.0
Initialize TypeScript:
Create tsconfig.json with module: "ESNext" and target: "ES2020"
Add types for File System Access API
Features and Implementation:

Project Structure:
src/
  /components
    - ChatWindow.jsx      # AI chat interface
    - KanbanBoard.tsx     # Drag-and-drop task board
    - LoadingScreen.tsx   # Loading state component
    - MilestoneView.jsx   # Epic/Story tracking
    - Settings.jsx        # App configuration
    - TaskModal.tsx       # Task edit modal
    - WeeklyView.jsx      # Timeline view
  /context
    - ProjectContext.tsx  # Global state management
  /services
    - storage.ts         # Data persistence
  /types
    - index.ts          # TypeScript interfaces
    - file-system.d.ts  # File system types
Data Models:
interface Task {
  id: string;
  storyId: string;
  title: string;
  description: string;
  assignee: string;
  status: 'todo' | 'inProgress' | 'review' | 'done';
  priority: 'high' | 'medium' | 'low';
  startDate: string;
  endDate: string;
  comments?: Comment[];
  attachments?: Attachment[];
}

interface Story {
  id: string;
  epicId: string;
  title: string;
  description: string;
  points: number;
}

interface Epic {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
Key Features:
AI-powered project planning through chat interface
Kanban board with drag-and-drop task management
Milestone tracking for epics and stories
Weekly timeline view
Local storage persistence with file system backup
Team resource management
Task prioritization and status tracking
State Management:
Use React Context for global state
Implement reducer pattern for state updates
Persist state to localStorage and JSON files
Support import/export of project data
UI Implementation:
Use Tailwind CSS for styling
Implement responsive design
Add loading states and error handling
Create modal-based task editing
Include form validation
The application should follow React best practices, maintain type safety, and provide a seamless user experience for project management.


This prompt includes the exact versions of dependencies that are known to work together, along with the correct project structure and implementation details. The setup instructions are precise and should result in a working development environment without dependency conflicts.

See new changes