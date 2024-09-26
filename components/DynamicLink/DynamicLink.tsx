import { useApolloClient } from '@apollo/client';
import React from 'react';
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
  // Get the Apollo Client instance
  const client = useApolloClient();

  // Check if Apollo Client is available (for debugging purposes)
  if (!client) {
    console.error('Apollo Client is not available. Ensure that ApolloProvider is wrapping your application.');
    return null; // Return null or a fallback UI if client is not available
  }

  // Handle mouse over event to prefetch data
  const handleMouseOver = async () => {
    try {
      await client.query({
        query: queryCMSPage(to).query,
        variables: queryCMSPage(to).variables,
      });
    } catch (error) {
      console.error('Error prefetching data:', error);
    }
  };

  // Render the link with the mouse over prefetch functionality
  return (
    <Link
      href={to}
      className={className}
      onMouseEnter={handleMouseOver} // Changed from onMouseOver to onMouseEnter for Next.js Link
    >
      {children}
    </Link>
  );
};

export default DynamicLink;
