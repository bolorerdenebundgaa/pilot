export interface Task {
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

export interface Story {
  id: string;
  epicId: string;
  title: string;
  description: string;
  points: number;
}

export interface Epic {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  taskId: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface ProjectState {
  project: {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  } | null;
  epics: Epic[];
  stories: Story[];
  tasks: Task[];
  resources: string[];
  aiConfig: {
    provider: 'openai' | 'gemini';
    apiKey: string;
  };
}

export type ProjectAction =
  | { type: 'SET_PROJECT'; payload: ProjectState['project'] }
  | { type: 'SET_EPICS'; payload: Epic[] }
  | { type: 'SET_STORIES'; payload: Story[] }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'UPDATE_TASK'; payload: Partial<Task> & { id: string } }
  | { type: 'SET_RESOURCES'; payload: string[] }
  | { type: 'UPDATE_AI_CONFIG'; payload: Partial<ProjectState['aiConfig']> };
