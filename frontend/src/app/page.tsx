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
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard'); 
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={'#123abc'} loading={loading} />
      </div>
    );
  }

  return (
    <div className="">
      <Toaster />
      <Header />
      <Call />
      <Plan />
      <WhatWeDo />
      <Footer />
    </div>
  );
}
