import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getCookie } from '@/app/utils/cookies';
import { logoutUser } from '@/store/slice/userService/userService';
import { useAppDispatch } from '@/store/hooks';
import { useAppSelector } from '@/store/hooks';
import { toast } from 'sonner';

export const useSessionCheck = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.userService.user);

  useEffect(() => {
    const storedTtl = getCookie('ttl');

    if (!storedTtl) return;

    if (!isAuthenticated) {
      toast.warning('Session expired. Please log in.');
      console.log('supposed to logout');
      router.push('/login');
      return;
    }

    const ttlDate = new Date(storedTtl);
    const now = new Date();
    const remainingTime = ttlDate.getTime() - now.getTime();

    if (remainingTime <= 0) {
      toast.warning('Session expired. Please log in.');
      dispatch(logoutUser());
      router.push('/login');
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(logoutUser());
      toast.warning('Session expired. Please log in.');
      router.push('/login');
    }, remainingTime);

    return () => clearTimeout(timeoutId);
  }, [dispatch, router, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
  }, [isAuthenticated, router]);
};
