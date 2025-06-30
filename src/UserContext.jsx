import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem('rc_role');
    const storedUser = localStorage.getItem('rc_user');
    if (storedRole) setRole(storedRole);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (role) localStorage.setItem('rc_role', role);
    if (user) localStorage.setItem('rc_user', JSON.stringify(user));
  }, [role, user]);

  const signup = (role, userInfo) => {
    setRole(role);
    setUser(userInfo);
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    localStorage.removeItem('rc_role');
    localStorage.removeItem('rc_user');
  };

  return (
    <UserContext.Provider value={{ role, user, signup, logout, setRole }}>
      {children}
    </UserContext.Provider>
  );
}; 