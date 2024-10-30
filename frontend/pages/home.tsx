// pages/home.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import withAuth from '../utils/withAuth';  // Import the HOC
import axiosInstance from '../utils/axios';
import ResponseProps from '../utils/responseInterface';

const Home: React.FC<ResponseProps> = ({ response }) => {
  const [message, setMessage] = useState('');
  const router = useRouter();
  console.log(response);
 
  const handleLogout = async () => {
    try {
      await axiosInstance.post('logout/');
      router.push('/login');
    } catch (error) {
      console.error('Errore durante il logout', error);
    }
  };

  return (
    <div>
      <h1>
        Benvenuto nella Home {response.username}
      </h1>
      <p>Questa è una pagina protetta.</p>
      {message && <p>Risultato: {message}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Export Home wrapped by the withAuth HOC
export default withAuth(Home, 'home');
