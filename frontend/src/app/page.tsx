'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Call from './components/Call';
import Plan from './components/Plan';
import WhatWeDo from './components/WhatWeDo';
import { toast } from 'sonner';
import { SESSION_EXPIRED_PARAM } from '@/lib/apiClient';
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

  // Runs after the first render, when the Toaster in the root layout is already mounted.
  useEffect(() => {
    if (loading) return;
    const params = new URLSearchParams(window.location.search);
    if (params.has(SESSION_EXPIRED_PARAM)) {
      toast.warning('Sua sessão expirou. Faça login novamente.');
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#123abc" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Call />
      <Plan />
      <WhatWeDo />
      <Footer />
    </div>
  );
}