"use client"

import Script from "next/script"

type Props = {
  orderId: string
  email: string
  deliveryDate: string
}

export default function GoogleSurveyOptIn({
  orderId,
  email,
  deliveryDate,
}: Props) {
  return (
    <>
      <Script
        src="https://apis.google.com/js/platform.js?onload=renderOptIn"
        strategy="afterInteractive"
      />

      <Script id="google-survey">
        {`
          window.renderOptIn = function() {
            window.gapi.load('surveyoptin', function() {
              window.gapi.surveyoptin.render({
                merchant_id: 5694347760,
                order_id: "${orderId}",
                email: "${email}",
                delivery_country: "KE",
                estimated_delivery_date: "${deliveryDate}",
                products: []
              });
            });
          }
        `}
      </Script>
    </>
  )
}