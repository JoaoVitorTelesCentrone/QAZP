import axios from 'axios';
import { Edit3Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ClientForm from '../ClientForm';
import { clientChangeAtom } from '../../atoms/clientChangeAtom';
import { useAtom } from 'jotai';
import { formatDocumentId, formatPhoneNumber, formatZipCode } from '../utils/clientMasks'
import { EditClientProps, ClientDataProps } from '../types/clientTypes';

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
      documentId: data.documentId
        ? formatDocumentId(data.documentId)
        : '',
      phoneNumber: data.phoneNumber
        ? formatPhoneNumber(data.phoneNumber)
        : '',
      zipCode: data.zipCode
        ? formatZipCode(data.zipCode)
        : '',
    }
      setClientData(formattedData);
      setClientChange(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <Edit3Icon
        className="h-5 w-5 cursor-pointer"
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
