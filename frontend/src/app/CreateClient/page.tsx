'use client'
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { authAtom } from '../atoms/authAtom';
import { redirect } from 'next/navigation';
import UserHeader from '../components/UserHeader';
import { userInfoAtom } from '../atoms/userInfoAtom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Info, Search, SearchIcon } from 'lucide-react';
import axios from 'axios';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { NextApiRequest, NextApiResponse } from 'next';

const CreateClientForm = () => {
    const [isLogged, setIsLogged] = useAtom(authAtom);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    const [cep, setCEP] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearchClick = async () => {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          
          console.log(response.data);
        } catch (error) {
          
          console.error('Erro ao buscar o CEP:', error);
        }
      };
    

    if (!isLogged) {
        redirect('/login');
    }

    return (
        <div className='flex flex-col'>
            <UserHeader />
            <h1 className='mx-auto my-4 text-5xl font-bold text-ceter'>Criar cliente</h1>
            <form className='mt-5 mb-8 flex-col flex mx-auto border-2 rounded-xl border-secondary-foreground shadow-lg shadow-slate-500 border-slate-200 bg-slate-600 bg-opacity-10 p-10 max-w-[500px]'>
                <div>
                    <h1 className='text-2xl font-bold mb-2'>Informações pessoais</h1>
                    <div className='flex w-full justify-between'>
                        <div className='mr-4'>
                            <h1>Nome</h1>
                            <Input className='p-2 border-slate-500 bg-white mb-4' placeholder='Digite o nome ' />
                        </div>
                        <div>
                            <h1>Sobrenome</h1>
                            <Input className='p-2 border-slate-500 bg-white mb-4' placeholder='Digite o sobrenome ' />
                        </div>
                    </div>
                    <div className='w-full justify-between flex'>
                        <div className='mr-2'>
                            <h1>Documento</h1>
                            <Input className='p-2 border-slate-500 bg-white mb-4' placeholder='Digite o rg ' />
                        </div>
                        <div>
                            <h1>Celular</h1>         
                            <Input className='p-2 border-slate-500 bg-white mb-4' placeholder='Digite o celular' />               
                        </div>
                    </div>
                    <h1>Email</h1>
                    <Input className='p-2 border-slate-500 bg-white mb-4' placeholder='Digite o email ' />      
                </div>
                <h1 className='text-2xl font-bold my-2'>Localização</h1>
                <div>
                    <div className='w-full flex justify-around'>
                        <div className='flex flex-col w-[40%]'>
                            <h1>CEP</h1>
                            <div className='flex'>
                                <Input className='p-2 border-slate-500 bg-white mb-4' placeholder='Digite o CEP' />
                                <SearchIcon className='p-2 h-10 w-10'
                                onClick={handleSearchClick}/>
                            </div>
                        </div>
                        <div className='mx-1 w-[60%]'>
                            <h1>Rua</h1>
                            <Input disabled placeholder='Rua' className='p-2 border-slate-500 bg-white mb-4' />
                        </div>
                    </div>
                    <div className='w-full flex justify-around'>
                        <div className='mx-1'>
                            <h1>Número</h1>
                            <Input disabled placeholder='Número' className='p-2 border-slate-500 bg-white mb-4' />
                        </div>
                        <div className='mx-1'>
                            <h1>Complemento</h1>
                            <Input disabled placeholder='Complemento' className='p-2 border-slate-500 bg-white mb-4' />
                        </div>
                    </div>
                    <div className='w-full flex justify-around'>
                        <div className='mx-1'>
                            <h1>Bairro</h1>
                            <Input disabled placeholder='Digite o Bairro' className='p-2 border-slate-500 bg-white mb-4' />
                        </div>
                        <div className='mx-1'>
                            <h1>Estado</h1>
                            <Input disabled placeholder='Estado' className='p-2 border-slate-500 bg-white mb-4' />
                        </div>
                        <div className='mx-1'>
                            <h1>Cidade</h1>
                            <Input disabled placeholder='Cidade' className='p-2 border-slate-500 bg-white mb-4' />
                        </div>
                    </div>
                </div>
                <Button variant='default'>Criar Cliente</Button>
            </form>
        </div>
    );
};

export default CreateClientForm;
