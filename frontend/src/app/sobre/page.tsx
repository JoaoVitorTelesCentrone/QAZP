import React from 'react'
import Header from '../components/Header'
import foto from '../../assets/foto-2.png'
import Image from 'next/image'
import centrone from '../../assets/centrone.png'
import Gustavo from '../../assets/Gustavo.png'
import Uendeus from '../../assets/Uendeus.png'

const Page = () => {
  return (
    <div className='flex flex-col'>
      <Header /> 
      <div className='ml-96 max-w-[800px]'>
        <h1 className='mt-14 font-bold text-5xl mx-auto font-montserrat uppercase text-center'>Nossa história</h1>
        <p className='mt-2 font-medium text-2xl font-montserrat  text-center' >Com o objetivo de aprender e desenvolver nossas habilidades alem da nossa área de atuação, começamos a planejar o escopo de um projeto onde alem de treinar poderiamos o tornar util para a utilizaçao em outros campos como por exemplo para os testes automatizados e2e com o cypress ou qualquer outra ferramenta.</p>
      </div>
      <div className='flex m-10'>
        <div className='mx-14'>
          <h1 className='mt-12 font-bold text-5xl font-montserrat uppercase text-center '>O Começo</h1>
          <p className='mt-2 font-medium text-2xl font-montserrat  text-center' >Com o objetivo de aprender e desenvolver nossas habilidades alem da nossa área de atuação, começamos a planejar o escopo de um projeto onde alem de treinar poderiamos o tornar util para a utilizaçao em outros campos como por exemplo para os testes automatizados e2e com o cypress ou qualquer outra ferramenta.</p>
        </div>
        <div className='mx-14 mt-32'>
          <h1 className='mt-12 font-bold text-5xl font-montserrat uppercase text-center '>Implementação</h1>
          <p className='mt-2 font-medium text-2xl font-montserrat  text-center' >Para esse projeto buscamos contruir não apenas um site, mas um software que possuisse um backend e um frontend. Para o backend foi escolhido C# visando sua largua utilização. Para o front foi utilizado next js junto com typescript, para a estilização tailwind e a lib de componentes shadcn.ui.</p>
        </div>
      </div>
      <div className="flex m-10">
        <div className='mx-14'>
          <h1 className='mt-12 font-bold text-5xl font-montserrat uppercase text-center '>Objetivos</h1>
          <p className='mt-2 font-medium text-2xl font-montserrat  text-center' >Ao construir esse projeto tivemos em vista alguns objetivos como por exemplo, a utilização do mesmo como projeto piloto para a escrita e implementação de uma cobertura de testes automatizados. Ou para a iniciação de devs junior onde nele é possível implementar e criar novas funcionalidades assim como testar e entender regras de negócio.</p>
        </div>

        <div className='mx-14 mt-12'>
          <h1 className='mt-12 font-bold text-5xl font-montserrat uppercase text-center '>Objetivos</h1>
          <p className='mt-2 font-medium text-2xl font-montserrat  text-center' >Ao construir esse projeto tivemos em vista alguns objetivos como por exemplo, a utilização do mesmo como projeto piloto para a escrita e implementação de uma cobertura de testes automatizados. Ou para a iniciação de devs junior onde nele é possível implementar e criar novas funcionalidades assim como testar e entender regras de negócio.</p>
        </div>
      </div>
      <h1 className='mt-24 font-bold text-5xl mx-auto font-montserrat uppercase text-center'>Nossa equipe</h1>
      <div className='justify-around flex mx-20 my-20'>
        <div className='mx-10'>
          <h1 className='mt-12 font-bold text-3xl font-montserrat uppercase text-center '>Uendeus</h1>
          <Image className='my-2 rounded-xl' src={Uendeus} alt='a' />
        </div>
        <div className='mx-10'>
          <h1 className='mt-12 font-bold text-3xl font-montserrat uppercase text-center '>Centrone</h1>
          <Image className='my-2 rounded-xl' src={centrone} alt='a' />
        </div>
        <div className='mx-10'>
          <h1 className='mt-12 font-bold text-3xl font-montserrat uppercase text-center '>Gustavo</h1>
          <Image className='my-2 rounded-xl' src={Gustavo} alt='a' />
        </div>
      </div>
    </div>
  )
}

export default Page