'use client'

import axios from 'axios';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { getQuoteAtom } from '../atoms/getQuoteAtom';

const Quote = () => {

    const [quote, setQuote] = useAtom(getQuoteAtom);

    async function fetchQuote() {
      try {
        const response = await axios.get('http://localhost:5196/api/Quote');

        if (response.status === 200) {
          console.log(response.data);
          setQuote(response.data[1])
        } else {
          throw new Error('Erro ao obter a citação');
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    }

  return (
    <div>
        <button className='bg-secondary-foreground rounded-xl text-white' onClick={fetchQuote}>Clicar</button>
        {<h1 className='text-4xl'>{quote.firstName}</h1>}
    </div>
  )
}

export default Quote
