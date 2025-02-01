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

Create a modern project management application using React, TypeScript, and Tailwind CSS with the following features and specifications:

Core Features:
1. AI-Powered Project Planning
- Chat interface for project creation and planning
- Integration with AI providers (OpenAI/Gemini) for task breakdown
- Natural language processing for project requirements

2. Project Organization
- Hierarchical structure: Epics > Stories > Tasks
- Each Epic contains multiple Stories
- Each Story breaks down into specific Tasks
- Point estimation for Stories

3. Task Management
- Kanban board with 4 columns: Todo, In Progress, Review, Done
- Drag-and-drop functionality for task movement
- Task properties:
  * Title and description
  * Priority levels (high/medium/low) with color coding
  * Start and end dates
  * Assignee
  * Comments and attachments support
  * Story association

4. Views and Navigation
- Main chat interface for AI interaction
- Kanban board for task management
- Milestone view for tracking epics and stories
- Weekly view for timeline-based progress
- Settings page for configuration

5. Data Management
- Local storage persistence
- File system integration for JSON backup/restore
- Export/Import functionality
- Automatic state syncing

Technical Requirements:
1. Frontend Stack:
- React 18+ with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- react-beautiful-dnd for drag-and-drop
- date-fns for date handling

2. State Management:
- React Context API
- Reducer pattern for state updates
- Persistent storage service
- Type-safe state management

3. Project Structure:
/src
  /components     # React components
  /context       # Global state management
  /services      # Business logic and services
  /types         # TypeScript interfaces
  /utils         # Helper functions

4. Data Models:
- Project: name, description, dates
- Epic: title, description, start/end dates
- Story: title, description, points, epic association
- Task: title, description, status, priority, dates, assignee
- Resource: name, role, email
- Comments & Attachments

5. UI/UX Requirements:
- Clean, modern interface
- Responsive design
- Loading states and error handling
- Intuitive navigation
- Color-coded priorities and status
- Modal-based task editing
- Form validation

6. Features Implementation:
- Real-time updates across views
- Offline capability
- Data persistence
- File system integration for backup/restore
- AI integration for project planning
- Team resource management
- Progress tracking and reporting

The application should follow React best practices, maintain type safety throughout, and provide a seamless user experience for project management. The AI integration should assist in breaking down projects into manageable tasks while maintaining flexibility for manual adjustments.