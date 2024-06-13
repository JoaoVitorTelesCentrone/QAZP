'use client'
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface EditUserFormProps {
  userData: userDataProps | undefined;
  closeModal: () => void;
}



interface userDataProps {
    id: string | undefined;
    name: string | undefined;
    userName: string | undefined;
    password: string | undefined;
  }
  
  const EditUserForm: React.FC<EditUserFormProps> = ({closeModal, userData}) => {
    
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [editModal, setEditModal] = useState(false)
    const [userDataInput, setUserData] = useState<userDataProps | undefined>(undefined)


    const updateUser = async ( updatedData: userDataProps | undefined) => {
      try {
        console.log('Updating user with data:', updatedData);
        const response = await axios.put(`http://localhost:5196/api/User/${userData?.id}`, updatedData);
        console.log('Update response:', response);
        setUserData(updatedData);
        setEditModal(false); // Fechar o modal após a atualização
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error message:', error.message);
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          }
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
      e.preventDefault()
      updateUser({id: userData?.id , name: userData?.name, userName: userData?.userName, password: userData?.password })
    }
  
    useEffect(() => {
        if (userData) {
          setName(userData.name || '');
          setUsername(userData.userName || '');
          setPassword(userData.password || '');
        }
      }, [userData]);

  return (
        <div>
          <div className="flex m-8 flex-col">
            <h1 className='mb-4 font-bold text-xl uppercase'>Editar usuário</h1>
            <form onSubmit={handleSubmit} className="">
              <div className="mx-auto mb-1 w-full">
                <p className='text-xl'>Nome</p>
                <Input onChange={(e) => setName(e.target.value)} value={name} required placeholder="Digite o nome completo" className="bg-white border-slate-500 mx-auto my-2" />
              </div>
    
              <div className="mx-auto my-1 w-full">
                <p className='text-xl'>Usuário</p>
    
                <Input onChange={(e) => setUsername(e.target.value)} value={username} required placeholder="Digite o nome do usuário" className="bg-white border-slate-500 mx-auto my-2" />
              </div>
    
              <div className="mx-auto my-1 w-full">
                <p className='text-xl'>Senha</p>
                <div className="flex">
                  <Input type= "password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Digite senha" className="bg-white border-slate-500 mx-auto my-2" />
              </div>
              </div>
              <div className='flex'>
                <Button variant="outline" className="mx-4 bg-primary mt-2 text-white">Salvar</Button>
                <Button onClick={() => closeModal()} variant="outline" className="mx-4 bg-primary mt-2 text-white">Fechar</Button>
              </div>
            </form>
          </div>
        </div>
      );
    };

export default EditUserForm;
