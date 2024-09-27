import React from 'react'
import Header from '../components/Header'
import foto from '../../assets/foto-2.png'
import Image from 'next/image'
import centrone from '../../assets/centrone.png'
import Gustavo from '../../assets/Gustavo.png'
import Uendeus from '../../assets/Uendeus.png'
import Footer from '../components/Footer'
import { ArrowLeftRight, ArrowRight } from 'lucide-react'
import { FaArrowDown } from 'react-icons/fa'

const Page = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="bg-primary h-full">
        <h1 className="my-10 font-bold text-5xl mx-auto font-montserrat text-center text-cyan-500">
          Conheça Nossa equipe
        </h1>
        <div className="justify-around flex mx-20 mt-2 mb-12">
          <div className="">
            <h1 className="mt-12 font-bold text-3xl font-montserrat uppercase text-center text-secondary ">
              Uendell Rios
            </h1>
            <Image className="my-2 rounded-xl" src={Uendeus} alt="a" />
          </div>

          <a href="https://github.com/JoaoVitorTelesCentrone">
            <div className="">
              <h1 className="mt-12 font-bold text-3xl font-montserrat uppercase text-center text-secondary">
                João Centrone
              </h1>
              <Image className="my-2 rounded-xl" src={centrone} alt="a" />
            </div>
          </a>
          <div className="">
            <h1 className="mt-12 font-bold text-3xl font-montserrat uppercase text-center text-secondary ">
              Gustavo Alves
            </h1>
            <Image className="my-2 rounded-xl" src={Gustavo} alt="a" />
          </div>
        </div>

        <h1 className="my-10 font-bold text-5xl mx-auto font-montserrat text-center text-cyan-500">
          Nosso Plano
        </h1>
        <div className="flex my-10 bg-primary bg-opacity-90 mx-32 justify-between">
          <div className="max-w-[600px]">
            <h1 className="mt-12 font-bold text-5xl font-montserrat uppercase text-center text-tertiary ">
              O Começo
            </h1>
            <p className="mt-2 font-medium text-2xl font-montserrat text-secondary text-center">
              Com o objetivo de aprender e desenvolver nossas habilidades alem
              da nossa área de atuação, começamos a planejar o escopo de um
              projeto onde alem de treinar poderiamos o tornar util para a
              utilizaçao em outros campos como por exemplo para os testes
              automatizados e2e com o cypress ou qualquer outra ferramenta.
            </p>
          </div>
          <ArrowRight className="text-white h-20 w-20 mt-32" />
          <div className="max-w-[600px]">
            <h1 className="mt-12 font-bold text-5xl font-montserrat uppercase text-center text-tertiary">
              Implementação
            </h1>
            <p className="mt-2 font-medium text-2xl font-montserrat text-secondary text-center">
              Para esse projeto buscamos contruir não apenas um site, mas um
              software que possuisse um backend e um frontend. Para o backend
              foi escolhido C# visando sua largua utilização. Para o front foi
              utilizado next js junto com typescript, para a estilização
              tailwind e a lib de componentes shadcn.ui.
            </p>
          </div>
        </div>
        <FaArrowDown className="flex mx-auto my-6 font-bold text-white w-24 h-24" />

        <div className="flex m-10">
          <div className="mx-14">
            <h1 className="mt-12 font-bold text-5xl font-montserrat uppercase text-center text-tertiary ">
              Objetivos a serem alcançados
            </h1>
            <p className="mt-2 font-medium text-2xl font-montserrat text-secondary text-center mb-10">
              Ao construir esse projeto tivemos em vista alguns objetivos como
              por exemplo, a utilização do mesmo como projeto piloto para a
              escrita e implementação de uma cobertura de testes automatizados.
              Ou para a iniciação de devs junior onde nele é possível
              implementar e criar novas funcionalidades assim como testar e
              entender regras de negócio.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page
