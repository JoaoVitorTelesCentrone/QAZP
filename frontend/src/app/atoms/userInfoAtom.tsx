import { atom } from 'jotai';

// Função simples para decodificar o JWT
const decodeToken = (token: string) => {
  if (!token) return null;
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload)); // Decodifica a parte do payload do JWT
};

// Função para obter o token do localStorage
const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') { // Verifica se estamos no lado do cliente
    return localStorage.getItem('token'); // Busca o token no localStorage
  }
  return null;
};

// Função para obter o token e decodificar o usuário
const getUserInfoFromToken = () => {
  const token = getTokenFromLocalStorage();
  if (!token) return { name: '', username: '', password: '' }; // Retorna um valor padrão se não houver token

  const decoded = decodeToken(token);
  return {
    name: decoded?.name || '',
    username: decoded?.username || '',
    password: '' // Normalmente, não armazenamos senha no token
  };
};

// O atom que armazena as informações do usuário
export const userInfoAtom = atom(getUserInfoFromToken());
