import React, { useState, useEffect, useRef } from 'react';

const APIProgressBar = ({ apiCalls, timeout = 5000, onCancel, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    let totalCalls = apiCalls.length;
    let completedCount = 0;

    const handleAPICall = async (url, options) => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        completedCount++;
        setProgress((completedCount / totalCalls) * 100);
      } catch (err) {
        setError(err.message);
        clearInterval(intervalRef.current);
      } finally {
        if (completedCount === totalCalls) {
          setCompleted(true);
          clearInterval(intervalRef.current);
          onComplete && onComplete();
        }
      }
    };

    const startProgress = async () => {
      for (const apiCall of apiCalls) {
        await handleAPICall(apiCall.url, apiCall.options || {});
        if (error) {
          break;
        }
      }
    };

    intervalRef.current = setInterval(startProgress, 100); 

    // Handle timeout
    const timeoutId = setTimeout(() => {
      setError('API call timed out');
      clearInterval(intervalRef.current);
    }, timeout);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutId);
    };
  }, [apiCalls, timeout, onCancel]);

  const handleCancel = () => {
    clearInterval(intervalRef.current);
    onCancel && onCancel();
  };

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : completed ? (
        <div>API calls completed!</div>
      ) : (
        <div>
          Progress: {progress.toFixed(1)}%
          {onCancel && <button onClick={handleCancel}>Cancel</button>}
        </div>
      )}
      <progress value={progress} max="100" />
    </div>
  );
};

export default APIProgressBar;