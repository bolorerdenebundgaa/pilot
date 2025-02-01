import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import StorageService from '../services/storage';

function Settings() {
  const { state, aiConfig, resources, updateAIConfig } = useProject();
  const [formData, setFormData] = useState({
    provider: aiConfig.provider,
    apiKey: aiConfig.apiKey,
    newResource: {
      name: '',
      role: '',
      email: '',
    },
  });

  const handleAIConfigChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      newResource: {
        ...prev.newResource,
        [name]: value,
      },
    }));
  };

  const handleSaveAIConfig = (e) => {
    e.preventDefault();
    updateAIConfig({
      provider: formData.provider,
      apiKey: formData.apiKey,
    });
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    // This would typically make an API call to add the resource
    setFormData((prev) => ({
      ...prev,
      newResource: {
        name: '',
        role: '',
        email: '',
      },
    }));
  };

  const handleExport = async () => {
    try {
      await StorageService.exportToFile(state);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleImport = async () => {
    try {
      const importedState = await StorageService.importFromFile();
      if (importedState) {
        window.location.reload(); // Reload to apply imported state
      }
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Data Management */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Data Management</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleExport}
            className="btn btn-primary"
          >
            Export Project Data
          </button>
          <button
            onClick={handleImport}
            className="btn btn-secondary"
          >
            Import Project Data
          </button>
        </div>
      </div>

      {/* AI Configuration */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">AI Configuration</h2>
        <form onSubmit={handleSaveAIConfig} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              AI Provider
            </label>
            <select
              name="provider"
              value={formData.provider}
              onChange={handleAIConfigChange}
              className="input"
            >
              <option value="openai">OpenAI</option>
              <option value="gemini">Google Gemini</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <input
              type="password"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleAIConfigChange}
              className="input"
              placeholder="Enter your API key"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Save AI Configuration
          </button>
        </form>
      </div>

      {/* Team Resources */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Team Resources</h2>
        
        {/* Add New Resource */}
        <form onSubmit={handleAddResource} className="space-y-4 mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.newResource.name}
                onChange={handleResourceChange}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.newResource.role}
                onChange={handleResourceChange}
                className="input"
                required
              >
                <option value="">Select Role</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="pm">Project Manager</option>
                <option value="ba">Business Analyst</option>
                <option value="qa">QA Engineer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.newResource.email}
                onChange={handleResourceChange}
                className="input"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Team Member
          </button>
        </form>

        {/* Team Members List */}
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {resources.map((resource) => (
                <tr key={resource.email}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {resource.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {resource.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {resource.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-red-600 hover:text-red-900">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Settings;
