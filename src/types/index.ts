export type ClusteringType = 'semantic' | 'modifier' | 'topic' | 'theme';

export interface KeywordCluster {
  name: string;
  keywords: string[];
}

export interface ClusteringResponse {
  clusters: KeywordCluster[];
  error?: string;
}