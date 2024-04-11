'use client'

import { useState, useEffect } from 'react';
import axios from 'axios'; // Se estiver usando Axios
// import fetch from 'isomorphic-unfetch'; // Se estiver usando fetch

function MeuComponente() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await axios.get('https://cors-anywhere.herokuapp.com/http://localhost:5196/api/Quote');

        if (response.status === 200) {
          setQuote(response.data); // Define o estado com os dados da resposta
        } else {
          throw new Error('Erro ao obter a citação');
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    }

    fetchQuote(); // Chama a função para buscar a citação ao montar o componente
  }, []);

  return (
    <div>
      <h1>Citação:</h1>
      <p>{quote}</p>
    </div>
  );
}

export default MeuComponente;
