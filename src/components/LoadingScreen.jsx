import React from 'react';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Generating Project Plan</h2>
          <p className="text-gray-600 text-center">
            AI is analyzing your project requirements and creating a comprehensive plan with epics, stories, and tasks...
          </p>
          <div className="mt-6 w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
