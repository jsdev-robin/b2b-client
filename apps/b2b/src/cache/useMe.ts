import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

const useMe = () => {
  const user = useSelector((store: RootState) => store.auth.user);
  return user;
};

export default useMe;
