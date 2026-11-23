// app/checkout/success/page.tsx or any order confirmation page
'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { useOrder } from '@/components/OrderContext';

export default function OrderSuccessPage({ params }: { params: { id: string } }) {
  const { setOrderData, orderData } = useOrder();

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

      {/* Google Customer Reviews Survey Opt-in - only on order confirmation */}
      {orderData && (
        <>
          <Script
            src="https://apis.google.com/js/platform.js?onload=renderOptIn"
            strategy="lazyOnload"
            id="google-survey-optin"
          />

          <Script id="google-survey-config" strategy="lazyOnload">
            {`
              window.renderOptIn = function() {
                if (typeof window.gapi !== 'undefined' && window.gapi) {
                  window.gapi.load('surveyoptin', function() {
                    window.gapi.surveyoptin.render({
                      "merchant_id": 5694347760,
                      "order_id": "${orderData.order_id}",
                      "email": "${orderData.email}",
                      "delivery_country": "${orderData.delivery_country}",
                      "estimated_delivery_date": "${orderData.estimated_delivery_date}",
                      "products": ${JSON.stringify(orderData.products || [])}
                    });
                  });
                } else {
                  console.log('Google API not yet loaded');
                }
              }

              // Retry mechanism
              setTimeout(function() {
                if (typeof window.renderOptIn === 'function') {
                  window.renderOptIn();
                }
              }, 2000);
            `}
          </Script>
        </>
      )}
    </div>
  );
}