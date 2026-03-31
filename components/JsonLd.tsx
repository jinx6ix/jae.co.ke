// components/JsonLd.tsx
import Script from 'next/script';

export default function JsonLd({ 
  id, 
  data 
}: { 
  id: string; 
  data: any 
}) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c')
      }}
    />
  );
}