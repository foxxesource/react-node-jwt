import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <div>Logging out...</div>;
};

export default Logout;  