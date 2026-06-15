"use client";

import Script from "next/script";

export default function GoogleMerchantWidget() {
  return (
    <>
      <Script src="https://apis.google.com/js/platform.js?onload=renderOptIn" strategy="beforeInteractive" />
      <Script id="gapi-surveyoptin" strategy="beforeInteractive">
        {`
          window.renderOptIn = function() {
            window.gapi.load('surveyoptin', function() {
              window.gapi.surveyoptin.render({
                "merchant_id": 5694347760,
                "order_id": "ORDER_ID",
                "email": "CUSTOMER_EMAIL",
                "delivery_country": "COUNTRY_CODE",
                "estimated_delivery_date": "YYYY-MM-DD",
                "products": [{"gtin":"GTIN1"}, {"gtin":"GTIN2"}]
              });
            });
          }
        `}
      </Script>
      <Script id="merchantWidgetScript" src="https://www.gstatic.com/shopping/merchant/merchantwidget.js" strategy="afterInteractive" onLoad={() => {
        if (typeof window !== 'undefined' && (window as any).merchantwidget) {
          (window as any).merchantwidget.start({
            merchant_id: 5694347760,
            checkout_url: "https://www.jaetravel.co.ke/checkout/success?item_id={id}"
          });
        }
      }} />
    </>
  );
}