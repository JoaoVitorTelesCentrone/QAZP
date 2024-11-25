import { intl } from '@/i18n'
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-quartenary p-10">
      <ul className="flex justify-around">
        <a href="https://zbra.dev/pt">
          <li className="text-secondary text-sm">{intl.formatMessage({
            id: 'showroom.page.footer.ZBRA.option',
          })}
          </li>
        </a>
        <a href="https://github.com/Uendell">
          <li className="text-secondary text-sm">{intl.formatMessage({
            id: 'showroom.page.footer.Uendell.option',
          })}
          </li>
        </a>
        <a href="https://github.com/JoaoVitorTelesCentrone">
          <li className="text-secondary text-sm">{intl.formatMessage({
            id: 'showroom.page.footer.Centrone.option',
          })}
          </li>
        </a>
        <a href="https://github.com/GustavoAlvesValadao">
          <li className="text-secondary text-sm">{intl.formatMessage({
            id: 'showroom.page.footer.Gustavo.option',
          })}
          </li>
        </a>
      </ul>
    </div>
  )
}

export default Footer
