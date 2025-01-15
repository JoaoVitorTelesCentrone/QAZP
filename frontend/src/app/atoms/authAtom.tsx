import { atom } from 'jotai';

const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token'); 
  }
  return null;
};

export const authAtom = atom(!!getTokenFromLocalStorage());
