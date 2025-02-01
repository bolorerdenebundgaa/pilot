import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { ProjectState, ProjectAction, Task, Epic, Story } from '../types';
import StorageService from '../services/storage';

const ProjectContext = createContext<{
  state: ProjectState;
  dispatch: React.Dispatch<ProjectAction>;
  createProjectPlan: (projectInfo: ProjectState['project']) => Promise<boolean>;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  updateAIConfig: (config: Partial<ProjectState['aiConfig']>) => void;
  generateWeeklyReport: () => { epics: (Epic & { stories: (Story & { tasks: Task[] })[] })[] };
  isLoading: boolean;
  error: string | null;
} | null>(null);

const initialState: ProjectState = {
  project: null,
  epics: [],
  stories: [],
  tasks: [],
  resources: [],
  aiConfig: {
    provider: 'openai',
    apiKey: '',
  },
};

function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
  let newState: ProjectState;

  switch (action.type) {
    case 'SET_PROJECT':
      newState = { ...state, project: action.payload };
      break;
    case 'SET_EPICS':
      newState = { ...state, epics: action.payload };
      break;
    case 'SET_STORIES':
      newState = { ...state, stories: action.payload };
      break;
    case 'SET_TASKS':
      newState = { ...state, tasks: action.payload };
      break;
    case 'UPDATE_TASK':
      newState = {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
      break;
    case 'SET_RESOURCES':
      newState = { ...state, resources: action.payload };
      break;
    case 'UPDATE_AI_CONFIG':
      newState = {
        ...state,
        aiConfig: { ...state.aiConfig, ...action.payload },
      };
      break;
    default:
      return state;
  }

  // Persist state changes
  try {
    StorageService.saveState(newState);
  } catch (error) {
    console.error('Failed to persist state:', error);
  }

  return newState;
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved state on mount
  useEffect(() => {
    try {
      const savedState = StorageService.loadState();
      if (savedState) {
        dispatch({ type: 'SET_PROJECT', payload: savedState.project });
        dispatch({ type: 'SET_EPICS', payload: savedState.epics });
        dispatch({ type: 'SET_STORIES', payload: savedState.stories });
        dispatch({ type: 'SET_TASKS', payload: savedState.tasks });
        dispatch({ type: 'SET_RESOURCES', payload: savedState.resources });
        dispatch({ type: 'UPDATE_AI_CONFIG', payload: savedState.aiConfig });
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
      setError('Failed to load saved project data');
    }
  }, []);

  const createProjectPlan = async (projectInfo: ProjectState['project']) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock AI response structure
      const aiResponse = {
        epics: [
          {
            id: 'epic1',
            title: 'Project Setup',
            description: 'Initial project setup and planning',
            startDate: '2024-02-01',
            endDate: '2024-02-15',
          },
        ],
        stories: [
          {
            id: 'story1',
            epicId: 'epic1',
            title: 'Environment Setup',
            description: 'Set up development environment',
            points: 5,
          },
        ],
        tasks: [
          {
            id: 'task1',
            storyId: 'story1',
            title: 'Install Dependencies',
            description: 'Install and configure project dependencies',
            assignee: 'developer1',
            status: 'todo',
            priority: 'high',
            startDate: '2024-02-01',
            endDate: '2024-02-02',
          },
        ],
      };

      dispatch({ type: 'SET_PROJECT', payload: projectInfo });
      dispatch({ type: 'SET_EPICS', payload: aiResponse.epics });
      dispatch({ type: 'SET_STORIES', payload: aiResponse.stories });
      dispatch({ type: 'SET_TASKS', payload: aiResponse.tasks });

      return true;
    } catch (error) {
      console.error('Error creating project plan:', error);
      setError('Failed to create project plan');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    try {
      dispatch({
        type: 'UPDATE_TASK',
        payload: { id: taskId, ...updates },
      });
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task');
    }
  };

  const updateAIConfig = (config: Partial<ProjectState['aiConfig']>) => {
    try {
      dispatch({
        type: 'UPDATE_AI_CONFIG',
        payload: config,
      });
    } catch (error) {
      console.error('Error updating AI config:', error);
      setError('Failed to update AI configuration');
    }
  };

  const generateWeeklyReport = () => {
    try {
      return {
        epics: state.epics.map(epic => ({
          ...epic,
          stories: state.stories
            .filter(story => story.epicId === epic.id)
            .map(story => ({
              ...story,
              tasks: state.tasks.filter(task => task.storyId === story.id),
            })),
        })),
      };
    } catch (error) {
      console.error('Error generating weekly report:', error);
      setError('Failed to generate weekly report');
      return { epics: [] };
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        state,
        dispatch,
        createProjectPlan,
        updateTask,
        updateAIConfig,
        generateWeeklyReport,
        isLoading,
        error,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
