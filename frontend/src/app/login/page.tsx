import Link from 'next/link';
import React from 'react';

const LoginPage = () => {

  return (
    <div className='flex flex-col mx-auto py-32'>
      <h1 className='mx-auto text-3xl text-custom-secondary my-8 font-bold uppercase'>Faça seu login</h1>
      <form className='flex flex-col mx-auto'>
        <label htmlFor="email">Usuário</label>
        <input className='p-2 rounded-xl border-2 border-custom-secondary mb-8' type="text" id="email" />

        <label htmlFor="password">Senha</label>
        <input className='p-2 rounded-xl border-2 border-custom-secondary mb-8' type="password" id="password" />

        <button type="submit">Login</button>
      </form>
      <Link className='mx-auto my-8' href='/'>Voltar pra Home</Link>
    </div>
  );
};

export default LoginPage;
