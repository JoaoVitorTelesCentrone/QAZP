'use client';

import Link from 'next/link';
import { useAtom } from 'jotai';
import { authAtom } from '../atoms/authAtom';
import { userInfoAtom } from '../atoms/userInfoAtom';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import Footer from '../components/Footer';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';

const API_URL = 'http://localhost:5196/api/User';

const LoginPage = () => {
  const router = useRouter();
  const [userAuth, setUserAuth] = useAtom(authAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${username}&${password}`);
      if (response.status === 200) {
        const { name } = response.data;
        setUserAuth(true);
        setUserInfo({
          name: username,
          username: username,
          password: password,
        });

        // Aguarda 2 segundos antes de redirecionar para a dashboard
        setTimeout(() => {
          toast.success(`Bem-vindo ${username}`);
          router.push('/dashboard');
        }, 200); // ajuste o tempo conforme necessário
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      toast.error('Usuário ou senha incorretos');
      // Também pode adicionar um timeout aqui se quiser mostrar um loading após erro
    } finally {
      // Mantenha o loading ativo por um tempo fixo
      setTimeout(() => {
        setLoading(false);
      }, 2500); // ajuste o tempo conforme necessário
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyLogin();
  };

  return (
    <div>
      <Toaster richColors />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
        </div>
      ) : (
        <>
          <Header />
          <div className="flex flex-col mx-auto py-14 bg-primary h-screen">
            <h1 className="mx-auto text-5xl text-secondary-foreground my-8 font-bold uppercase text-secondary">
              Faça seu login
            </h1>
            <div className="mx-auto">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col rounded-xl bg-slate-400 p-6 bg-opacity-20 shadow-md shadow-slate-500"
              >
                <label className="text-white text-lg font-bold">Usuário</label>
                <Input
                  placeholder="Digite o usuário"
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-2 bg-white border-slate-500 mb-8"
                  type="text"
                  id="email"
                  required
                />
                <label className="text-white text-lg font-bold" htmlFor="password">
                  Senha
                </label>
                <Input
                  placeholder="Digite a senha"
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 border-slate-500 bg-white mb-8"
                  type="password"
                  id="password"
                  required
                />
                <button
                  data-testid="login-button"
                  className="bg-primary text-secondary rounded-xl px-6 py-3 max-w-[150px] mx-auto"
                  type="submit"
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default LoginPage;
