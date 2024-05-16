import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import type { Models } from 'react-native-appwrite';

interface UseAppwriteProps {
  fn: () => Promise<Models.Document[]>;
}

const useAppwrite = ({ fn }: UseAppwriteProps) => {
  const [data, setData] = useState<Models.Document[] | []>([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = () => fetchPosts();

  return { data, refetch, isLoading };
};

export default useAppwrite;
