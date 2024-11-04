import { ClusteringType, KeywordCluster } from '../types';
import { clusterWithGPT } from './openai';

export async function clusterKeywords(
  keywords: string[],
  clusteringType: ClusteringType
): Promise<KeywordCluster[]> {
  try {
    const gptResponse = await clusterWithGPT(keywords, clusteringType);
    
    return gptResponse.clusters.map((cluster, index) => ({
      ...cluster,
      relevance: calculateRelevance(cluster.keywords.length, keywords.length, index)
    }));
  } catch (error) {
    console.error('Clustering error:', error);
    throw error;
  }
}

function calculateRelevance(
  clusterSize: number,
  totalKeywords: number,
  index: number
): number {
  // Base relevance based on cluster size
  const sizeRelevance = clusterSize / totalKeywords;
  // Position penalty (earlier clusters are slightly more relevant)
  const positionPenalty = index * 0.05;
  
  return Math.min(0.95, Math.max(0.1, sizeRelevance - positionPenalty));
}