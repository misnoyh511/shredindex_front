import { useApolloClient } from '@apollo/client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import queryCMSPage from '../../utility/query-cms-page';

interface DynamicLinkProps {
  to: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * A React Router Link that prefetches its path's data
 */
const DynamicLink: React.FC<DynamicLinkProps> = ({ to, className = '', children = null }) => {
  const client = useApolloClient();

  useEffect(() => {
    // Verify the client on the client-side
    if (!client) {
      console.error('Apollo Client is not available. Ensure that ApolloProvider is wrapping your application.');
    }
  }, []);

  // Handle mouse over event to prefetch data
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

  return (
    <Link
      href={to}
      className={className}
      onMouseEnter={handleMouseOver} // Prefetch data on hover
    >
      {children}
    </Link>
  );
};

export default DynamicLink;
