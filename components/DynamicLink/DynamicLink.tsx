// DynamicLink.tsx
import { useApolloClient } from '@apollo/client';
import React from 'react';
import Link from 'next/link';
import queryCMSPage from '../../utility/query-cms-page';

interface DynamicLinkProps {
  to: string;
  className?: string;
  children?: React.ReactNode;
}

const DynamicLink: React.FC<DynamicLinkProps> = ({ to, className = '', children = null }) => {
  const client = useApolloClient();

  const handleMouseOver = async () => {
    if (client) {
      try {
        await client.query({
          query: queryCMSPage(to).query,
          variables: queryCMSPage(to).variables,
        });
      } catch (error) {
        console.error('Error prefetching data:', error);
      }
    }
  };

  // Remove the nested anchor tag since CSidebarBrand will provide its own
  return (
    <Link
      href={to}
      className={className}
      onMouseEnter={handleMouseOver}
    >
      {children}
    </Link>
  );
};

export default DynamicLink;
