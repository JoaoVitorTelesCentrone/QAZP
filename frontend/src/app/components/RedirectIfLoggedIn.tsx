'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';

export default function RedirectIfLoggedIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      
      if (window.location.pathname === '/') {
        router.push('/dashboard')
      }
    } else {
      const timeout = setTimeout(() => {
        router.push('/');
        setLoading(false);
      }, 2000); 

      return () => clearTimeout(timeout);
    }

    setLoading(false);
  }, [router]);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={50} color={'#123abc'} loading={loading} />
    </div>
  ) : null;
}
