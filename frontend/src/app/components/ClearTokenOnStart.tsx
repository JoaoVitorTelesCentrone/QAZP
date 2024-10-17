'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

const ClearTokenOnStart = () => {
  const router = useRouter(); 

  useEffect(() => {
    if (typeof window !== 'undefined') {      
      localStorage.removeItem('token');      
      
      router.push('/');
    }
  }, [router]);

  return null;
};

export default ClearTokenOnStart;
