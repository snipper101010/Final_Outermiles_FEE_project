import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      setUser(storedUser);
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  return { user, loading, login, logout };
}