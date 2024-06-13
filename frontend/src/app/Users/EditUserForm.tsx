import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EditUserFormProps {
  userData: userDataProps | undefined;
  closeModal: () => void;
  updateUser: (updatedData: userDataProps) => void;
}

interface userDataProps {
    id: string;
    name: string;
    userName: string;
    password: string;
  }
  
  const EditUserForm: React.FC<EditUserFormProps> = ({closeModal, userData}) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    useEffect(() => {
        if (userData) {
          setName(userData.name || '');
          setUsername(userData.userName || '');
        }
      }, [userData]);

  return (
        <div>
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
                  <Input type= "password" value={userData?.password} onChange={(e) => setPassword(e.target.value)} required placeholder="Digite senha" className="bg-white border-slate-500 mx-auto my-2" />
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
