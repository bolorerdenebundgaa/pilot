import { ProjectState } from '../types';

const STORAGE_KEY = 'project_management_state';

class StorageService {
  static saveState(state: ProjectState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
      throw new Error('Failed to save project state');
    }
  }

  static loadState(): ProjectState | null {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      return savedState ? JSON.parse(savedState) : null;
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
      throw new Error('Failed to load project state');
    }
  }

  static clearState(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing state from localStorage:', error);
      throw new Error('Failed to clear project state');
    }
  }

  static savePartial<K extends keyof ProjectState>(key: K, data: ProjectState[K]): void {
    try {
      const currentState = this.loadState();
      if (currentState) {
        const newState = {
          ...currentState,
          [key]: data,
        };
        this.saveState(newState);
      }
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
      throw new Error(`Failed to save ${key}`);
    }
  }
}

export default StorageService;
