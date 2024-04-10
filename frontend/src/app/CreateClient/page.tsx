'use client'
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { authAtom } from '../atoms/authAtom';
import { redirect } from 'next/navigation';
import UserHeader from '../components/UserHeader';
import { userInfoAtom } from '../atoms/userInfoAtom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Info, Search } from 'lucide-react';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const cepRegex = /^\d{5}-\d{3}$/;

const fetchCEPData = async (cep: string) => {
    const [loading, setLoading] = useState(false);
    try {
        setLoading(true)
        const response = await fetch(`/api/cep?cep=${cep}`);
        if (!response.ok) {
            throw new Error('CEP não encontrado');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        setLoading(false)
    }
};

const CreateClientForm = () => {
    const [isLogged, setIsLogged] = useAtom(authAtom);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    const [cep, setCEP] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFetchCEPData = async () => {
        setLoading(true);
        const data = await fetchCEPData(cep);
        setLoading(false);
        console.log(data);
    };

    if (!isLogged) {
        redirect('/login');
    }

    return (
        <div>
            <UserHeader />
            <form className='mt-5 flex-col flex mx-auto border-2 rounded-xl border-secondary-foreground shadow-lg shadow-black border-slate-200 bg-slate-600 bg-opacity-10 p-10 max-w-[800px]'>
                {/* Seu código de formulário aqui */}
                <div className='flex flex-col w-[33%] mx-3'>
                    <p>CEP</p>
                    <div className='flex'>
                        <Input onChange={(e) => setCEP(e.target.value)} required placeholder='Digite o nome' className='mx-1 my-2 border-black' />
                        <button onClick={handleFetchCEPData}><Search className=' ' /></button>
                    </div>
                </div>
                {/* Outros campos do formulário */}
                <Button variant='default'>Criar Cliente</Button>
            </form>

            {/* Mostrar o loading se a variável loading for true */}
            {loading && (
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
        </div>
    );
};

export default CreateClientForm;
