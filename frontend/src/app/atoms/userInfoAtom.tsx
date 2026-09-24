import { atom } from 'jotai';

// JWT payloads are base64url-encoded UTF-8, which plain atob() mangles (accents) or rejects ("-", "_").
const decodeToken = (token: string) => {
  if (!token) return null;
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
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
