import { createContext, useContext, useReducer } from 'react';

const ProjectContext = createContext();

const initialState = {
  project: null,
  epics: [],
  stories: [],
  tasks: [],
  resources: [],
  aiConfig: {
    provider: 'openai', // or 'gemini'
    apiKey: '',
  },
};

function projectReducer(state, action) {
  switch (action.type) {
    case 'SET_PROJECT':
      return { ...state, project: action.payload };
    case 'SET_EPICS':
      return { ...state, epics: action.payload };
    case 'SET_STORIES':
      return { ...state, stories: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    case 'SET_RESOURCES':
      return { ...state, resources: action.payload };
    case 'UPDATE_AI_CONFIG':
      return {
        ...state,
        aiConfig: { ...state.aiConfig, ...action.payload },
      };
    default:
      return state;
  }
}

export function ProjectProvider({ children }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const createProjectPlan = async (projectInfo) => {
    // This function will interact with AI to generate project plan
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
      return false;
    }
  };

  const updateTask = (taskId, updates) => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: { id: taskId, ...updates },
    });
  };

  const updateAIConfig = (config) => {
    dispatch({
      type: 'UPDATE_AI_CONFIG',
      payload: config,
    });
  };

  const generateWeeklyReport = () => {
    const report = {
      epics: state.epics.map(epic => ({
        ...epic,
        stories: state.stories
          .filter(story => story.epicId === epic.id)
          .map(story => ({
            ...story,
            tasks: state.tasks.filter(task => task.storyId === story.id),
          })),
      })),
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

    return report;
  };

  return (
    <ProjectContext.Provider
      value={{
        ...state,
        createProjectPlan,
        updateTask,
        updateAIConfig,
        generateWeeklyReport,
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
