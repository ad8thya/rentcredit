import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  // Mock tenants and payments for landlord
  const [tenants, setTenants] = useState([
    { id: '1', name: 'Alice', rent: 15000, dueDate: '2024-06-10', status: 'Pending', reporting: true },
    { id: '2', name: 'Bob', rent: 18000, dueDate: '2024-06-15', status: 'Paid', reporting: false },
  ]);
  // Mock credit and payment history for tenant
  const [payments, setPayments] = useState([
    { id: 'p1', month: 'May', year: 2024, amount: 15000, status: 'Paid', date: '2024-05-10' },
    { id: 'p2', month: 'June', year: 2024, amount: 15000, status: 'Pending', date: '2024-06-10' },
  ]);
  // Filters and UI state
  const [filters, setFilters] = useState({ status: 'All', reporting: 'All', month: 'All' });
  const [graphType, setGraphType] = useState('line');

  // Actions
  const confirmPayment = (tenantId) => {
    setTenants(prev => prev.map(t => t.id === tenantId ? { ...t, status: 'Paid' } : t));
  };
  const addTenant = (tenant) => {
    setTenants(prev => [...prev, { ...tenant, id: Date.now().toString() }]);
  };
  const addPayment = (payment) => {
    setPayments(prev => [...prev, { ...payment, id: Date.now().toString() }]);
  };

  return (
    <DashboardContext.Provider value={{ tenants, setTenants, payments, setPayments, filters, setFilters, graphType, setGraphType, confirmPayment, addTenant, addPayment }}>
      {children}
    </DashboardContext.Provider>
  );
}; 