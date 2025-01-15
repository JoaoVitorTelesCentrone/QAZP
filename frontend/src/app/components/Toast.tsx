import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'sonner';

interface ToastProps {
  type: 'success' | 'error';
  message: string;
}

const Toast: React.FC<ToastProps> = ({ type, message }) => {
  React.useEffect(() => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    }
  }, [type, message]);

  return null; // Não é necessário renderizar nada aqui
};

export default Toast;
