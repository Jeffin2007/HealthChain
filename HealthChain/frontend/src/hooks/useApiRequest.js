import { useCallback, useState } from 'react';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function useApiRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const run = useCallback(async (fn, { retries = 1, retryDelayMs = 500 } = {}) => {
    setLoading(true);
    setError('');

    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        const data = await fn();
        setLoading(false);
        return data;
      } catch (err) {
        const message = err?.response?.data?.message || err?.message || 'Something went wrong';
        if (attempt === retries) {
          setError(message);
          setLoading(false);
          throw err;
        }
        await sleep(retryDelayMs * (attempt + 1));
      }
    }

    setLoading(false);
    return null;
  }, []);

  return { loading, error, setError, run };
}
