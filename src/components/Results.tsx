import React from 'react';
import { Download } from 'lucide-react';
import { KeywordCluster } from '../types';
import { downloadClustersAsCSV } from '../utils/csv';

interface ResultsProps {
  clusters: KeywordCluster[];
}

export default function Results({ clusters }: ResultsProps) {
  const handleDownload = () => {
    downloadClustersAsCSV(clusters);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Clustering Results</h2>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download CSV
        </button>
      </div>
      
      <div className="grid gap-6">
        {clusters.map((cluster, index) => (
          <div
            key={index}
            className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">{cluster.name}</h3>
            <div className="flex flex-wrap gap-2">
              {cluster.keywords.map((keyword, kidx) => (
                <span
                  key={kidx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}