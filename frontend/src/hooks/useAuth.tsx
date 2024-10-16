// src/hooks/useAuth.ts
import { useAtom } from 'jotai';
import { authAtom } from '../app/atoms/authAtom';

const useAuth = () => {
  const [userAuth] = useAtom(authAtom); // Obtemos o estado de autenticação do Jotai

  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwtToken'); // Obtém o token do localStorage
    return !!token && userAuth; // Retorna verdadeiro se o token existir e o usuário estiver autenticado
  };

  return { isAuthenticated };
};

export default useAuth;
