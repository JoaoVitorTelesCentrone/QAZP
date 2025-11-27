import { useAtom } from 'jotai';
import { authAtom } from '../app/atoms/authAtom';

const useAuth = () => {
  const [userAuth] = useAtom(authAtom);

  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwtToken'); 
    return !!token && userAuth;
  };

  return { isAuthenticated };
};

export default useAuth;
