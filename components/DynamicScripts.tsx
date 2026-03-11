// components/DynamicScripts.tsx
'use client';

import Script from "next/script";
import { useOrder } from '@/components/OrderContext';

export default function DynamicScripts() {
  const { orderData } = useOrder();

  return (
    <>
      {/* Google Customer Reviews Survey Opt-in - Only renders when order data exists */}
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

      {/* Merchant Widget - Always renders but with dynamic config */}
      <Script
        id="merchant-widget"
        src="https://www.gstatic.com/shopping/merchant/merchantwidget.js"
        strategy="lazyOnload"
      />

      <Script id="merchant-widget-init" strategy="lazyOnload">
        {`
          function initMerchantWidget() {
            if (typeof merchantwidget !== 'undefined' && merchantwidget) {
              merchantwidget.start({
                merchant_id: 5694347760,
                position: 'BOTTOM_RIGHT',
                region: '${orderData?.delivery_country || "KE"}',
              });
            } else {
              console.log('Merchant widget not yet loaded');
            }
          }

          // Initialize when script loads
          const widgetScript = document.getElementById('merchant-widget');
          if (widgetScript) {
            widgetScript.addEventListener('load', initMerchantWidget);
          }

          // Retry mechanism
          setTimeout(initMerchantWidget, 3000);
        `}
      </Script>
    </>
  );
}