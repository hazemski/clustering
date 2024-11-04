import OpenAI from 'openai';
import { ClusteringType, ClusteringResponse } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const CLUSTERING_PROMPTS = {
  semantic: `Analyze and group these keywords based on their semantic meaning and search intent. Create specific, tightly-focused clusters where keywords share similar meanings or search purposes. Return the response as a JSON object.`,
  
  modifier: `Group these keywords based on their modifiers and qualifiers (e.g., "best", "how to", "vs", "for", "near me", etc.). Each cluster should represent a specific type of search modifier or intent qualifier. Ensure keywords with similar modifiers are grouped together. Return the response as a JSON object.`,
  
  topic: `Organize these keywords into distinct topical clusters. Each cluster should represent a specific subject matter or subtopic. Group keywords that share the same core topic or subject area. Return the response as a JSON object.`,
  
  theme: `Categorize these keywords into broad thematic groups. Each cluster should represent a high-level theme or category that encompasses related concepts and subtopics. Return the response as a JSON object.`
};

export async function clusterWithGPT(
  keywords: string[],
  clusteringType: ClusteringType
): Promise<ClusteringResponse> {
  try {
    const prompt = `${CLUSTERING_PROMPTS[clusteringType]}

Keywords to cluster:
${keywords.join('\n')}

Please provide your response in the following JSON format:
{
  "clusters": [
    {
      "name": "cluster name",
      "keywords": ["keyword1", "keyword2"]
    }
  ]
}

Ensure the response is a valid JSON object with the structure shown above.`;

    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: "system", 
        content: "You are a keyword clustering assistant. Always respond with valid JSON."
      }, { 
        role: "user", 
        content: prompt 
      }],
      model: "gpt-4-0125-preview",
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const response = JSON.parse(completion.choices[0].message.content || '{"clusters": []}');
    
    if (!response.clusters || !Array.isArray(response.clusters)) {
      throw new Error('Invalid response format from GPT');
    }

    return { clusters: response.clusters };
  } catch (error) {
    console.error('Error clustering keywords:', error);
    throw error;
  }
}