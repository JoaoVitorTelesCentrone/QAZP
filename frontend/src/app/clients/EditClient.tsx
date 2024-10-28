import axios from 'axios';
import { Edit3Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ClientForm from './ClientForm';
import { clientChangeAtom } from '../atoms/clientChangeAtom';
import { useAtom } from 'jotai';

type EditClientProps = {
  userId: string;
};

type ClientDataProps = {
  id: string | undefined;
  fullName: string | undefined;
  documentId: string | undefined;
  email: string | undefined;
  zipCode: string | undefined;
  addressName: string | undefined;
  addressComplement: string | undefined;
  addressNumber: string | undefined;
  district: string | undefined;
  state: string | undefined;
  city: string | undefined;
  createdDate: string | undefined;
  isActive: boolean | undefined;
  phoneNumber: string | undefined;
};

function applyMask(value: string, type: 'document' | 'zip'): string {
  if (type === 'document') {
    return value.length === 11
      ? value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") 
      : value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"); 
  } else if (type === 'zip') {
    return value.replace(/(\d{5})(\d{3})/, "$1-$2");
  }
  return value;
}

const EditClient: React.FC<EditClientProps> = ({ userId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [clientData, setClientData] = useState<ClientDataProps | undefined>(
    undefined,
  );
  const [clientChange, setClientChange] = useAtom(clientChangeAtom);

  useEffect(() => {
      fetchUserData();
  }, [openModal]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5196/api/Client/id/${userId}`,
      );
      const data = response.data;
      const formattedData = {
        ...data,
        documentId: applyMask(data.documentId, 'document'),
        zipCode: applyMask(data.zipCode, 'zip')
      };
      setClientData(formattedData);
      setClientChange(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <Edit3Icon
        className="h-4 w-4 cursor-pointer"
        onClick={() => setOpenModal(true)}
      />
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <ClientForm
            clientData={clientData}
            closeModal={() => setOpenModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default EditClient;
