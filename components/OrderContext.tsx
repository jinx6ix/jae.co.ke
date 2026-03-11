// contexts/OrderContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

export interface OrderData {
  order_id: string;
  email: string;
  delivery_country: string;
  estimated_delivery_date: string;
  products?: Array<{gtin: string}>;
}

interface OrderContextType {
  orderData: OrderData | null;
  setOrderData: (data: OrderData) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  return (
    <OrderContext.Provider value={{ orderData, setOrderData }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}