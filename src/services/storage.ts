import { ProjectState } from '../types';

const STORAGE_KEY = 'project_management_state';

class StorageService {
  private static fileHandle: FileSystemFileHandle | null = null;

  static async getFileHandle() {
    if (!this.fileHandle) {
      try {
        // Request user to select where to save the data file
        this.fileHandle = await window.showSaveFilePicker({
          suggestedName: 'project-data.json',
          types: [{
            description: 'JSON File',
            accept: { 'application/json': ['.json'] },
          }],
        });
      } catch (error) {
        console.error('Error getting file handle:', error);
        throw new Error('Failed to access file system');
      }
    }
    return this.fileHandle;
  }

  static async saveToFile(state: ProjectState): Promise<void> {
    try {
      const fileHandle = await this.getFileHandle();
      if (!fileHandle) {
        throw new Error('No file handle available');
      }
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(state, null, 2));
      await writable.close();
    } catch (error) {
      console.error('Error saving to file:', error);
      throw new Error('Failed to save to file');
    }
  }

  static async loadFromFile(): Promise<ProjectState | null> {
    try {
      const fileHandle = await this.getFileHandle();
      if (!fileHandle) {
        return null;
      }
      const file = await fileHandle.getFile();
      const contents = await file.text();
      return JSON.parse(contents);
    } catch (error) {
      console.error('Error loading from file:', error);
      return null;
    }
  }

  static async saveState(state: ProjectState): Promise<void> {
    try {
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      // Save to file
      await this.saveToFile(state);
    } catch (error) {
      console.error('Error saving state:', error);
      throw new Error('Failed to save project state');
    }
  }

  static async loadState(): Promise<ProjectState | null> {
    try {
      // Try loading from localStorage first
      const localState = localStorage.getItem(STORAGE_KEY);
      if (localState) {
        return JSON.parse(localState);
      }

      // If not in localStorage, try loading from file
      const fileState = await this.loadFromFile();
      if (fileState) {
        // Save to localStorage for future use
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fileState));
        return fileState;
      }

      return null;
    } catch (error) {
      console.error('Error loading state:', error);
      throw new Error('Failed to load project state');
    }
  }

  static async clearState(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEY);
      // Clear file by saving empty state
      await this.saveToFile({
        project: null,
        epics: [],
        stories: [],
        tasks: [],
        resources: [],
        aiConfig: {
          provider: 'openai',
          apiKey: '',
        },
      });
    } catch (error) {
      console.error('Error clearing state:', error);
      throw new Error('Failed to clear project state');
    }
  }

  static async savePartial<K extends keyof ProjectState>(key: K, data: ProjectState[K]): Promise<void> {
    try {
      const currentState = await this.loadState();
      if (currentState) {
        const newState = {
          ...currentState,
          [key]: data,
        };
        await this.saveState(newState);
      }
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw new Error(`Failed to save ${key}`);
    }
  }

  // Add export/import functions for manual file operations
  static async exportToFile(state: ProjectState): Promise<void> {
    try {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: 'project-backup.json',
        types: [{
          description: 'JSON File',
          accept: { 'application/json': ['.json'] },
        }],
      });
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (error) {
      console.error('Error exporting to file:', error);
      throw new Error('Failed to export project state');
    }
  }

  static async importFromFile(): Promise<ProjectState | null> {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [{
          description: 'JSON File',
          accept: { 'application/json': ['.json'] },
        }],
      });
      const file = await fileHandle.getFile();
      const contents = await file.text();
      const state = JSON.parse(contents);
      await this.saveState(state); // Save to both localStorage and default file
      return state;
    } catch (error) {
      console.error('Error importing from file:', error);
      return null;
    }
  }
}

export default StorageService;
