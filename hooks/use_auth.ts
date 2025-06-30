// hooks/use_auth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { getToken } from '@/services/token_service';

export const useAuthRedirect = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (!token) {
        router.replace('/login');
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  return { loading };
};
