import { Calendar } from 'lucide-react'
import React from 'react'
import { FaCalendar, FaCalendarCheck, FaRunning } from 'react-icons/fa'
import { GiExecutionerHood } from 'react-icons/gi'
import { MdDesignServices } from 'react-icons/md'

const Plan = () => {
  return (
    <div className="flex py-24 justify-around bg-primary bg-opacity-90 w-full">
      <div>
        <h1 className="flex font-montserrat font-bold text-3xl text-tertiary uppercase">
          Design <MdDesignServices className="mt-1 mx-6" />
        </h1>
        <p className="font-montserrat max-w-[350px] my-4 text-secondary">
          Criamos experiências únicas e emocionantes para casais apaixonados,
          cuidando de todos os aspectos do planejamento para que seu dia
          especial seja perfeito.
        </p>
      </div>
      <div>
        <h1 className="font-montserrat flex font-bold text-3xl text-tertiary uppercase">
          Planejamento <FaCalendarCheck className="mt-1 mx-6" />
        </h1>
        <p className="font-montserrat max-w-[350px] my-4 text-secondary">
          Criamos experiências únicas e emocionantes para casais apaixonados,
          cuidando de todos os aspectos do planejamento para que seu dia
          especial seja perfeito.
        </p>
      </div>
      <div>
        <h1 className="font-montserrat flex font-bold text-3xl text-tertiary uppercase">
          Execução <FaRunning className="mt-1 mx-6 " />
        </h1>
        <p className="font-montserrat max-w-[350px] my-4 text-secondary">
          Criamos experiências únicas e emocionantes para casais apaixonados,
          cuidando de todos os aspectos do planejamento para que seu dia
          especial seja perfeito.
        </p>
      </div>
    </div>
  )
}

export default Plan
