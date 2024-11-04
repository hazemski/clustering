import React, { useState } from 'react';
import { ClusteringType, KeywordCluster } from './types';
import { clusterWithGPT } from './services/openai';
import ClusteringForm from './components/ClusteringForm';
import Results from './components/Results';

function App() {
  const [clusters, setClusters] = useState<KeywordCluster[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (keywords: string[], type: ClusteringType) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await clusterWithGPT(keywords, type);
      setClusters(response.clusters);
    } catch (err) {
      setError('Failed to cluster keywords. Please try again.');
      console.error('Clustering error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            SEO Keyword Clustering Tool
          </h1>
          <p className="mt-2 text-gray-600">
            Group your keywords by semantic meaning, modifiers, topics, or themes
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <ClusteringForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {clusters.length > 0 && (
          <Results clusters={clusters} />
        )}
      </div>
    </div>
  );
}

export default App;