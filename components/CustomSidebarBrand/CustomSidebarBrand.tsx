import React from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import queryCMSPage from '../../utility/query-cms-page';

interface CustomSidebarBrandProps {
  className?: string;
  children?: React.ReactNode;
  to: string;
}

const CustomSidebarBrand: React.FC<CustomSidebarBrandProps> = ({
  className = '',
  children,
  to,
}) => {
  const router = useRouter();
  const client = useApolloClient();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
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
    router.push(to);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`${className} cursor-pointer mt-2 mb-2`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e as never);
        }
      }}
    >
      {children}
    </div>
  );
};

export default CustomSidebarBrand;
