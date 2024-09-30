'use client';
import { useAtom } from 'jotai';
import Link from 'next/link';
import React, { useState } from 'react'; // Importando useState
import { userInfoAtom } from '../atoms/userInfoAtom';
import { authAtom } from '../atoms/authAtom';
import { redirect } from 'next/navigation';
import { LogOut, TreePalm } from 'lucide-react';
import AvatarUser from './Avatar';
import ClipLoader from 'react-spinners/ClipLoader';
import { useRouter } from 'next/navigation';

const UserSideMenu = () => {
  const [loggedIn, setIsLogged] = useAtom(authAtom);
  const [user] = useAtom(userInfoAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(false); 

  if (!loggedIn) {
    redirect('/')
  }

  const handleNavigation = (href: string) => {
    setLoading(true); 
    router.push(href); 
    setTimeout(() => {
      setLoading(false); 
    }, 3000);
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={50} color={'#123abc'} loading={loading} />
    </div>
  ) : (
    <div className="flex h-full">
      <div className="fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out bg-gray-800 text-white w-48 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <TreePalm />
          <ul>
            <li>Zventos</li>
          </ul>
        </div>
        <nav className="flex-1">
          <ul className="flex flex-col space-y-4">
            {['dashboard', 'clients', 'Events', 'Materials', 'quote', 'Users'].map((page) => (
              <li key={page}>
                <Link 
                  href={`/${page}`}
                  onClick={() => handleNavigation(`/${page}`)} // Mantendo o onClick para o loading
                  data-testid={`link-${page}`} // Adicionando o data-testid aqui
                  className="block py-2 px-3 rounded hover:bg-gray-700 w-full text-left"
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 mb-4 flex justify-center">
          <AvatarUser name={`${user.username}`} />
        </div>
        <hr className="border-gray-600 my-4" />
        <button
          className="text-white items-center space-x-2 flex justify-center"
          onClick={() => setIsLogged(false)}
          data-testid="logout-button"
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserSideMenu;
