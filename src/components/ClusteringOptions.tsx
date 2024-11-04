import React from 'react';
import { ClusteringType } from '../types';

interface ClusteringOptionsProps {
  clusteringType: ClusteringType;
  setClusteringType: (type: ClusteringType) => void;
}

export default function ClusteringOptions({ clusteringType, setClusteringType }: ClusteringOptionsProps) {
  const options: { value: ClusteringType; label: string; description: string }[] = [
    {
      value: 'semantic',
      label: 'Semantic Clustering',
      description: 'Group keywords based on meaning and context'
    },
    {
      value: 'modifier',
      label: 'Keyword Modifier Clustering',
      description: 'Group by common modifiers and user intent'
    },
    {
      value: 'topic',
      label: 'Topic Clustering',
      description: 'Organize keywords into specific subtopics'
    },
    {
      value: 'theme',
      label: 'Theme Clustering',
      description: 'Group keywords into broad thematic categories'
    }
  ];

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Select Clustering Method
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => setClusteringType(option.value)}
            className={`p-4 rounded-lg border ${
              clusteringType === option.value
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            } text-left transition-colors`}
          >
            <h3 className="font-medium text-gray-900">{option.label}</h3>
            <p className="text-sm text-gray-500 mt-1">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}