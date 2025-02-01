import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';

function ChatWindow({ setIsLoading }) {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'What project would you like to plan today? Please provide the project name, description, and timeline.',
    },
  ]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const { createProjectPlan } = useProject();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Add thinking message
    setMessages(prev => [
      ...prev,
      { type: 'bot', content: 'Processing your request...' },
    ]);

    // Show loading screen
    setIsLoading(true);

    try {
      // Parse user input and create project info
      const projectInfo = {
        name: 'New Project', // This would be extracted from user input
        description: input,
        createdAt: new Date().toISOString(),
      };

      // Generate project plan using AI
      const success = await createProjectPlan(projectInfo);

      if (success) {
        // Navigate to board view after plan is generated
        navigate('/board');
      } else {
        setMessages(prev => [
          ...prev,
          { type: 'bot', content: 'Sorry, there was an error generating the project plan. Please try again.' },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { type: 'bot', content: 'An unexpected error occurred. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-lg shadow-sm">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === 'user' ? 'flex justify-end' : 'flex justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your project..."
            className="input flex-1"
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatWindow;
