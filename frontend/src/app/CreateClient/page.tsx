'use client'
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { authAtom } from '../atoms/authAtom';
import { redirect } from 'next/navigation';
import UserHeader from '../components/UserHeader';
import { userInfoAtom } from '../atoms/userInfoAtom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import axios, { isAxiosError } from 'axios';

import { Toaster, toast } from 'sonner';

const CreateClientForm = () => {
    const [isLogged, setIsLogged] = useAtom(authAtom);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    const [fullName, setFullName] = useState("")
    const [documentId, setDocumentId] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [zipCode, setZipCode] = useState("");
    const [addressName, setAddressName] = useState("")
    const [addressNumber, setAddressNumber] = useState("")
    const [addressComplement, setAddressComplement] = useState("")
    const [district, setDistrict] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");


    const [loading, setLoading] = useState(false);


    if (!isLogged) {
        redirect('/login');
    }

    const handleSearchClick: React.MouseEventHandler<SVGSVGElement> = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);

            console.log(response.data);
            const cepData = response.data;
            setAddressName(cepData.logradouro);
            setDistrict(cepData.bairro);
            setCity(cepData.localidade);
            setState(cepData.uf);
        } catch (error) {

            console.error('Erro ao buscar o CEP:', error);
        }
    }

    async function createClient() {
        const data = {
            fullName,
            documentId,
            phoneNumber,
            email,
            zipCode,
            addressName,
            addressNumber,
            addressComplement,
            district,
            state,
            city,
        }
        try {
            const response = await axios.post('http://localhost:5196/api/Client', data);
            const userData = response.data
            console.log(response.status);
            if (response.status === 201) {
                console.log(response.data)
                console.log(data)
                toast.success('Cliente criado')
            }
            if (response.status === 409) {
                console.log(response.data)
                console.log(data)
                toast.error('Cliente criado')
            }
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                console.error('Erro ao fazer a requisição:', error)
                if (error.response) {
                    console.error('Código de status:', error.response.status);
                    if (error.response.status === 409) {
                        toast.error('Esse cliente já existe!');
                    } else if (error.response.status === 400) {
                        toast.error('Erro de requisição. Verifique os dados enviados.');
                    } else {
                        toast.error('Erro desconhecido.');
                    }
                }
            }
            console.log(data)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await createClient()
    };

    return (
        <div className='flex flex-col'>
            <UserHeader />
            <Toaster richColors />
            <h1 className='mx-auto my-4 text-5xl font-bold text-center'>Criar cliente</h1>
            <form onSubmit={handleSubmit} className='mt-5 mb-8 flex-col flex mx-auto border-2 rounded-xl border-secondary-foreground shadow-lg shadow-slate-500 border-slate-200 bg-slate-600 bg-opacity-10 p-10 max-w-[500px]'>
                <div>
                    <h1 className='text-2xl font-bold mb-2'>Informações pessoais</h1>
                    <div className='flex w-full justify-between'>
                        <div className='w-full'>
                            <h1>Nome Completo</h1>
                            <Input onChange={(e) => setFullName(e.target.value)} className='p-2 border-slate-500 bg-white mb-4' placeholder='Digite o nome completo' />
                        </div>
                    </div>
                    <div className='w-full justify-between flex'>
                        <div className='mr-2'>
                            <h1>Documento</h1>
                            <Input onChange={(e) => setDocumentId(e.target.value)} className='p-2 border-slate-500 bg-white mb-4' placeholder='Digite o CPF ou CNPJ ' />
                        </div>
                        <div>
                            <h1>Celular</h1>
                            <Input onChange={(e) => setPhoneNumber(e.target.value)} className='p-2 border-slate-500 bg-white mb-4' placeholder='Digite o celular' />
                        </div>
                    </div>
                    <h1>Email</h1>
                    <Input onChange={(e) => setEmail(e.target.value)} className='p-2 border-slate-500 bg-white mb-4' placeholder='Digite o email ' />
                </div>
                <h1 className='text-2xl font-bold my-2'>Localização</h1>
                <div>
                    <div className='w-full flex justify-around'>
                        <div className='flex flex-col w-[40%]'>
                            <h1>CEP</h1>
                            <div className='flex'>
                                <Input className='p-2 border-slate-500 bg-white mb-4'
                                    placeholder='Digite o CEP'
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)} />
                                <SearchIcon className='p-2 h-10 w-10 cursor-pointer'
                                    onClick={handleSearchClick} />
                            </div>
                        </div>
                        <div className='mx-1 w-[60%]'>
                            <h1>Rua</h1>
                            <Input placeholder='Rua'
                                className='p-2 border-slate-500 bg-neutral-300 mb-4'
                                value={addressName}
                                onChange={(e) => setAddressName(e.target.value)}
                                readOnly={true} />
                        </div>
                    </div>
                    <div className='w-full flex justify-around'>
                        <div className='mx-1'>
                            <h1>Número</h1>
                            <Input onChange={(e) => setAddressNumber(e.target.value)} placeholder='Número' className='p-2 border-slate-500 bg-white mb-4' />
                        </div>
                        <div className='mx-1'>
                            <h1>Complemento</h1>
                            <Input onChange={(e) => setAddressComplement(e.target.value)} placeholder='Complemento' className='p-2 border-slate-500 bg-white mb-4' />
                        </div>
                    </div>
                    <div className='w-full flex justify-around'>
                        <div className='mx-1'>
                            <h1>Bairro</h1>
                            <Input placeholder='Digite o Bairro'
                                className='p-2 border-slate-500 bg-neutral-300 mb-4'
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                readOnly={true} />
                        </div>
                        <div className='mx-1'>
                            <h1>Estado</h1>
                            <Input placeholder='Estado'
                                className='p-2 border-slate-500 bg-neutral-300 mb-4'
                                value={state}
                                onChange={(e) => setState(e.target.value)} readOnly={true} />
                        </div>
                        <div className='mx-1'>
                            <h1>Cidade</h1>
                            <Input placeholder='Cidade'
                                className='p-2 border-slate-500 bg-neutral-300 mb-4'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                readOnly={true} />
                        </div>
                    </div>
                </div>
                <Button variant='default'>Criar Cliente</Button>
            </form>
        </div>
    );
};

export default CreateClientForm;
