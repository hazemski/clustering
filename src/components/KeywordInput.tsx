import React from 'react';

interface KeywordInputProps {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  error: string | null;
}

export default function KeywordInput({ keywords, setKeywords, error }: KeywordInputProps) {
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    setKeywords(lines.slice(0, 200));
  };

  return (
    <div className="space-y-2">
      <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
        Enter Keywords (one per line, max 200)
      </label>
      <textarea
        id="keywords"
        rows={10}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter your keywords here..."
        value={keywords.join('\n')}
        onChange={handleTextChange}
      />
      <div className="flex justify-between text-sm">
        <span className={`${keywords.length > 200 ? 'text-red-600' : 'text-gray-500'}`}>
          {keywords.length}/200 keywords
        </span>
        {error && <span className="text-red-600">{error}</span>}
      </div>
    </div>
  );
}