'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Call from './components/Call';
import Plan from './components/Plan';
import WhatWeDo from './components/WhatWeDo';
import { Toaster } from 'sonner';
import Footer from './components/Footer';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        router.replace('/dashboard'); 
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#123abc" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Header />
      <Call />
      <Plan />
      <WhatWeDo />
      <Footer />
    </div>
  );
}