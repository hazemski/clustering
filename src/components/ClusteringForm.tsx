import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Upload } from 'lucide-react';
import { ClusteringType } from '../types';

interface ClusteringFormProps {
  onSubmit: (keywords: string[], type: ClusteringType) => void;
  isLoading: boolean;
}

export default function ClusteringForm({ onSubmit, isLoading }: ClusteringFormProps) {
  const [keywords, setKeywords] = useState<string>('');
  const [clusteringType, setClusteringType] = useState<ClusteringType>('semantic');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const keywordList = keywords
      .split('\n')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    if (keywordList.length === 0) {
      setError('Please enter at least one keyword');
      return;
    }

    if (keywordList.length > 200) {
      setError('Maximum 200 keywords allowed');
      return;
    }

    onSubmit(keywordList, clusteringType);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv') {
      setError('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const keywords = text
        .split('\n')
        .map(line => line.split(',')[0]?.trim())
        .filter(keyword => keyword && keyword.length > 0);

      if (keywords.length > 200) {
        setError('CSV contains more than 200 keywords');
        return;
      }

      setKeywords(keywords.join('\n'));
    };
    reader.readAsText(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Clustering Method
        </label>
        <select
          value={clusteringType}
          onChange={(e) => setClusteringType(e.target.value as ClusteringType)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="semantic">Semantic Clustering</option>
          <option value="modifier">Keyword Modifier Clustering</option>
          <option value="topic">Topic Clustering</option>
          <option value="theme">Theme Clustering</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Keywords (one per line, max 200)
        </label>
        <textarea
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your keywords here..."
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <Upload className="w-4 h-4" />
          Import CSV
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 text-sm font-medium text-white bg-[#4193f0] rounded-lg hover:bg-[#3784db] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4193f0] transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Clustering...' : 'Cluster Keywords'}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </form>
  );
}