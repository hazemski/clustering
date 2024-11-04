export type ClusteringType = 'semantic' | 'keyword-modifier' | 'topic' | 'theme';

export interface KeywordCluster {
  name: string;
  description: string;
  keywords: string[];
  relevance: number;
}