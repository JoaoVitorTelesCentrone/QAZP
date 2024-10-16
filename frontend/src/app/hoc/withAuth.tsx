import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'sonner';

const withAuth = (WrappedComponent: React.FC) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Sessão expirada, faça o login novamente');

        const timer = setTimeout(() => {
          router.push('/');
        }, 1000);

        return () => clearTimeout(timer);
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

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
