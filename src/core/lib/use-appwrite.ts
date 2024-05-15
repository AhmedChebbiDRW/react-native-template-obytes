import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import type { Data } from '@/components/custom/trending-videos';

interface UseAppwriteProps {
  fn: () => Promise<Data[]>;
}

const useAppwrite = ({ fn }: UseAppwriteProps) => {
  const [data, setData] = useState<Data[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await fn();
      setData(result);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  }, [fn]);

  useEffect(() => {
    fetchPosts();

    return () => {
      setData([]);
      setIsLoading(false);
    };
  }, [fetchPosts]);

  const refetch = () => fetchPosts();

  return { data, refetch, isLoading };
};

export default useAppwrite;
