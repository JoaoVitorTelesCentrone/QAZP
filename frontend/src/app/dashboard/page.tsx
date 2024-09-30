'use client';

import React, { useEffect, useState } from 'react';
import { authAtom } from '../atoms/authAtom';
import { useAtom } from 'jotai';
import axios from 'axios';
import { Events, eventsColumns } from './columns';
import { DashboardTable } from './DashboardTable';
import { LucideLineChart } from 'lucide-react';
import { userInfoAtom } from '../atoms/userInfoAtom';
import ClipLoader from 'react-spinners/ClipLoader';
import UserSideMenu from '../components/UserHeader';
import { MdEventAvailable } from "react-icons/md";
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const [isLogged] = useAtom(authAtom);
  const [user] = useAtom(userInfoAtom);
  const [counts, setCounts] = useState({
    clients: '0',
    users: '0',
    events: '0'
  });
  const [events, setEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true); // Inicialmente, está em loading
  const router = useRouter();

  // Verifica se o usuário está logado
  useEffect(() => {
    if (!isLogged) {
      router.push('/login');
    }
  }, [isLogged, router]);

  const fetchData = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      return [];
    }
  };

  const getClients = async () => {
    const clients = await fetchData('http://localhost:5196/api/Client');
    setCounts(prevCounts => ({ ...prevCounts, clients: clients.length.toString() }));
  };

  const getUsers = async () => {
    const users = await fetchData('http://localhost:5196/api/User');
    setCounts(prevCounts => ({ ...prevCounts, users: users.length.toString() }));
  };

  const getEvents = async () => {
    const eventsData = await fetchData('http://localhost:5196/api/Event');
    setCounts(prevCounts => ({ ...prevCounts, events: eventsData.length.toString() }));
    setEvents(eventsData);
  };

  useEffect(() => {
    const fetchDataFromAPIs = async () => {
      await Promise.all([getClients(), getUsers(), getEvents()]);
      setTimeout(()=>{
        setLoading(false); // Garante que o loading seja desativado no final 
       },1000)
    };

    // Se o usuário não estiver logado, não busca os dados
    if (isLogged) {
      fetchDataFromAPIs();
    }
  }, [isLogged]);

  return (
    <div>
      <UserSideMenu />
      <div className="bg-tertiary h-screen">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <ClipLoader size={50} color={'#123abc'} loading={loading} />
          </div>
        ) : (
          <>
            <div className="flex ml-56">
              <LucideLineChart className="w-16 h-16 p-1 rounded-full my-12 mx-2 text-primary border-2 border-primary" />
              <h1 className="font-monospace font-semibold text-6xl my-12 text-secondary-foreground">
                Dashboards operacionais
              </h1>
            </div>
            <div className="flex mx-24">
              <div className="flex p-1 mx-auto my-2 w-[1100px] ml-56">
                <div className="rounded-xl bg-gray-700 bg-opacity-10 border-2 border-secondary p-8">
                  <h1 className="text-3xl text-gray-400 font-bold">Número de Clientes</h1>
                  <h1 className="text-6xl text-gray-400 font-extrabold uppercase">{counts.clients}</h1>
                </div>
                <div className="max-xl:mb-10 max-xl:mx-0 rounded-xl mx-4 border-2 bg-gray-700 bg-opacity-10 border-secondary p-8">
                  <h1 className="text-3xl font-bold text-gray-400">Número de Usuários</h1>
                  <h1 className="text-6xl text-gray-400 font-extrabold uppercase">{counts.users}</h1>
                </div>
                <div className="max-xl:mb-10 rounded-xl border-2 bg-gray-700 bg-opacity-10 border-secondary p-8">
                  <h1 className="text-3xl text-gray-400 font-bold">Número de Eventos</h1>
                  <h1 className="text-6xl text-gray-400 font-extrabold uppercase">{counts.events}</h1>
                </div>
              </div>
            </div>
            <div className="flex ml-56">
              <MdEventAvailable className="w-10 h-10 p-1 rounded-full my-9 mx-2 text-primary border-2 border-primary" />
              <h1 className="font-monospace font-bold text-5xl my-8 text-secondary-foreground">Próximos eventos</h1>
            </div>
            <div className="ml-56 mr-10">
              <DashboardTable columns={eventsColumns} data={events} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
