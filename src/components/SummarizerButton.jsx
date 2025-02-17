import React, { useState, useEffect } from 'react';

const Summarizer = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if the Summarizer API is supported
    if ('ai' in self && 'summarizer' in self.ai) {
      initializeSummarizer();
    } else {
      setError('Summarizer API is not supported in this browser.');
    }
  }, []);

  const initializeSummarizer = async () => {
    try {
      const capabilities = await self.ai.summarizer.capabilities();
      const { available } = capabilities;

      if (available === 'no') {
        setError('Summarizer API is not usable on this device.');
        return;
      }

      const options = {
        sharedContext: 'This is a scientific article',
        type: 'key-points',
        format: 'markdown',
        length: 'medium',
      };

      let summarizer;
      if (available === 'readily') {
        summarizer = await self.ai.summarizer.create(options);
      } else {
        summarizer = await self.ai.summarizer.create(options);
        summarizer.addEventListener('downloadprogress', (e) => {
          setDownloadProgress((e.loaded / e.total) * 100);
        });
        await summarizer.ready;
      }

      return summarizer;
    } catch (err) {
      setError('Failed to initialize summarizer: ' + err.message);
      return null;
    }
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setError('');

    const summarizer = await initializeSummarizer();

    if (summarizer) {
      try {
        const summaryResult = await summarizer.summarize(inputText, {
          context: 'This article is intended for a tech-savvy audience.',
        });
        setSummary(summaryResult);
      } catch (err) {
        setError('Failed to summarize text: ' + err.message);
      }
    }

    setIsSummarizing(false);
  };

  return (
    <div>
      <h1>Summarizer API in React</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to summarize..."
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={handleSummarize} disabled={isSummarizing}>
        {isSummarizing ? 'Summarizing...' : 'Summarize'}
      </button>
      {downloadProgress > 0 && downloadProgress < 100 && (
        <p>Downloading model: {downloadProgress.toFixed(2)}%</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Summary:</h2>
      <pre>{summary}</pre>
    </div>
  );
};

export default Summarizer;