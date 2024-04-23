'use client'
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { redirect } from 'next/navigation';
import UserHeader from '../components/UserHeader';
import { userInfoAtom } from '../atoms/userInfoAtom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import { Toaster, toast } from 'sonner';
import { authAtom } from '../atoms/authAtom';
import { tree } from 'next/dist/build/templates/app-page';

const CreateUserForm = () => {
  const [isLogged, setIsLogged] = useAtom(authAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const[different, setDifferent] = useState(false)

  if (!isLogged) {
    redirect('/login');
  }

  async function verifyCreation() {
    const data = {
      name,
      username,
      password,
      role: 0
    };
    try {
      const response = await axios.post('http://localhost:5196/api/User', data);
      const userData = response.data;
      console.log(response.status);
      if (response.status === 201) {
        console.log(response.data)
        toast.success('Usuário criado')
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      toast.error('Esse usuário já existe!');
      setError(true);
    }
  }

  
  const changeState1 = () => {
    setShowPassword1((prevState) => !prevState) 
  }

  const changeState2 = () => {
    setShowPassword2((prevState) => !prevState) 
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await verifyCreation()
  };

  useEffect(() => {
    if(password !== confirmedPassword){
      setDifferent(true)
    } else {
      setDifferent(false)
    }
  }, [confirmedPassword])

  return (
    <div>
      <UserHeader />
      <Toaster richColors />
      <div className="flex my-8 m-32 flex-col">
        <div className="flex w-full">
          <Link href="/Users">
            <ArrowLeft />
          </Link>
          <h1 className="text-4xl font-bold uppercase mx-auto text-primary mb-6">Criar usuário</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex-col flex p-8 rounded-xl bg-slate-400 bg-opacity-30 max-w-[400px] mx-auto shadow-lg shadow-slate-500">
          <div className="mx-auto mb-1 w-full">
            <p>Nome</p>
            <Input onChange={(e) => setName(e.target.value)} required placeholder="Digite o nome completo" className="bg-white border-slate-500 mx-auto my-2" />
          </div>

          <div className="mx-auto my-1 w-full">
            <p>Usuário</p>

            <Input onChange={(e) => setUsername(e.target.value)} required placeholder="Digite o nome do usuário" className="bg-white border-slate-500 mx-auto my-2" />
          </div>

          <div className="mx-auto my-1 w-full">
            <p>Senha</p>
            <div className="flex">
              <Input type={showPassword1 ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} required placeholder="Digite senha" className="bg-white border-slate-500 mx-auto my-2" />
              {showPassword1 ? <EyeOff onClick={() => changeState1()} className="mt-3 ml-2 cursor-pointer"/> : <Eye onClick={() => changeState1()} className="mt-3 ml-2 cursor-pointer" />}
            </div>
          </div>

          <div className="mx-auto my-1 w-full">
            <p>Confirme a senha</p>
            <div className="flex">
              <Input type={showPassword2 ? 'text' : 'password'} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirme a senha" className="bg-white border-slate-500 mx-auto my-2" />
              {showPassword2 ? <EyeOff onClick={() => changeState2()} className="mt-3 ml-2 cursor-pointer"/> : <Eye onClick={() => changeState2()} className="mt-3 ml-2 cursor-pointer" />}
            </div>
          </div>
          {different && (
            <h1 className='text-red-700 font-bold'>As senhas são diferentes</h1>
          )}
          <Button variant="outline" className="bg-secondary-foreground mt-2 text-white">Criar usuário</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
