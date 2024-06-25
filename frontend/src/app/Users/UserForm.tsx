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

interface UserFormProps {
    closeModal: () => void;
    userData?: {name: string, userName: string, password:string}
}

const UserForm: React.FC<UserFormProps> = ({closeModal, userData}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmPassword] = useState('');
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const[different, setDifferent] = useState(false)

  const changeState1 = () => {
    setShowPassword1((prevState) => !prevState) 
  }

  const changeState2 = () => {
    setShowPassword2((prevState) => !prevState) 
  }

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setUsername(userData.userName || '');
    }
  }, [userData]);

  useEffect(() => {
    if(password !== confirmedPassword){
      setDifferent(true)
    } else {
      setDifferent(false)
    }
  }, [confirmedPassword])

  return (
    <div>
      <Toaster richColors />
      <div className="flex m-8 flex-col">
        <h1 className='mb-4 font-bold text-xl uppercase'>Editar usuário</h1>
        <form className="">
          <div className="mx-auto mb-1 w-full">
            <p className='text-xl'>Nome</p>
            <Input onChange={(e) => setName(e.target.value)} value={userData?.name} required placeholder="Digite o nome completo" className="bg-white border-slate-500 mx-auto my-2" />
          </div>

          <div className="mx-auto my-1 w-full">
            <p className='text-xl'>Usuário</p>

            <Input onChange={(e) => setUsername(e.target.value)} value={userData?.userName} required placeholder="Digite o nome do usuário" className="bg-white border-slate-500 mx-auto my-2" />
          </div>

          <div className="mx-auto my-1 w-full">
            <p className='text-xl'>Senha</p>
            <div className="flex">
              <Input type={showPassword1 ? 'text' : 'password'} value={userData?.password} onChange={(e) => setPassword(e.target.value)} required placeholder="Digite senha" className="bg-white border-slate-500 mx-auto my-2" />
              {showPassword1 ? <EyeOff onClick={() => changeState1()} className="mt-3 ml-2 cursor-pointer"/> : <Eye onClick={() => changeState1()} className="mt-3 ml-2 cursor-pointer" />}
            </div>
          </div>

          <div className="mx-auto my-1 w-full">
            <p className='text-xl'>Confirme a senha</p>
            <div className="flex">
              <Input type={showPassword2 ? 'text' : 'password'} value={userData?.password} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirme a senha" className="bg-white border-slate-500 mx-auto my-2" />
              {showPassword2 ? <EyeOff onClick={() => changeState2()} className="mt-3 ml-2 cursor-pointer"/> : <Eye onClick={() => changeState2()} className="mt-3 ml-2 cursor-pointer" />}
            </div>
          </div>
          {different && (
            <h1 className='text-red-700 font-bold'>As senhas são diferentes</h1>
          )}
          <div className='flex'>
            <Button variant="outline" className="mx-4 bg-primary mt-2 text-white">Criar usuário</Button>
            <Button onClick={() => closeModal()} variant="outline" className="mx-4 bg-primary mt-2 text-white">Fechar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
