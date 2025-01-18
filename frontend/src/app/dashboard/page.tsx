'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Events, eventsColumns } from './columns';
import { DashboardTable } from './DashboardTable';
import { LucideLineChart } from 'lucide-react';
import { MdEventAvailable } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';
import UserSideMenu from '../components/UserHeader';
import { eventTypeNameConverter, formatCurrency, formatDate } from '@/functions/functions';
import withAuth from '../hoc/withAuth';
import { toast } from 'sonner';
import { intl } from '@/i18n';

const Dashboard = () => {
  const isDataFetchedRef = useRef(false);
  const [counts, setCounts] = useState({ clients: 0, users: 0, events: 0 });
  const [events, setEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchDashboardData = useCallback(async () => {
    if (isDataFetchedRef.current) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:5196/api/Dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const { clients, users, events, eventDetails } = response.data;

        setCounts({ clients: clients || 0, users: users || 0, events: events || 0 });

        const formattedEvents = eventDetails.map((event: any) => ({
          name: event.name,
          type: eventTypeNameConverter(event.type),
          startDate: event.startDate ? formatDate(event.startDate) : 'Data não disponível',
          endDate: event.endDate ? formatDate(event.endDate) : 'Data não disponível',
          estimatedAudience: event.estimatedAudience,
          totalAmount: formatCurrency(event.totalAmount),
        }));
        console.log(response.data)

        setEvents(formattedEvents || []);
        isDataFetchedRef.current = true;
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error fetching dashboard data:`, error);
      toast.error('Erro ao buscar dados da Dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

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
            <div className='bg-tertiary'>
              <div className="flex ml-56">
                <LucideLineChart className="w-12 h-12 xl:w-16 xl:h-16 p-1 rounded-full my-12 mx-2 text-primary border-2 border-primary" />
                <h1 className="font-monospace font-semibold text-6xl my-12 text-secondary-foreground">
                  {intl.formatMessage({ id: 'dashboard.page.title' })}
                </h1>
              </div>
              <div className="flex mx-24">
                <div className="flex my-2 xl:w-full xl:max-w-full max-w-[800px] ml-52 mr-10 xl:ml-60">
                  <div className="rounded-xl bg-gray-700 bg-opacity-10 border-2 border-secondary p-8">
                    <h1 className="text-3xl text-gray-400 font-bold">{intl.formatMessage({ id: 'dashboard.page.total.clients' })}</h1>
                    <h1 className="text-6xl text-gray-400 font-extrabold uppercase">{counts.clients}</h1>
                  </div>
                  <div className="max-xl:mb-10 max-xl:mx-0 rounded-xl mx-4 border-2 bg-gray-700 bg-opacity-10 border-secondary p-8">
                    <h1 className="text-3xl font-bold text-gray-400">{intl.formatMessage({ id: 'dashboard.page.total.users' })}</h1>
                    <h1 className="text-6xl text-gray-400 font-extrabold uppercase">{counts.users}</h1>
                  </div>
                  <div className="max-xl:mb-10 rounded-xl border-2 bg-gray-700 bg-opacity-10 border-secondary p-8">
                    <h1 className="text-3xl text-gray-400 font-bold">{intl.formatMessage({ id: 'dashboard.page.total.events' })}</h1>
                    <h1 className="text-6xl text-gray-400 font-extrabold uppercase">{counts.events}</h1>
                  </div>
                </div>
              </div>
              <div className="flex ml-56">
                <MdEventAvailable className="w-10 h-10 p-1 rounded-full my-9 mx-2 text-primary border-2 border-primary" />
                <h1 className="font-monospace font-bold text-5xl my-8 text-secondary-foreground">{intl.formatMessage({ id: 'dashboard.page.next.events.datagrid.title' })}</h1>
              </div>
              <div className="ml-56 mr-10">
                <DashboardTable columns={eventsColumns} data={events} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withAuth(Dashboard); 
