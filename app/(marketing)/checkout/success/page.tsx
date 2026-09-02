// app/checkout/success/page.tsx or any order confirmation page
'use client';

import { useEffect } from 'react';
import { useOrder } from '@/components/OrderContext';

export default function OrderSuccessPage({ params }: { params: { id: string } }) {
  const { setOrderData } = useOrder();

  useEffect(() => {
    // Fetch order data from your API or get from localStorage/state
    const orderDetails = {
      order_id: "ORDER-12345", // Get from your order system
      email: "customer@example.com", // Get from your order system
      delivery_country: "KE",
      estimated_delivery_date: "2024-12-25",
      products: [
        { gtin: "GTIN1" },
        { gtin: "GTIN2" }
      ]
    };

    setOrderData(orderDetails);
  }, [setOrderData]);

  return (
    <div>
      <h1>Thank you for your order!</h1>
      {/* Your order success page content */}
    </div>
  );
}