import { useEffect, useState } from "react";

interface JsonLdProps {
  data: string | object;
}

/**
 * A component that renders JSON-LD structured data
 * It only renders on the client side to avoid hydration mismatches
 */
export default function JsonLd({ data }: JsonLdProps) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return null;
  }
  
  const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
      suppressHydrationWarning={true}
    />
  );
}