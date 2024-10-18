import { atom } from 'jotai';

const decodeToken = (token: string) => {
  if (!token) return null;
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload)); 
};

const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') { 
    return localStorage.getItem('token'); 
  }
  return null;
};

const getUserInfoFromToken = () => {
  const token = getTokenFromLocalStorage();
  if (!token) return { name: '', username: '', password: '' }; 

  const decoded = decodeToken(token);
  return {
    name: decoded?.name || '',
    username: decoded?.username || '',
  };
};

export const userInfoAtom = atom(getUserInfoFromToken());
