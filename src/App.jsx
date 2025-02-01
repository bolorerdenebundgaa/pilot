import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import KanbanBoard from './components/KanbanBoard';
import MilestoneView from './components/MilestoneView';
import WeeklyView from './components/WeeklyView';
import Settings from './components/Settings';
import LoadingScreen from './components/LoadingScreen';
import { ProjectProvider } from './context/ProjectContext';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ProjectProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold text-primary">Project Manager AI</h1>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-primary">
                      Chat
                    </Link>
                    <Link to="/board" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
                      Kanban Board
                    </Link>
                    <Link to="/milestones" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
                      Milestones
                    </Link>
                    <Link to="/weekly" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
                      Weekly View
                    </Link>
                    <Link to="/settings" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
                      Settings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<ChatWindow setIsLoading={setIsLoading} />} />
              <Route path="/board" element={<KanbanBoard />} />
              <Route path="/milestones" element={<MilestoneView />} />
              <Route path="/weekly" element={<WeeklyView />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProjectProvider>
  );
}

export default App;
