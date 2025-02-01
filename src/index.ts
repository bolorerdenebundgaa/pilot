export { KanbanBoard } from './components/KanbanBoard';
export { LoadingScreen } from './components/LoadingScreen';
export { MilestoneView } from './components/MilestoneView';
export { ChatWindow } from './components/ChatWindow';
export { Settings } from './components/Settings';
export { TaskModal } from './components/TaskModal';
export { WeeklyView } from './components/WeeklyView';
export { ProjectProvider, useProject } from './context/ProjectContext';

// Export types
export type {
  Task,
  Story,
  Epic,
  Comment,
  Attachment,
  ProjectState,
  ProjectAction
} from './types';
