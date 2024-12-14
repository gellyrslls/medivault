import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';

export function useAuth() {
  const navigate = useNavigate();
  const { user, logout: contextLogout } = useAuthContext();

  const logout = async () => {
    try {
      await contextLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    user,
    logout,
  };
}